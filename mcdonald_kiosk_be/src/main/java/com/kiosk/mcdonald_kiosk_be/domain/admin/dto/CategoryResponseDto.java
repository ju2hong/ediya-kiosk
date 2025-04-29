package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter @Getter
@NoArgsConstructor
public class CategoryResponseDto {

    private Long categoryIdx;
    private String categoryTitle;

    public CategoryResponseDto(Category category) {
        this.categoryIdx = category.getCategoryIdx();
        this.categoryTitle = category.getCategoryTitle();
    }
}
