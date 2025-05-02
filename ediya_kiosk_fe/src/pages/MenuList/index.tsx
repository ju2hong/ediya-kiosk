/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import CategoryItem from './components/CategoryItem';
import MenuItem from './components/MenuItem';
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import CartItem from './components/CartItem';
import { useCart } from '../../contexts/cart-context';
import { Link, useNavigate } from 'react-router-dom';

export type Item = {
    imgSrc: string;
    menuCalory: number;
    menuIdx: number;
    menuName: string;
    menuPrice: number;
};

export type Items = {
    content: Item[];
    first: boolean;
    last: boolean;
};

function MenuList() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [itemList, setItemList] = useState<Items>();
    const { cart, totalPrice, removeAllItem } = useCart();
    const navigate = useNavigate();

    // prev 페이지
    const clickPrevBtn = () => {
        setPageNumber((prevNumber) => prevNumber - 1);
    };

    // next 페이지
    const clickNextBtn = () => {
        setPageNumber((prevNumber) => prevNumber + 1);
    };

    // 카테고리 변경
    const clickChangeCategory = (number: number) => {
        setSelectedCategoryId(number);
        setPageNumber(0);
    };

    const onClickremoveAllItem = () => {
        if (confirm('주문 내역을 모두 삭제하시겠습니까?')) {
            removeAllItem();
        }
    };

    // 추천 메뉴 리스트 api
    const getRecommendData = async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/recommend?page=${pageNumber}`
        )
            .then((res) => res.json())
            .catch((err) => console.log(err));
        if (response.success && !response.data.empty) {
            setItemList(response.data);
        }
    };
    // 해당 카테고리 메뉴 리스트 api
    const getCategroyMenuData = async () => {
        const response = await fetch(
            `http://localhost:8080/api/v1/menu?categoryId=${selectedCategoryId}&page=${pageNumber}`
        )
            .then((res) => res.json())
            .catch((err) => console.error(err));
        if (response.success && !response.data.empty) {
            setItemList(response.data);
        }
    };

    const gotoHome = () => {
        removeAllItem();
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        selectedCategoryId === 0 ? getRecommendData() : getCategroyMenuData();
    }, [pageNumber, selectedCategoryId]);

    return (
        <div className='w-full h-full bg-white flex flex-col'>
            <div className='h-1/6 bg-[#12225c] flex'>
                <div className='w-3/4 text-white flex flex-col justify-between m-5'>
                    <p className='font-["Helvetica"] font-extrabold text-4xl'>
                        EDIYA COFFEE
                    </p>
                    <div className='flex items-end gap-[15px]'>
                        <img
                            src='/assets/home.png'
                            className='w-[32px] ml-[10px] cursor-pointer'
                            onClick={gotoHome}
                        ></img>
                    </div>
                </div>
                <img src='/assets/bannerLogo.png'></img>
            </div>
            <div className='h-3/5 flex justify-around mt-1'>
                <div className='w-full h-full'>
                    <div className='flex justify-center items-center m-1'>
                        <CategoryItem
                            name='New Menu'
                            bgColor={
                                selectedCategoryId === 0
                                    ? 'bg-[#12225c]'
                                    : 'bg-white'
                            }
                            color={
                                selectedCategoryId === 0
                                    ? 'text-white'
                                    : 'text-[#12225c]'
                            }
                            onClick={() => clickChangeCategory(0)}
                        />
                        <CategoryItem
                            name='COFFEE'
                            bgColor={
                                selectedCategoryId === 1
                                    ? 'bg-[#12225c]'
                                    : 'bg-white'
                            }
                            color={
                                selectedCategoryId === 1
                                    ? 'text-white'
                                    : 'text-[#12225c]'
                            }
                            onClick={() => clickChangeCategory(1)}
                        />
                        <CategoryItem
                            name='BEVERAGE'
                            bgColor={
                                selectedCategoryId === 2
                                    ? 'bg-[#12225c]'
                                    : 'bg-white'
                            }
                            color={
                                selectedCategoryId === 2
                                    ? 'text-white'
                                    : 'text-[#12225c]'
                            }
                            onClick={() => clickChangeCategory(2)}
                        />
                        <CategoryItem
                            name='FLATCCINO'
                            bgColor={
                                selectedCategoryId === 3
                                    ? 'bg-[#12225c]'
                                    : 'bg-white'
                            }
                            color={
                                selectedCategoryId === 3
                                    ? 'text-white'
                                    : 'text-[#12225c]'
                            }
                            onClick={() => clickChangeCategory(3)}
                        />
                        <CategoryItem
                            name='ICECREAM'
                            bgColor={
                                selectedCategoryId === 4
                                    ? 'bg-[#12225c]'
                                    : 'bg-white'
                            }
                            color={
                                selectedCategoryId === 4
                                    ? 'text-white'
                                    : 'text-[#12225c]'
                            }
                            onClick={() => clickChangeCategory(4)}
                        />
                        <CategoryItem
                            name='BREAD'
                            bgColor={
                                selectedCategoryId === 5
                                    ? 'bg-[#12225c]'
                                    : 'bg-white'
                            }
                            color={
                                selectedCategoryId === 5
                                    ? 'text-white'
                                    : 'text-[#12225c]'
                            }
                            onClick={() => clickChangeCategory(5)}
                        />
                    </div>
                    <p className='text-base flex justify-self-end mr-3'>
                        <span className='font-semibold'>
                            {sessionStorage.getItem('userName') || '비회원'}
                        </span>
                        <p>님 안녕하세요!</p>
                    </p>
                    <div className='flex justify-center w-full h-5/6 gap-[15px] mt-5'>
                        <button
                            onClick={
                                !itemList?.first ? clickPrevBtn : undefined
                            }
                            disabled={itemList?.first}
                        >
                            <BiSolidLeftArrow
                                size={20}
                                color={itemList?.first ? '#949dc0' : '#12225c'}
                            />
                        </button>
                        <div className='px-3 w-4/5 grid grid-cols-3 grid-rows-3 gap-2'>
                            {itemList?.content.map((item, index) => (
                                <MenuItem
                                    // eslint-disable-next-line react/no-array-index-key
                                    key={item.menuIdx + '_' + index}
                                    idx={item.menuIdx}
                                    img={item.imgSrc}
                                    name={item.menuName}
                                    calory={item.menuCalory}
                                    price={item.menuPrice}
                                />
                            ))}
                        </div>
                        <button
                            onClick={!itemList?.last ? clickNextBtn : undefined}
                            disabled={itemList?.last}
                        >
                            <BiSolidRightArrow
                                size={20}
                                color={itemList?.last ? '#949dc0' : '#12225c'}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full h-2/6 flex mt-[50px] bg-slate-100'>
                <div className='w-full h-full flex items-center overflow-auto px-3'>
                    <div className='justify-start grid grid-flow-col gap-x-2'>
                        {cart?.map((item) => (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                img={item.menuImg}
                                totalCnt={item.totalCnt}
                            />
                        ))}
                    </div>
                </div>
                <div className='w-2/5 flex flex-col gap-2 bg-slate-100 items-center mt-2'>
                    <div className='w-11/12 h-1/3 bg-white border rounded-[50px] border-[#12225c] flex flex-col items-center justify-center'>
                        <p className='text-sm font-medium'>총 결제 금액</p>
                        <p className='text-red-500 font-semibold'>
                            ₩ {totalPrice}
                        </p>
                    </div>
                    <button
                        onClick={onClickremoveAllItem}
                        className='w-11/12 h-1/3 self-center rounded-[50px] text-base font-semibold bg-slate-200 hover:bg-slate-300'
                    >
                        전체 취소
                    </button>
                    <Link to='/order' className='w-11/12 h-1/3'>
                        <button className='w-full h-full self-center rounded-[50px] text-base text-white font-semibold bg-[#12225c] hover:bg-[#334689]'>
                            결제하기
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MenuList;
