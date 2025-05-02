package com.kiosk.ediya_kiosk_be.domain.menu.dto;

import com.kiosk.ediya_kiosk_be.domain.menu.entity.Menu;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryMenuResponseDto {
    private Long menuIdx;
    private String menuName;
    private String imgSrc;
    private int menuPrice;
    private int menuCalory;

    public CategoryMenuResponseDto(Menu menu, String imageUrl) {
        this.menuIdx = menu.getMenuIdx();
        this.menuName = menu.getMenuName();
        this.imgSrc = imageUrl;
        this.menuPrice = menu.getMenuPrice();
        this.menuCalory = menu.getMenuCalory();
    }
}
