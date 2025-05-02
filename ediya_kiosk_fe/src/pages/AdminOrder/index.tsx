import { useEffect, useState } from 'react';
import { OrderListItem } from './component/OrderListItem';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';

export interface OrderItemProps {
    idx: number;
    orderCode: string;
    orderPrice: number;
    orderCount: number;
    orderNumber: number;
    orderStatus: string;
    orderTime: Date;
}

export interface OrderList {
    data: OrderItemProps[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    totalElements: number;
}

export const AdminOrder = () => {
    const [orders, setOrders] = useState<OrderItemProps[]>([]);
    const [totalPage, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);
    const accessToken = sessionStorage.getItem('token');
    const navigate = useNavigate();

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getOrderList = async () => {
        if (accessToken) {
            await fetch(
                `http://localhost:8080/api/v1/admin/order?page=${currentPage}`,
                {
                    method: 'GET',
                    headers: {
                        'X-AUTH-TOKEN': accessToken,
                    },
                }
            )
                .then((res) => {
                    return res.json();
                })
                .then((response) => {
                    if (response.status === 403) {
                        alert('관리자만 이용가능합니다.');
                        location.href = '/';
                    }
                    console.log(response.data);
                    setOrders(response.data.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements);
                    setPageNumber(response.data.pageable.pageNumber);
                    setPageSize(response.data.pageable.pageSize);
                })
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        getOrderList();
    }, [currentPage, orders]);

    const handleEditOrder = (id: number) => {
        navigate(`/admin/order/${id}`);
    };

    const handleOrderDelete = async (orderIdx: number) => {
        if (accessToken) {
            fetch(`http://localhost:8080/api/v1/admin/order/${orderIdx}`, {
                method: 'DELETE',
                headers: {
                    'X-AUTH-TOKEN': accessToken,
                },
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.status === 403) {
                        alert('관리자만 이용가능합니다.');
                        location.href = '/';
                    }
                    if (response.success) {
                        setOrders(
                            orders.filter((order) => orderIdx != order.idx)
                        );
                        alert('삭제되었습니다.');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className='w-full'>
            <h2 className='text-2xl font-bold mb-5 text-center text-gray-600'>
                주문 목록
            </h2>
            <div className='w-full max-w-screen-lg mt-2 mx-auto'>
                <p className='text-base mb-2 text-gray-600'>
                    총 {totalElements}건의 주문이 있습니다.
                </p>
                <div className='w-full'>
                    <table className='table-fixed w-full border border-gray-300 rounded-md shadow-md'>
                        <thead className='bg-white text-gray-700 border-b border-gray-200'>
                            <tr>
                                <th className='px-2 py-3'>번호</th>
                                <th className='px-1 py-3'>주문코드</th>
                                <th className='px-6- py-3'>주문금액</th>
                                <th className='px-1 py-3'>임시번호</th>
                                <th className='px-1 py-3'>주문상태</th>
                                <th className='px-1 py-3'>주문일시</th>
                                <th className='px-2 py-3'>수정</th>
                                <th className='px-2 py-3'>삭제</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {orders.map((order, idx) => (
                                <OrderListItem
                                    key={order.idx}
                                    idx={pageNumber * pageSize + 1 + idx}
                                    order={order}
                                    onEdit={handleEditOrder}
                                    onDelete={handleOrderDelete}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};
