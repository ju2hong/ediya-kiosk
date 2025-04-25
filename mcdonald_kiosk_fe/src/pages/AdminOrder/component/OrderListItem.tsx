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
        <tr key={order.idx} className='bg-gray-200 dark:bg-gray-300'>
            <td className='px-2 py-1'>{idx}</td>

            <td className='px-2 py-1 font-medium text-gray-900 text-ellipsis'>
                {order.orderCode}
            </td>
            <td className='px-2 py-1'>{order.orderPrice}</td>
            <td className='px-2 py-1'>{order.orderNumber}</td>
            <td className='px-2 py-1'>{order.orderStatus}</td>
            <td className='px-2 py-1'>
                {format(order.orderTime, 'yyyy-MM-dd')}
            </td>
            <td className='pr-1.5'>
                <button
                    className='px-3 py-2 text-sm text-white bg-blue-500 border border-none rounded-lg w-14 hover:bg-blue-700'
                    onClick={() => onEdit(order.idx)}
                >
                    수정
                </button>
            </td>
            <td className='pl-1.5'>
                <button
                    onClick={() => {
                        if (confirm('주문 목록을 삭제하시겠습니까?')) {
                            onDelete(order.idx);
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
