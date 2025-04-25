/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export type Category = {
    categoryIdx: number;
    categoryTitle: string;
};

function AdminMenu() {
    const [categories, setCategories] = useState<Category[]>([]);

    // 카테고리 리스트 api
    const getCategoriesData = async () => {
        const token = sessionStorage.getItem('token');
        if (token) {
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/categories`,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            )
                .then((res) => res.json())
                .catch((err) => console.error(err));
            if (response.status === 403) {
                alert('관리자만 이용가능합니다.');
                location.href = '/';
            }
            if (response.success && !response.data.empty) {
                setCategories(response.data);
            }
        }
    };

    useEffect(() => {
        getCategoriesData();
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='mt-10 text-3xl font-bold text-white'>
                카테고리를 선택하세요
            </h2>
            <div className='flex flex-wrap items-center justify-center w-full mt-20'>
                {categories.map((category) => (
                    <Link
                        to={`/admin/menu/${category.categoryIdx}`}
                        key={category.categoryIdx}
                        className={`w-48 px-3 py-6 border-4 border-slate-300 rounded-md mx-3 my-5 hover:bg-slate-300 text-white hover:text-black`}
                    >
                        <p className='text-2xl font-semibold text-center'>
                            {category.categoryTitle}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default AdminMenu;
