package com.kiosk.ediya_kiosk_be.domain.admin.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MenuUpdateRequestDto {
    private String menuName;
    private int menuPrice;
    private Long menuCategory;
    private int menuCalory;
    private boolean menuRecommend;
}
