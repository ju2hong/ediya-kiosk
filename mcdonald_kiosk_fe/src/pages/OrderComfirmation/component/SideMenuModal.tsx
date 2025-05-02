/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Item, Items } from '../../MenuList';
import Button from '../../../components/Button';
import SideMenuItem from './SideMenuItem';
import { useCart } from '../../../contexts/cart-context';

interface SideMenuModalProp {
    onClick: () => void;
}

function SideMenuModal({ onClick }: SideMenuModalProp) {
    const { saveItem } = useCart();
    const [itemList, setItemList] = useState<Items>();
    const [additionalItems, setAdditionalItems] = useState<Item[]>([]);

    const getSideMenuData = async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/menu?categoryId=4&page=0`
        )
            .then((res) => res.json())
            .catch((err) => console.error(err));
        if (response.success && !response.data.empty) {
            setItemList(response.data);
        }
    };

    const clickAdditionalItem = (item: Item) => {
        const foundItemIdx = additionalItems.findIndex(
            (data: Item) => data.menuIdx === item.menuIdx
        );
        foundItemIdx === -1
            ? setAdditionalItems([...additionalItems, item])
            : setAdditionalItems([
                  ...additionalItems.filter(
                      (data, idx) => idx !== foundItemIdx
                  ),
              ]);
    };

    const onClickSaveItems = (item: Item[]) => {
        item.map((data) => {
            saveItem({
                id: 0,
                menuIdx: data.menuIdx,
                menuName: data.menuName,
                menuImg: data.imgSrc,
                menuPrice: data.menuPrice,
                menuCalory: data.menuCalory,
                totalCnt: 0,
            });
        });
        onClick();
    };

    useEffect(() => {
        getSideMenuData();
    }, []);

    return (
        <div className='bg-white w-1/2 h-5/6 border rounded-lg flex flex-col justify-center items-center'>
            <h2 className='text-2xl mt-5 mb-5 font-medium'>
                함께 즐기면 더욱 좋습니다!
            </h2>
            <div className='w-4/5 h-4/6 grid grid-cols-3 grid-rows-3 gap-5'>
                {itemList?.content.map((item, index) => (
                    <SideMenuItem
                        key={item.menuIdx + '_' + index}
                        menu={item}
                        onClickAddition={clickAdditionalItem}
                    />
                ))}
            </div>
            <div className='mt-10'>
                <Button
                    bgColor='bg-slate-200'
                    text='취소'
                    textColor='#12225c'
                    textSize='lg'
                    classes='w-20 py-2 rounded-[20px] font-medium hover:bg-slate-300 mr-4'
                    onClick={onClick}
                />
                <Button
                    bgColor='bg-[#12225c]'
                    text='완료'
                    textColor='white'
                    textSize='lg'
                    classes='w-20 py-2 rounded-[20px] font-medium hover:bg-[#2f3e7a] ml-4'
                    onClick={() => onClickSaveItems(additionalItems)}
                />
            </div>
        </div>
    );
}
export default SideMenuModal;
