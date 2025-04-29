package com.kiosk.mcdonald_kiosk_be.domain.admin.controller;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.CategoryResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.MenuResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.service.AdminMenuService;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminMenuController {
    private final AdminMenuService adminMenuService;

    @GetMapping("/categories")
    public ResponseDto<List<CategoryResponseDto>> categoryList() {
        List<CategoryResponseDto> categoryList = adminMenuService.findAllCategory();

        return ResponseDto.success(categoryList);
    }
    @GetMapping("/menu")
    public ResponseDto<Page<MenuResponseDto>> category_menu(@RequestParam Long categoryId,
                                                            @RequestParam(value = "page",defaultValue = "0") int page) {
        Page<MenuResponseDto> menuList = adminMenuService.findByCategoryMenus(categoryId,page);
        return ResponseDto.success(menuList);
    }
    @GetMapping("/menu/{menuIdx}")
    public ResponseDto<MenuResponseDto> menuInfo(@PathVariable Long menuIdx) {
        MenuResponseDto menu;
        try{
            menu = adminMenuService.findByMenuIdx(menuIdx);
        } catch (IllegalArgumentException e) {
            return ResponseDto.fail("500",e.getMessage());
        }
        return ResponseDto.success(menu);
    }
}
