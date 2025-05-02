import { TiDelete } from 'react-icons/ti';
import { useCart } from '../../../contexts/cart-context';

type CartProp = {
    id: number;
    img: string;
    totalCnt: number;
};

function CartItem({ id, img, totalCnt }: CartProp) {
    const { removeItem } = useCart();

    const onClickRemoveItem = (itemId: number) => {
        removeItem(itemId);
    };

    return (
        <button className='relative w-24 h-24 mx-2'>
            <div className='absolute -right-1 -top-1'>
                <TiDelete
                    size={25}
                    color='#12225c'
                    onClick={() => onClickRemoveItem(id)}
                    className='cursor-pointer'
                />
            </div>
            <img
                src={`/assets/${img}`}
                alt='cartItem'
                className='w-full h-full rounded-[10px] object-cover bg-slate-50'
            />
            <div className='w-5 h-5 absolute right-1 bottom-0.5 text-sm font-semibold'>
                {totalCnt}
            </div>
        </button>
    );
}
export default CartItem;
