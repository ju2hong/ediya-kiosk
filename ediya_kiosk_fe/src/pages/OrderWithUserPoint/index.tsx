import { FC, useEffect } from 'react';
import { useOrderContext } from '../../contexts/order-context';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart-context';

export const OrderWithUserPoint: FC = () => {
    const context = useOrderContext();
    const { removeAllItem } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAllItem();
            sessionStorage.clear();
            navigate('/');
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className='flex flex-col justify-center h-full bg-gray-100 text-center'>
            <div className='flex justify-center'>
                <img
                    className='w-[150px] h-[150px]'
                    src='./public/assets/EdiyaLogo.png'
                />
            </div>
            <p className='text-[20px] mt-5'>결제가 완료 되었습니다. </p>
            <br />
            <span className='font-bold text-[30px]'> 주문번호 </span>
            <span className='font-bold text-[60px]'>
                {context?.data?.orderNumber}
            </span>
            <br />
            {context?.data?.userPoint !== -1 && (
                <p className='text-[20px]'>
                    회원님의 적립금은{' '}
                    <span className='font-bold'>
                        {context?.data?.userPoint}
                    </span>
                    원 입니다.
                </p>
            )}
        </div>
    );
};
