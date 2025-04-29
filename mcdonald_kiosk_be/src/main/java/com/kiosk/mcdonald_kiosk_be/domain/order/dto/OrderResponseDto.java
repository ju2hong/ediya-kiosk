package com.kiosk.mcdonald_kiosk_be.domain.order.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class OrderResponseDto {
    private int idx;
    private String orderCode;
    private int orderPrice;
    private int orderCount;
    private int orderNumber;
    private int userPoint;
}
