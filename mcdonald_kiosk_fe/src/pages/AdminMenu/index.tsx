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
            <h2 className='text-2xl font-bold mb-5 text-center text-gray-600 mt-5 mb-16'>
                메뉴 카테고리를 선택하세요
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-8xl px-4'>
                {categories.map((category) => (
                    <Link
                        to={`/admin/menu/${category.categoryIdx}`}
                        key={category.categoryIdx}
                        className='bg-white rounded-xl shadow-md border border-slate-300 hover:bg-slate-100 transition duration-200 p-6 flex items-center justify-center'
                    >
                        <p className='text-xl font-medium text-slate-800'>
                            {category.categoryTitle}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default AdminMenu;
