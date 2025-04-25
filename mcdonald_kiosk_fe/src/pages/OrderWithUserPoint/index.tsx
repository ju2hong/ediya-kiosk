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
        <div className='h-full bg-gray-100 '>
            <div className='flex justify-center pt-20'>
                <img
                    className='w-1/2 h-1/3'
                    src='./public/assets/Mcdonald_Logo.png'
                />
            </div>
            <p className='text-center'>
                고객의 주문번호는{' '}
                <span className='font-bold'>{context?.data?.orderNumber}</span>{' '}
                입니다.
            </p>
            <p className='font-bold text-center'>감사합니다.</p>
            {context?.data?.userPoint !== -1 && (
                <p className='mt-8 text-center'>
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
