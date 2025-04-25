import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../../contexts/order-context';

export interface OrderPaymentProps {
    totalPrice: number;
    totalCount: number;
}

const OrderPayment: FC = () => {
    const orderInfo = useOrderContext();

    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/orderConfirm');
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div>
            <h1 className='pt-5 pb-5 text-center text-white'>
                주문을 확인하세요.
            </h1>

            <div className='p-2 mx-10 mt-2 text-center bg-white border rounded-lg'>
                <span>총 수량 : {orderInfo?.data?.orderCount}개</span>
                <span className='text-red-600'>
                    {' '}
                    총 가격 : {orderInfo?.data?.orderPrice}원
                </span>
            </div>
            <div className='p-2 mx-10 mt-20 text-center bg-white border rounded-lg'>
                <p>
                    카드를 화살표 방향으로 투입구에 넣어주세요. 결제 오류시,
                    카드를 긁어주세요.
                </p>
                <img src='./public/assets/payment.png' className='p-4' />
            </div>
        </div>
    );
};

export default OrderPayment;
