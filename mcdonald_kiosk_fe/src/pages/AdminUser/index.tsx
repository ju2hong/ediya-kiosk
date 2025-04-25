import { useEffect, useState } from 'react';
import { UserList } from './component/AdminUserList';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination';

export interface UserProps {
    idx: number;
    userId: string;
    userPw: string;
    userName: string;
    userRole: string;
    userPoint: number;
    userCreateDate: Date;
}

const AdminUser = () => {
    const [totalPage, setTotalPages] = useState<number>(1);
    const [totalElements, setTotalElements] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(0);

    const [users, setUsers] = useState<UserProps[]>([]);

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getUserList = async () => {
        if (token) {
            await fetch(
                `http://localhost:8080/api/v1/admin/user?page=${currentPage}`,
                {
                    method: 'GET',
                    headers: {
                        'X-AUTH-TOKEN': token,
                    },
                }
            )
                .then((res) => {
                    return res.json();
                })
                .then((response) => {
                    if (response.status === 403) {
                        alert('관리자만 이용가능합니다.');
                        location.href = '/';
                    }
                    console.log(response.data);
                    setUsers(response.data.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements);
                    setPageNumber(response.data.pageable.pageNumber);
                    setPageSize(response.data.pageable.pageSize);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleUserDelete = async (userIdx: number) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await fetch(
                `http://localhost:8080/api/v1/admin/user/${userIdx}`,
                {
                    method: 'DELETE',
                    headers: {
                        'X-AUTH-TOKEN': token || '',
                    },
                }
            );
            if (response.status === 403) {
                alert('관리자만 이용가능합니다.');
                location.href = '/';
            }
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            getUserList();
            alert('삭제되었습니다.');
        } catch (error) {
            console.error(error);
        }
    };

    const handleUserEdit = (userIdx: number) => {
        navigate(`/admin/user/${userIdx}`);
    };

    useEffect(() => {
        getUserList();
    }, [currentPage]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-3xl font-bold text-white mt-5'>회원 목록</h2>
            <div className='w-full p-2 mt-2'>
                <p className='text-base text-gray-300'>
                    총 {totalElements}명의 회원이 있습니다.
                </p>
                <table className='w-full mt-3 text-base text-left text-gray-500'>
                    <thead className='text-base text-gray-700 bg-slate-300'>
                        <tr>
                            <th className='px-2 py-2'>번호</th>
                            <th className='px-2 py-2'>아이디</th>
                            <th className='px-2 py-2'>이름</th>
                            <th className='px-2 py-2'>권한</th>
                            <th className='px-2 py-2'>가입일</th>
                            <th className='px-2 py-2'>수정</th>
                            <th className='px-2 py-2'>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <UserList
                                key={user.idx}
                                idx={pageNumber * pageSize + 1 + idx}
                                user={user}
                                onDelete={handleUserDelete}
                                onEdit={handleUserEdit}
                            />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AdminUser;
