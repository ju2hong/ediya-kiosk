import { FC } from 'react';
import { useCart } from '../../../contexts/cart-context';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

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
            <div className='flex items-center justify-center p-4 my-2 ml-3 bg-slate-100 rounded-xl'>
                <div className='flex items-center justify-center gap-5'>
                    <span className='font-bold'>{item.name}</span>
                    <span className='font-medium'>- {item.price}원</span>
                    <div className='flex items-center gap-1'>
                        <FiMinusCircle
                            onClick={() => onQuantityMinus(item.id)}
                            size={25}
                            color={'#12225c'}
                        ></FiMinusCircle>
                        <span>{item.quantity}</span>
                        <FiPlusCircle
                            onClick={() => onQuantityPlus(item.id)}
                            size={25}
                            color={'#12225c'}
                        ></FiPlusCircle>
                    </div>

                    <button
                        onClick={() => removeItem(item.id)}
                        className='px-2 py-1 text-sm text-white bg-slate-400 rounded-md'
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderMenuItem;
