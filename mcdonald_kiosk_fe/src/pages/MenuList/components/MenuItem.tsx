import { useCart } from '../../../contexts/cart-context';

export interface Menu {
    idx: number;
    img: string;
    name: string;
    calory: number;
    price: number;
}

function MenuItem({ idx, img, name, calory, price }: Menu) {
    const { saveItem } = useCart();

    const onClickSaveItem = (item: Menu) => {
        saveItem({
            id: 0,
            menuIdx: item.idx,
            menuName: item.name,
            menuImg: item.img,
            menuPrice: item.price,
            menuCalory: item.calory,
            totalCnt: 0,
        });
    };
    return (
        <button
            onClick={() => onClickSaveItem({ idx, name, img, price, calory })}
            className='bg-slate-50 w-42 h-full border border-none rounded-md p-1 cursor-pointer'
        >
            <div className='w-full h-4/6 mb-0.5'>
                <img
                    src={`/assets/${img}`}
                    alt={name}
                    className='w-full h-full object-contain'
                />
            </div>
            <p className='text-sm font-semibold mx-1 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                {name}
            </p>
            <div className='flex justify-between mx-1 items-center'>
                <p className='text-xs text-gray-700'>{calory} kcal</p>
                <p className='text-right text-sm'>{price} 원</p>
            </div>
        </button>
    );
}
export default MenuItem;
