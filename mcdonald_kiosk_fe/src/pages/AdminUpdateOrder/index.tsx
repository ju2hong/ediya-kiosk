import { useNavigate, useParams } from 'react-router-dom';
import { OrderItemProps } from '../AdminOrder';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Button from '../../components/Button';

export const AdminUpdateOrder = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const accessToken = sessionStorage.getItem('token');
    const [editedOrder, setEditedOrder] = useState<OrderItemProps>({
        idx: 0,
        orderCode: '',
        orderCount: 0,
        orderNumber: 0,
        orderPrice: 0,
        orderStatus: '',
        orderTime: new Date(),
    });

    const handleEditOrder = async () => {
        if (accessToken) {
            await fetch(`http://localhost:8080/api/v1/admin/order/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': accessToken,
                },
                body: JSON.stringify({
                    orderCount: editedOrder.orderCount,
                    orderPrice: editedOrder.orderPrice,
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.status === 403) {
                        alert('관리자만 이용가능합니다.');
                        location.href = '/';
                    }
                    if (res.success) {
                        navigate('/admin/order');
                    }
                });
        }
    };

    const getOrder = async () => {
        if (accessToken) {
            await fetch(`http://localhost:8080/api/v1/admin/order/${orderId}`, {
                headers: {
                    'X-AUTH-TOKEN': accessToken,
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.status === 403) {
                        alert('관리자만 이용가능합니다.');
                        location.href = '/';
                    }
                    if (res.success) {
                        setEditedOrder(res.data);
                    }
                });
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <div className='flex flex-col items-center mt-8 w-full max-w-md mx-auto'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-600'>
                주문정보 수정
            </h2>
            <div className='w-full bg-gray-200 rounded-lg p-4'>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>주문코드</label>
                    <input
                        type='text'
                        value={editedOrder?.orderCode}
                        className='w-full border border-gray-300 rounded p-2 bg-gray-100'
                        disabled
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>주문총금액</label>
                    <input
                        type='number'
                        value={editedOrder?.orderPrice}
                        onChange={(e) =>
                            setEditedOrder((order) => ({
                                ...order,
                                orderPrice: e.target.valueAsNumber,
                            }))
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>주문상품개수</label>
                    <input
                        type='number'
                        value={editedOrder?.orderCount}
                        onChange={(e) =>
                            setEditedOrder((order) => ({
                                ...order,
                                orderCount: e.target.valueAsNumber,
                            }))
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>임시번호</label>
                    <p className='p-2 bg-gray-100 text-gray-700 rounded'>
                        {editedOrder?.orderNumber}
                    </p>
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>주문상태</label>
                    <p className='p-2 bg-gray-100 text-gray-700 rounded'>
                        {editedOrder?.orderStatus}
                    </p>
                </div>
                <div className='mb-4'>
                    <label className='block font-bold mb-1'>결제시간</label>
                    <p className='p-2 bg-gray-100 text-gray-700 rounded'>
                        {format(editedOrder.orderTime, 'yyyy-MM-dd')}
                    </p>
                </div>
                <div className='flex justify-center'>
                    <Button
                        bgColor='bg-[#12225c]'
                        text='수정하기'
                        textColor='white'
                        textSize='base'
                        classes='w-1/4 px-4 py-2 rounded hover:bg-gray-400 mr-4'
                        onClick={handleEditOrder}
                    />
                    <Button
                        bgColor='bg-gray-600 '
                        text='취소'
                        textColor='white'
                        textSize='base'
                        classes='w-1/4 px-4 py-2 rounded hover:bg-gray-400'
                        onClick={() => navigate(-1)}
                    />
                </div>
            </div>
        </div>
    );
};
