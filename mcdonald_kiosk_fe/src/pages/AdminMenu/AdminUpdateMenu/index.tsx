/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdminItem } from '../AdminMenuList';
import Button from '../../../components/Button';

const categories = [
    {
        idx: 1,
        name: '버거 단품',
    },
    {
        idx: 2,
        name: '버거 세트',
    },
    {
        idx: 3,
        name: '해피밀',
    },
    {
        idx: 4,
        name: '디저트&사이드',
    },
    {
        idx: 5,
        name: '음료&커피',
    },
];

function AdminUpdateMenu() {
    const { menuId } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<AdminItem>();
    const [updatedData, setUpdatedData] = useState({
        menuName: '',
        menuPrice: 0,
        menuCategory: 0,
        menuCalory: 0,
        menuRecommend: false,
    });
    const [file, setFile] = useState<File | null>(null);
    const [imageFile, setImageFile] = useState<string>('');
    const [isImageChange, setIsImageChange] = useState<boolean>(false);

    const token = sessionStorage.getItem('token');

    // 날짜 포맷팅
    const formatDate = (date: Date): string => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList[0]) {
            setFile(fileList[0]);
            const url = URL.createObjectURL(fileList[0]);
            setImageFile(url);
            setIsImageChange(true);
        }
    };

    // 해당 메뉴 api
    const getMenuData = async () => {
        if (token) {
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/menu/${menuId}`,
                {
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            )
                .then((res) => res.json())
                .catch((err) => console.error(err));
            if (response.status === 403) {
                alert('관리자만 이용가능합니다.');
                location.href = '/';
            }
            if (response.success && !response.data.empty) {
                setItem(response.data);
                setUpdatedData((data) => {
                    return {
                        ...data,
                        menuName: response.data.menuName,
                        menuPrice: response.data.menuPrice,
                        menuCategory:
                            categories.findIndex(
                                (category) =>
                                    category.name === response.data.menuOption
                            ) + 1,
                        menuCalory: response.data.menuCalory,
                        menuRecommend: response.data.menuRecommend,
                    };
                });
                setImageFile('/assets/' + response.data.imgSrc);
            }
        }
    };

    // 이미지 정보 수정
    const uploadFiles = async () => {
        const formData = new FormData();
        if (token) {
            if (file) {
                formData.append('uploadfile', file, file.name);
                const response = await fetch(
                    `http://localhost:8080/api/v1/admin/image/${item?.imgIdx}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'X-AUTH-TOKEN': token,
                        },
                        body: formData,
                    }
                )
                    .then((res) => res.json())
                    .catch((err) => console.error(err));
                if (response.status === 403) {
                    alert('관리자만 이용가능합니다.');
                    location.href = '/';
                }
                if (response.success) return true;
                else return false;
            }
        }
        return false;
    };

    // 상품 정보 수정
    const clickedUpdateMenu = async () => {
        if (token) {
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/menu/${menuId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-AUTH-TOKEN': token,
                    },
                    body: JSON.stringify({
                        menuName: updatedData.menuName,
                        menuPrice: updatedData.menuPrice,
                        menuCategory: updatedData.menuCategory,
                        menuCalory: updatedData.menuCalory,
                        menuRecommend: updatedData.menuRecommend,
                    }),
                }
            )
                .then((res) => res.json())
                .catch((err) => console.error(err));
            if (response.status === 403) {
                alert('관리자만 이용가능합니다.');
                location.href = '/';
            }
            if (response.success) {
                alert('상품 정보가 수정되었습니다.');
                navigate(`/admin/menu/${updatedData.menuCategory}`);
            }
        }
    };

    // 수정 api
    const updateMenuItem = async () => {
        if (isImageChange) {
            if (await uploadFiles()) {
                clickedUpdateMenu();
            }
        } else {
            clickedUpdateMenu();
        }
    };

    useEffect(() => {
        getMenuData();
    }, []);

    return (
        <div className='h-full mt-8 flex flex-col items-center'>
            <h2 className='h-12 text-2xl font-semibold text-white'>
                상품정보 수정
            </h2>
            <table className='h-3/5 w-4/5 border-2 border-slate-700 rounded-md bg-slate-400'>
                <tbody>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            이름
                        </th>
                        <th className='w-2/3 pl-2 box-border'>
                            <input
                                type='text'
                                defaultValue={item?.menuName}
                                onChange={(e) =>
                                    setUpdatedData((data) => {
                                        return {
                                            ...data,
                                            menuName: e.target.value,
                                        };
                                    })
                                }
                                className='w-full h-3/4 text-base text-center font-normal border border-none rounded-lg bg-transparent focus:outline-none'
                            />
                        </th>
                    </tr>
                    <tr className='border h-28 border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            이미지
                        </th>
                        <th>
                            <div className='w-40 m-auto'>
                                <img
                                    src={imageFile}
                                    alt={item && item?.menuName}
                                />
                            </div>
                        </th>
                        <th>
                            <label
                                htmlFor='input-file'
                                className='px-5 bg-gray-600 border border-none rounded-md py-2 text-slate-200 font-medium hover:bg-gray-500 cursor-pointer'
                            >
                                변경
                            </label>
                            <input
                                id='input-file'
                                type='file'
                                onChange={handleFilesChange}
                                className='hidden'
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            가격
                        </th>
                        <th>
                            <input
                                type='number'
                                defaultValue={item?.menuPrice}
                                onChange={(e) =>
                                    setUpdatedData((data) => {
                                        return {
                                            ...data,
                                            menuPrice: e.target.valueAsNumber,
                                        };
                                    })
                                }
                                className='w-full h-3/4 text-center text-base font-normal border border-none rounded-lg bg-transparent focus:outline-none'
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            상품코드
                        </th>
                        <th>
                            <input
                                type='text'
                                defaultValue={item?.menuCode}
                                className='w-full h-3/4 text-center text-base font-normal border border-none rounded-lg bg-transparent'
                                disabled
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            칼로리
                        </th>
                        <th>
                            <input
                                type='number'
                                defaultValue={item?.menuCalory}
                                onChange={(e) =>
                                    setUpdatedData((data) => {
                                        return {
                                            ...data,
                                            menuCalory: e.target.valueAsNumber,
                                        };
                                    })
                                }
                                className='w-full h-3/4 text-center text-base font-normal border border-none rounded-lg bg-transparent focus:outline-none'
                            />
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            옵션
                        </th>
                        <th>
                            <select
                                onChange={(e) =>
                                    setUpdatedData((data) => {
                                        return {
                                            ...data,
                                            menuCategory: +e.target.value,
                                        };
                                    })
                                }
                                className='bg-transparent text-base font-medium w-36 focus:outline-none'
                                value={updatedData.menuCategory}
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.idx}
                                        value={category.idx}
                                        className='text-center'
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </th>
                    </tr>
                    <tr className='border border-slate-700'>
                        <th className='text-base border-r border-slate-700'>
                            추천
                        </th>
                        <th>
                            <input
                                type='checkbox'
                                checked={updatedData.menuRecommend}
                                className='w-5 h-5'
                                onChange={(e) =>
                                    setUpdatedData((data) => ({
                                        ...data,
                                        menuRecommend: e.target.checked,
                                    }))
                                }
                            />
                        </th>
                    </tr>
                    <tr>
                        <th className='text-base border-r border-slate-700'>
                            최종수정시간
                        </th>
                        <th className='text-base font-normal'>
                            {item
                                ? formatDate(new Date(item.menuUpdateDate))
                                : ''}
                        </th>
                    </tr>
                </tbody>
            </table>
            <div className='w-1/3 h-10 mt-5 flex justify-between'>
                <Button
                    bgColor='bg-blue-600'
                    text='수정하기'
                    textColor='white'
                    textSize='base'
                    classes='w-24 h-full font-semibold ml-1 hover:bg-blue-800'
                    onClick={updateMenuItem}
                />
                <Button
                    bgColor='bg-red-600'
                    text='취소'
                    textColor='white'
                    textSize='base'
                    classes='w-24 h-full font-semibold ml-1 hover:bg-red-800'
                    onClick={() => navigate(-1)}
                />
            </div>
        </div>
    );
}
export default AdminUpdateMenu;
