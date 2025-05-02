import { useNavigate, useParams } from 'react-router-dom';
import { UserProps } from '../AdminUser';
import { useEffect, useState } from 'react';

//날짜 포맷팅
const formatDate = (date: Date): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const AdminUserUpdate = () => {
    const navigate = useNavigate();
    const { userIdx } = useParams();

    const [editedUser, setEditedUser] = useState<UserProps>({
        idx: 0,
        userId: '',
        userPw: '',
        userName: '',
        userRole: '',
        userPoint: 0,
        userCreateDate: new Date(),
    });

    const handleUserEdit = async () => {
        const token = sessionStorage.getItem('token');
        await fetch(`http://localhost:8080/api/v1/admin/user/${userIdx}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': token || '',
            },
            body: JSON.stringify({
                userId: editedUser.userId,
                userPw: editedUser.userPw,
                userName: editedUser.userName,
                userRole: editedUser.userRole,
                userPoint: editedUser.userPoint,
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.status === 403) {
                    alert('관리자만 이용가능합니다.');
                    location.href = '/';
                }
                if (res.success) {
                    navigate('/admin/user');
                }
            });
    };

    const getUser = async () => {
        const token = sessionStorage.getItem('token');
        await fetch(`http://localhost:8080/api/v1/admin/user/${userIdx}`, {
            headers: {
                'X-AUTH-TOKEN': token || '',
            },
        })
            .then((response) => response.json())

            .then((res) => {
                console.log('dd>', res.data);
                if (res.status === 403) {
                    alert('관리자만 이용가능합니다.');
                    location.href = '/';
                }
                if (res.success) {
                    const userData = res.data;
                    userData.userCreateDate = new Date(userData.userCreateDate);
                    setEditedUser(userData);
                }
            });
    };

    console.log(editedUser);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className='flex flex-col items-center mt-8 w-full max-w-md mx-auto'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-600'>
                회원정보 수정
            </h2>
            <div className='w-full bg-gray-200 rounded-lg p-4'>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>아이디</label>
                    <input
                        type='text'
                        value={editedUser.userId}
                        onChange={(e) =>
                            setEditedUser((prevUser) => ({
                                ...prevUser,
                                userId: e.target.value,
                            }))
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>암호</label>
                    <input
                        type='text'
                        value={editedUser.userPw}
                        onChange={(e) =>
                            setEditedUser((prevUser) => ({
                                ...prevUser,
                                userPw: e.target.value,
                            }))
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>이름</label>
                    <input
                        type='text'
                        value={editedUser.userName}
                        onChange={(e) =>
                            setEditedUser((prevUser) => ({
                                ...prevUser,
                                userName: e.target.value,
                            }))
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>권한</label>
                    <select
                        value={editedUser.userRole}
                        onChange={(e) =>
                            setEditedUser({
                                ...editedUser,
                                userRole: e.target.value,
                            })
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    >
                        <option value='ROLE_USER'>ROLE_USER</option>
                        <option value='ROLE_ADMIN'>ROLE_ADMIN</option>
                    </select>
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>가입일</label>
                    <input
                        type='text'
                        value={
                            editedUser.userCreateDate instanceof Date
                                ? formatDate(editedUser.userCreateDate)
                                : ''
                        }
                        className='w-full border border-gray-300 rounded p-2'
                        readOnly
                    />
                </div>
                <div className='mb-2'>
                    <label className='block font-bold mb-1'>적립금</label>
                    <input
                        type='number'
                        value={editedUser.userPoint}
                        onChange={(e) =>
                            setEditedUser((prevUser) => ({
                                ...prevUser,
                                userPoint: parseInt(e.target.value),
                            }))
                        }
                        className='w-full border border-gray-300 rounded p-2'
                    />
                </div>
                <div className='flex justify-center'>
                    <button
                        className=' w-1/4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400 mr-4'
                        onClick={handleUserEdit}
                    >
                        수정
                    </button>
                    <button
                        className='w-1/4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-400'
                        onClick={() => navigate(-1)}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};
