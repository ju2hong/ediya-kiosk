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

    return `${year}-${month}-${day}`;
};

export const UserList: FC<UserListProps> = ({
    idx,
    user,
    onDelete,
    onEdit,
}) => {
    return (
        <tr>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {idx}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {user.userId}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {user.userName}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {user.userRole}
            </td>
            <td className='px-4 text-center whitespace-nowrap text-sm text-gray-700'>
                {user ? formatDate(new Date(user.userCreateDate)) : ''}
            </td>
            <td className='px-5 py-3 whitespace-nowrap text-sm'>
                <button
                    onClick={() => onEdit(user.idx)}
                    className='px-4 py-2 text-sm text-white bg-[#12225c] hover:bg-[#59648C] rounded'
                >
                    수정
                </button>
            </td>
            <td className='px-4 py-3 whitespace-nowrap text-sm'>
                <button
                    onClick={() => {
                        if (confirm('회원 목록을 삭제하시겠습니까?')) {
                            onDelete(user.idx);
                        }
                    }}
                    className='px-4 py-2 text-sm text-white bg-gray-400 hover:bg-gray-300 rounded'
                >
                    삭제
                </button>
            </td>
        </tr>
    );
};
