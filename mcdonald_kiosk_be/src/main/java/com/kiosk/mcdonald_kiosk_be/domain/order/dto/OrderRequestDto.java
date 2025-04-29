package com.kiosk.mcdonald_kiosk_be.domain.order.dto;

import com.kiosk.mcdonald_kiosk_be.domain.order.entity.Order;
import com.kiosk.mcdonald_kiosk_be.domain.order.enumeration.OrderStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
public class OrderRequestDto {
    private int totalCount;
    private int totalPrice;

    public Order toEntity(int orderNumber) {
        return Order.builder()
                .orderCode(UUID.randomUUID().toString())
                .orderPrice(totalPrice)
                .orderCount(totalCount)
                .orderNumber(orderNumber)
                .orderStatus(OrderStatus.결제완료)
                .orderTime(LocalDateTime.now())
                .isDeleted(false)
                .build();
    }
}
