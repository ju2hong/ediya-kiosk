package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import com.kiosk.mcdonald_kiosk_be.domain.order.entity.Order;
import com.kiosk.mcdonald_kiosk_be.domain.order.enumeration.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
public class OrderListResponseDto {

    private int idx;
    private String orderCode;
    private int orderPrice;
    private int orderCount;
    private int orderNumber;
    private OrderStatus orderStatus;
    private LocalDateTime orderTime;

    public static  OrderListResponseDto toDto(Order order) {
        return OrderListResponseDto.builder()
                .idx(order.getOrderIdx().intValue())
                .orderCode(order.getOrderCode())
                .orderPrice(order.getOrderPrice())
                .orderCount(order.getOrderCount())
                .orderNumber(order.getOrderNumber())
                .orderStatus(order.getOrderStatus())
                .orderTime(order.getOrderTime())
                .build();
    }
}
