import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface OrderResponse {
    idx: number;
    orderCode: string;
    orderPrice: number;
    orderCount: number;
    orderNumber: number;
    userPoint: number;
}

interface OrderContextType {
    data: OrderResponse | null;
    setData: React.Dispatch<React.SetStateAction<OrderResponse | null>>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: PropsWithChildren) => {
    const [data, setData] = useState<OrderResponse | null>(null);

    return (
        <OrderContext.Provider value={{ data, setData }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => useContext(OrderContext);
