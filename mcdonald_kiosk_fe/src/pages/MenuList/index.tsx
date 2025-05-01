/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import CategoryItem from './components/CategoryItem';
import Button from '../../components/Button';
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
    const { cart, totalPrice, totalCount, removeAllItem } = useCart();
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
        <div className='w-full h-full bg-white p-1'>
            <div className='w-full h-1/6'>
                <img
                    src='/assets/menulogo.png'
                    alt='ad'
                    className='w-full h-full object-scale'
                />
            </div>
            <div className='w-full h-3/5 flex justify-around'>
                <div className='w-1/5 flex flex-col items-center'>
                    <div className='w-full h-16 m-2 flex justify-center'>
                        <img
                            src='/assets/Mcdonald_Logo.png'
                            alt='logo'
                            className='w-1/2 h-full'
                        />
                    </div>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <CategoryItem
                            img='/assets/burger_set1.png'
                            name='New Menu'
                            onClick={() => clickChangeCategory(0)}
                        />
                        <CategoryItem
                            img='/assets/burger1.png'
                            name='COFFEE'
                            onClick={() => clickChangeCategory(1)}
                        />
                        <CategoryItem
                            img='/assets/burger_set2.png'
                            name='BEVERAGE'
                            onClick={() => clickChangeCategory(2)}
                        />
                        <CategoryItem
                            img='/assets/happymeal1.png'
                            name='FLATCCINO'
                            onClick={() => clickChangeCategory(3)}
                        />
                        <CategoryItem
                            img='/assets/side6.png'
                            name='ICECREAM'
                            onClick={() => clickChangeCategory(4)}
                        />
                        <CategoryItem
                            img='/assets/drink2.png'
                            name='BREAD'
                            onClick={() => clickChangeCategory(5)}
                        />
                    </div>
                </div>
                <div className='w-4/5 h-full'>
                    <div className='w-full h-16 m-2 flex justify-between'>
                        <h2 className='w-48 text-3xl ml-3 font-semibold m-auto'>
                            추천메뉴
                        </h2>
                        <div className='flex flex-col mr-5 justify-between items-end'>
                            <Button
                                text='이 전'
                                textColor='white'
                                bgColor='bg-green-900'
                                textSize='sm'
                                classes='w-16 hover:bg-green-700'
                                onClick={() => navigate('/place')}
                            />
                            <p className='text-base'>
                                <span className='text-red-600 font-semibold'>
                                    {sessionStorage.getItem('userName') ||
                                        '비회원'}
                                </span>
                                님 안녕하세요
                            </p>
                        </div>
                    </div>
                    <div className='w-full h-4/5 px-3 grid grid-cols-3 grid-rows-3 gap-2'>
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
                    <div className='w-full flex justify-center items-center mt-1 gap-2 cursor-pointer'>
                        <button
                            onClick={
                                !itemList?.first ? clickPrevBtn : undefined
                            }
                            disabled={itemList?.first}
                        >
                            <BiSolidLeftArrow
                                size={20}
                                color={itemList?.first ? 'gray' : 'black'}
                            />
                        </button>
                        <button
                            onClick={!itemList?.last ? clickNextBtn : undefined}
                            disabled={itemList?.last}
                        >
                            <BiSolidRightArrow
                                size={20}
                                color={itemList?.last ? 'gray' : 'black'}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full h-1/6 mt-3 border border-1'>
                <div className='w-full h-8 px-4 leading-loose bg-green-900 text-base font-medium text-white flex justify-between'>
                    <p>주문 내역</p>
                    <div className='flex text-sm leading-loose'>
                        <p className='mr-2'>총 가격: {totalPrice}원</p>
                        <p>수량: {totalCount}</p>
                    </div>
                </div>
                <div>
                    <Link to='/order'>
                        <p className='text-right mr-2 text-sm font-medium cursor-pointer'>
                            {'>>'} 주문 상세보기
                        </p>
                    </Link>
                    <div className='w-full h-16 flex justify-center overflow-auto'>
                        <div className='w-full h-full justify-start grid auto-cols-auto grid-flow-col gap-x-2'>
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
                    <button
                        onClick={onClickremoveAllItem}
                        className='border border-1 border-gray-700 rounded-sm bg-slate-100 px-2 text-xs float-right mr-2 hover:bg-slate-200'
                    >
                        비우기
                    </button>
                </div>
            </div>
            <div className='w-full mt-1 h-10 px-1 flex justify-center items-center'>
                <Button
                    bgColor='bg-red-600'
                    text='주문 취소'
                    textColor='white'
                    textSize='base'
                    classes='w-1/2 h-full font-semibold mr-1 hover:bg-red-700'
                    onClick={() => gotoHome()}
                />

                <Link to='/order' className='w-1/2 h-full'>
                    <Button
                        bgColor='bg-green-700'
                        text='주문 완료'
                        textColor='white'
                        textSize='base'
                        classes='w-full h-full font-semibold ml-1 hover:bg-green-800'
                    />
                </Link>
            </div>
        </div>
    );
}

export default MenuList;
