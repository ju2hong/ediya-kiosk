/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AdminItem } from '../AdminMenuList';
import Button from '../../../components/Button';

const categories = [
    {
        idx: 1,
        name: 'COFFEE',
    },
    {
        idx: 2,
        name: 'BEVERAGE',
    },
    {
        idx: 3,
        name: 'FLATCCINO',
    },
    {
        idx: 4,
        name: 'ICE CREAM',
    },
    {
        idx: 5,
        name: 'BREAD',
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
            <h2 className='text-2xl font-bold mb-5 text-center text-gray-600 mt-5'>
                상품정보 수정
            </h2>
            <table className='w-4/5 border-2 rounded-md bg-white mx-auto mt-5'>
                <tbody>
                    {/* 이름 */}
                    <tr className='border-b border-slate-300'>
                        <th className='text-left px-4 py-2 bg-slate-200 w-1/4'>
                            이름
                        </th>
                        <td className='px-4 py-2 w-3/4'>
                            <input
                                type='text'
                                defaultValue={item?.menuName}
                                onChange={(e) =>
                                    setUpdatedData((data) => ({
                                        ...data,
                                        menuName: e.target.value,
                                    }))
                                }
                                className='w-full px-2 py-1 text-center border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </td>
                    </tr>

                    {/* 이미지 */}
                    <tr className='border-b border-slate-300 h-32'>
                        <th className='text-left px-4 py-2 bg-slate-200'>
                            이미지
                        </th>
                        <td className='px-10 py-2 flex items-center gap-4'>
                            <div className='w-28 h-28 overflow-hidden flex-shrink-0'>
                                <img
                                    src={imageFile}
                                    alt={item?.menuName}
                                    className='object-contain w-full h-full'
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor='input-file'
                                    className='inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer'
                                >
                                    변경
                                </label>
                                <input
                                    id='input-file'
                                    type='file'
                                    onChange={handleFilesChange}
                                    className='hidden'
                                />
                            </div>
                        </td>
                    </tr>

                    {/* 가격 */}
                    <tr className='border-b border-slate-300'>
                        <th className='text-left px-4 py-2 bg-slate-200'>
                            가격
                        </th>
                        <td className='px-4 py-2'>
                            <input
                                type='number'
                                defaultValue={item?.menuPrice}
                                onChange={(e) =>
                                    setUpdatedData((data) => ({
                                        ...data,
                                        menuPrice: e.target.valueAsNumber,
                                    }))
                                }
                                className='w-full px-2 py-1 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </td>
                    </tr>

                    {/* 상품코드 */}
                    <tr className='border-b border-slate-300'>
                        <th className='text-left px-4 py-2 bg-slate-200'>
                            상품코드
                        </th>
                        <td className='px-4 py-2'>
                            <input
                                type='text'
                                defaultValue={item?.menuCode}
                                className='w-full px-2 py-1 border rounded-md bg-gray-100 text-gray-600'
                                disabled
                            />
                        </td>
                    </tr>

                    {/* 칼로리 */}
                    <tr className='border-b border-slate-300'>
                        <th className='text-left px-4 py-2 bg-slate-200'>
                            칼로리
                        </th>
                        <td className='px-4 py-2 '>
                            <input
                                type='number'
                                defaultValue={item?.menuCalory}
                                onChange={(e) =>
                                    setUpdatedData((data) => ({
                                        ...data,
                                        menuCalory: e.target.valueAsNumber,
                                    }))
                                }
                                className='w-full px-2 py-1 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-400'
                            />
                        </td>
                    </tr>

                    {/* 옵션 */}
                    <tr className='border-b border-slate-300'>
                        <th className='text-left px-4 py-2 bg-slate-200'>
                            옵션
                        </th>
                        <td className='px-4 py-2'>
                            <select
                                onChange={(e) =>
                                    setUpdatedData((data) => ({
                                        ...data,
                                        menuCategory: +e.target.value,
                                    }))
                                }
                                value={updatedData.menuCategory}
                                className='w-full px-2 py-1 text-right border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400'
                            >
                                {categories.map((category) => (
                                    <option
                                        key={category.idx}
                                        value={category.idx}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>

                    {/* 추천 */}
                    <tr className='border-b border-slate-300'>
                        <th className='text-left px-4 py-2 bg-slate-200'>
                            추천
                        </th>
                        <td className='px-4 py-2 text-center'>
                            <input
                                type='checkbox'
                                checked={updatedData.menuRecommend}
                                onChange={(e) =>
                                    setUpdatedData((data) => ({
                                        ...data,
                                        menuRecommend: e.target.checked,
                                    }))
                                }
                                className='w-5 h-5'
                            />
                        </td>
                    </tr>

                    {/* 최종수정시간 */}
                    <tr>
                        <th className='text-left px-2 py-2 bg-slate-200'>
                            최종수정시간
                        </th>
                        <td className='px-4 py-3 text-center text-gray-600'>
                            {item
                                ? formatDate(new Date(item.menuUpdateDate))
                                : ''}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* 버튼 영역 */}
            <div className='w-1/2 mx-auto mt-6 flex justify-center'>
                <Button
                    bgColor='bg-[#12225c]'
                    text='수정하기'
                    textColor='white'
                    textSize='base'
                    classes='w-24 h-10 font-semibold hover:bg-[#59648C] hover:bg-gray-300 rounded mr-5'
                    onClick={updateMenuItem}
                />
                <Button
                    bgColor='bg-gray-400'
                    text='취소'
                    textColor='white'
                    textSize='base'
                    classes='w-24 h-10 font-semibold hover:bg-gray-300 rounded'
                    onClick={() => navigate(-1)}
                />
            </div>
        </div>
    );
}
export default AdminUpdateMenu;
