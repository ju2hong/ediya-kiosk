import { TiDeleteOutline } from 'react-icons/ti';
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
        <button
            className='relative w-16 h-16 mx-2'
            onClick={() => onClickRemoveItem(id)}
        >
            <div className='absolute -right-1 -top-1 cursor-pointer'>
                <TiDeleteOutline size={20} color='rgb(82 82 82)' />
            </div>
            <img
                src={`/assets/${img}`}
                alt='cartItem'
                className='w-full h-full border border-none rounded-md object-cover bg-slate-50'
            />
            <div className='absolute right-1 bottom-0.5 cursor-pointer text-sm font-semibold'>
                {totalCnt}
            </div>
        </button>
    );
}
export default CartItem;
