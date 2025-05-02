/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../../components/Pagination';

export type AdminItem = {
    menuIdx: number;
    imgIdx: number;
    imgSrc: string;
    menuName: string;
    menuPrice: number;
    menuOption: string;
    menuCalory: number;
    menuCode: string;
    menuRecommend: boolean;
    menuUpdateDate: Date;
};

type AdminItems = {
    content: AdminItem[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    totalElements: number;
};

function AdminMenuList() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [itemList, setItemList] = useState<AdminItems>();
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [totalPage, setTotalPages] = useState(1);

    const token = sessionStorage.getItem('token');

    const handlePageChange = (pageNumber: number) => {
        setPageNumber(pageNumber);
    };

    // 해당 카테고리 메뉴 리스트 api
    const getCategroyMenuData = async () => {
        if (token) {
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/menu?categoryId=${categoryId}&page=${pageNumber}`,
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
                setItemList(response.data);
                setTotalPages(response.data.totalPages);
            }
        }
    };

    // 해당 메뉴 삭제 api
    const deleteMenu = async (itemIdx: number) => {
        if (token) {
            if (confirm('해당 상품을 삭제하시겠습니까?')) {
                const response = await fetch(
                    `http://localhost:8080/api/v1/admin/menu/${itemIdx}`,
                    {
                        method: 'DELETE',
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
                if (response.success) {
                    getCategroyMenuData();
                }
            }
        }
    };

    useEffect(() => {
        getCategroyMenuData();
    }, [pageNumber]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <h2 className='text-2xl font-bold mb-5 text-center text-gray-600'>
                상품 목록
            </h2>

            <div className='w-full mt-2 p-2'>
                <p className='text-base mb-2 text-gray-600'>
                    총 {itemList?.totalElements}개의 상품이 있습니다.
                </p>
                <table className='table-fixed w-full border border-gray-300 rounded-md shadow-md'>
                    <thead className='bg-white text-gray-700 border-b border-gray-200'>
                        <tr>
                            <th className='px-2 py-2'>번호</th>
                            <th className='px-2 py-2'>이름</th>
                            <th className='px-2 py-2'>이미지</th>
                            <th className='px-2 py-2'>가격</th>
                            <th className='px-2 py-2'>옵션</th>
                            <th className='px-2 py-2'>수정</th>
                            <th className='px-2 py-2'>삭제</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {itemList?.content.map((item, idx) => (
                            <tr key={item.menuIdx} className='bg-white'>
                                <td className='px-5 py-1'>
                                    {itemList.pageable.pageNumber *
                                        itemList.pageable.pageSize +
                                        idx +
                                        1}
                                </td>
                                <td className='px-2.5 py-1 font-medium text-sm text-gray-700'>
                                    {item.menuName}
                                </td>
                                <td className='py-4 py-2 font-medium text-sm text-gray-700'>
                                    <div className='w-24'>
                                        <img
                                            src={`/assets/${item.imgSrc}`}
                                            alt={item.menuName}
                                        />
                                    </div>
                                </td>
                                <td className='px-4 py-1 py-1 font-medium text-sm text-gray-700'>
                                    {item.menuPrice}
                                </td>
                                <td className='px-0.5 py-1 py-1 font-medium text-sm text-gray-700'>
                                    {item.menuOption}
                                </td>
                                <td className='px-4 py-3 whitespace-nowrap text-sm'>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/menu/${categoryId}/${item.menuIdx}`
                                            )
                                        }
                                        className='px-4 py-2 text-sm text-white bg-[#12225c] hover:bg-[#59648C] rounded'
                                    >
                                        수정
                                    </button>
                                </td>
                                <td className='px-2 py-3 whitespace-nowrap text-sm'>
                                    <button
                                        onClick={() => deleteMenu(item.menuIdx)}
                                        className='px-4 py-2 text-sm text-white bg-gray-400 hover:bg-gray-300 rounded'
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={pageNumber}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
export default AdminMenuList;
