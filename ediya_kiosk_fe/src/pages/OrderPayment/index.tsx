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
        <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1e3269] to-[#12225c]'>
            <div className='w-[400px] sm:w-[500px] h-[550px] overflow-hidden bg-slate-100 rounded-3xl shadow-2xl p-8 text-center space-y-4'>
                <h1 className='text-2xl mb-6'>신용카드 결제</h1>
                <p className='text-lg font-semibold'>
                    카드를 <span className='font-bold'>화살표 방향</span>
                    으로 투입구에 넣어주세요.
                </p>
                <p className='text-sm text-gray-500'>
                    결제 오류시, 카드를 긁어주세요.
                </p>
                <div className='text-lg font-medium'>
                    <p>
                        총 수량:{' '}
                        <span className=''>{orderInfo?.data?.orderCount}</span>
                        개
                    </p>
                    <p>
                        총 가격:{' '}
                        <span className='font-bold'>
                            {orderInfo?.data?.orderPrice}
                        </span>
                        원
                    </p>
                </div>
                <br />
                <br />
                <img
                    src='/assets/insertcard.gif'
                    alt='카드 삽입 안내'
                    className='w-48 h-auto mx-auto mt-3'
                />
            </div>
        </div>
    );
};

export default OrderPayment;
