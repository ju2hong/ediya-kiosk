import OrderMenuItem from './component/OrderMenuItem';
import Button from '../../components/Button';
import { useCart } from '../../contexts/cart-context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SideMenuModal from './component/SideMenuModal';
import { useOrderContext } from '../../contexts/order-context';

export const OrderComfirmation = () => {
    const { cart, totalCount, totalPrice } = useCart();
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const context = useOrderContext();

    const handlePayment = () => {
        postOrder();
    };

    const postOrder = async () => {
        const order = { totalCount: totalCount, totalPrice: totalPrice };
        const accessToken = sessionStorage.getItem('token');

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        if (accessToken) {
            headers['X-AUTH-TOKEN'] = accessToken;
        }

        await fetch('http://localhost:8080/api/v1/order', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(order),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    context?.setData(res.data);
                    navigate('/payment');
                }
            });
    };

    return (
        <div className='h-full'>
            <h1 className='mt-20 font-bold text-2xl text-center text-white'>
                주문 내역
            </h1>
            <div className='p-4 mx-8 mt-12 bg-white rounded-md h-2/3'>
                <div className='mb-3 h-4/5 overflow-y-scroll'>
                    <div className='flex flex-col items-center justify-center'>
                        {cart?.map((order) => (
                            <OrderMenuItem
                                key={order.id}
                                id={order.id}
                                name={order.menuName}
                                price={order.menuPrice}
                                quantity={order.totalCnt}
                            />
                        ))}
                        {cart.length <= 0 && (
                            <p className='mt-3 text-xl font-semibold'>
                                주문하신 내역이 없습니다.
                            </p>
                        )}
                    </div>
                </div>

                <div className='flex justify-end mb-5'>
                    <p>총 수량: {totalCount}</p>
                    <p className='ml-4 mr-2'>총 가격:</p>
                    <p className='mr-4 text-red-500'>₩ {totalPrice}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <Button
                        bgColor='bg-slate-200'
                        text='뒤로가기'
                        textColor='#12225c'
                        textSize='base'
                        classes='w-44 py-3 rounded-[20px] font-bold hover:bg-slate-300'
                        onClick={() => navigate('/menu')}
                    />
                    <Button
                        bgColor='bg-[#3a4e94]'
                        text='추가메뉴'
                        textColor='white'
                        textSize='base'
                        classes='w-44 py-3 rounded-[20px] font-medium hover:bg-[#6576b4]'
                        onClick={() => setModalOpen(true)}
                    />
                    <Button
                        bgColor='bg-[#12225c]'
                        text='결제하기'
                        textColor='white'
                        textSize='base'
                        classes='w-44 py-3 rounded-[20px] font-medium hover:bg-[#2f3e7a]'
                        onClick={handlePayment}
                    />
                </div>
            </div>
            {modalOpen && (
                <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-neutral-600/50'>
                    <SideMenuModal onClick={() => setModalOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default OrderComfirmation;
