package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Menu;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
public class MenuResponseDto {
    private Long menuIdx;
    private Long imgIdx;
    private String imgSrc;
    private String menuName;
    private int menuPrice;
    private String menuOption;
    private int menuCalory;
    private String menuCode;
    private boolean menuRecommend;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime menuUpdateDate;

    public MenuResponseDto(Menu menu,String imgSrc, String categoryTitle) {
        this.menuIdx = menu.getMenuIdx();
        this.imgIdx = menu.getImgIdx();
        this.imgSrc = imgSrc;
        this.menuName = menu.getMenuName();
        this.menuPrice = menu.getMenuPrice();
        this.menuOption = categoryTitle;
        this.menuCalory = menu.getMenuCalory();
        this.menuCode = menu.getMenuCode();
        this.menuRecommend = menu.isMenuRecommend();
        this.menuUpdateDate = menu.getMenuUpdateDate() == null ? menu.getMenuCreateDate() : menu.getMenuUpdateDate();
    }

}
