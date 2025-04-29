package com.kiosk.mcdonald_kiosk_be.domain.order.entity;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.OrderEditRequestDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.dto.OrderResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.enumeration.OrderStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "order_menu")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderIdx;
    @Column(nullable = false)
    private String orderCode;
    @Column(nullable = false)
    private int orderPrice;
    @Column(nullable = false)
    private int orderCount;
    @Column(nullable = false)
    private int orderNumber;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    @Column(nullable = false)
    private LocalDateTime orderTime;
    @Column
    private LocalDateTime orderUpdateDate;
    @Column(nullable = false)
    private boolean isDeleted;

    public static OrderResponseDto toDto(Order order, int userPoint) {
        return OrderResponseDto.builder()
                .userPoint(userPoint)
                .orderCode(order.orderCode)
                .orderPrice(order.orderPrice)
                .orderCount(order.orderCount)
                .orderNumber(order.orderNumber)
                .orderPrice(order.orderPrice)
                .build();
    }

    public void editOrder(Long idx, OrderEditRequestDto req) {
        this.orderIdx=idx;
        this.orderCount=req.getOrderCount();
        this.orderPrice=req.getOrderPrice();
    }

    public void deleteOrder(Long idx) {
        this.orderIdx = idx;
        this.isDeleted = true;
    }
}
