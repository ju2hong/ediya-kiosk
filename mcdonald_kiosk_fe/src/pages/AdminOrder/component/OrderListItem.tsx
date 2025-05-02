import { FC } from 'react';
import { OrderItemProps } from '..';
import { format } from 'date-fns';

interface OrderListItemProps {
    order: OrderItemProps;
    idx: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export const OrderListItem: FC<OrderListItemProps> = ({
    order,
    idx,
    onEdit,
    onDelete,
}) => {
    return (
        <tr className='bg-gray-100'>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {idx}
            </td>
            <td className='text-center text-sm text-gray-700 px-2 py-4 whitespace-normal break-words'>
                {order.orderCode}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {order.orderPrice}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {order.orderNumber}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {order.orderStatus}
            </td>
            <td className='text-center whitespace-nowrap text-sm text-gray-700'>
                {format(order.orderTime, 'yyyy-MM-dd')}
            </td>
            <td className='px-2 py-3 whitespace-nowrap text-sm'>
                <button
                    onClick={() => onEdit(order.idx)}
                    className='px-4 py-2 text-sm text-white bg-gray-400 hover:bg-gray-300 rounded'
                >
                    수정
                </button>
            </td>
            <td className='px-2 py-3 whitespace-nowrap text-sm'>
                <button
                    onClick={() => {
                        if (confirm('주문 목록을 삭제하시겠습니까?')) {
                            onDelete(order.idx);
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
