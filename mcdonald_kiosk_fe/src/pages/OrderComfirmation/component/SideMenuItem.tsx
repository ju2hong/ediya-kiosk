import { useState } from 'react';
import { Item } from '../../MenuList';

interface SideMenuItem {
    menu: Item;
    onClickAddition: (menu: Item) => void;
}

function SideMenuItem({ menu, onClickAddition }: SideMenuItem) {
    const [clicked, setClicked] = useState<boolean>(false);

    const clickItem = () => setClicked(!clicked);

    return (
        <button
            onClick={() => {
                clickItem();
                onClickAddition(menu);
            }}
            className={`border ${clicked ? 'border-4 border-red-500' : 'border-none'} bg-slate-50 w-42 h-full rounded-md p-1 cursor-pointer flex flex-col justify-center items-center`}
        >
            <div className='w-full h-4/6 mb-0.5'>
                <img
                    src={`/assets/${menu.imgSrc}`}
                    alt={menu.menuName}
                    className='w-full h-full object-contain'
                />
            </div>
            <p className='text-sm font-semibold mx-1 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                {menu.menuName}
            </p>
            <div className='flex justify-between mx-1 items-center w-4/5'>
                <p className='text-xs text-gray-700'>{menu.menuCalory} kcal</p>
                <p className='text-right text-sm'>{menu.menuPrice} 원</p>
            </div>
        </button>
    );
}
export default SideMenuItem;
