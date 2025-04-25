import { FC } from 'react';
import { useCart } from '../../../contexts/cart-context';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const OrderMenuItem: FC<OrderItem> = (item: OrderItem) => {
    const { removeItem, onQuantityPlus, onQuantityMinus } = useCart();

    return (
        <div className='w-full' key={item.id}>
            <div className='flex items-center justify-center px-4 py-1.5 my-2 border rounded text-black-400 '>
                <div className='flex items-center space-x-4'>
                    <span>
                        {item.name} - {item.price}원
                    </span>
                    <button
                        onClick={() => onQuantityMinus(item.id)}
                        className='px-2 text-center align-middle border border-gray-900 rounded-md select-none'
                    >
                        -
                    </button>
                    <span>{item.quantity}개</span>
                    <button
                        onClick={() => onQuantityPlus(item.id)}
                        className='px-2 text-center align-middle border border-gray-900 rounded-md select-none'
                    >
                        +
                    </button>
                    <button
                        onClick={() => removeItem(item.id)}
                        className='px-2 py-1 text-sm text-white bg-red-500 rounded-md'
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderMenuItem;
