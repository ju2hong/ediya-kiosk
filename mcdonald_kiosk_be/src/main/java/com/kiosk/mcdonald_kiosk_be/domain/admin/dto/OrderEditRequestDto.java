package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class OrderEditRequestDto {
    private int orderPrice;
    private int orderCount;
}
