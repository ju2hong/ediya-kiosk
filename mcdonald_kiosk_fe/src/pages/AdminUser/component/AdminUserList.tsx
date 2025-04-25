import { FC } from 'react';
import { UserProps } from '..';

interface UserListProps {
    idx: number;
    user: UserProps;
    onDelete: (userIdx: number) => void;
    onEdit: (userIdx: number) => void;
}

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

export const UserList: FC<UserListProps> = ({
    idx,
    user,
    onDelete,
    onEdit,
}) => {
    return (
        <tr className='bg-gray-200 dark:bg-gray-300'>
            <td className='px-2 py-1'>{idx}</td>
            <td className='px-2 py-1 font-medium text-gray-900 text-ellipsis'>
                {user.userId}
            </td>
            <td className='px-2 py-1'>{user.userName}</td>
            <td className='px-2 py-1'>{user.userRole}</td>
            <td className='text-base font-normal'>
                {user ? formatDate(new Date(user.userCreateDate)) : ''}
            </td>
            <td className='pr-1.5'>
                <button
                    className='px-3 py-2 text-sm text-white bg-blue-500 border border-none rounded-lg w-14 hover:bg-blue-700'
                    onClick={() => onEdit(user.idx)}
                >
                    수정
                </button>
            </td>
            <td className='pl-1.5'>
                <button
                    onClick={() => {
                        if (confirm('회원 목록을 삭제하시겠습니까?')) {
                            onDelete(user.idx);
                        }
                    }}
                    className='px-3 py-2 text-sm text-white bg-red-600 border border-none rounded-lg w-14 hover:bg-red-700'
                >
                    삭제
                </button>
            </td>
        </tr>
    );
};
