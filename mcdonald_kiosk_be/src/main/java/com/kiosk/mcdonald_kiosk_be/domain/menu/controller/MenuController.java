package com.kiosk.mcdonald_kiosk_be.domain.menu.controller;

import com.kiosk.mcdonald_kiosk_be.domain.menu.dto.CategoryMenuResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.menu.service.MenuService;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuController {
    private final MenuService menuService;

    @GetMapping("/recommend")
    public ResponseDto<Page<CategoryMenuResponseDto>> getRecommendMenu(@RequestParam(value = "page", defaultValue = "0") int page) {
        Page<CategoryMenuResponseDto> menuList = menuService.getRecommendMenu(page);
        return ResponseDto.success(menuList);
    }

    @GetMapping("menu")
    public ResponseDto<Page<CategoryMenuResponseDto>> getMenu(@RequestParam Long categoryId,
                                                    @RequestParam(value = "page", defaultValue = "0") int page) {
        Page<CategoryMenuResponseDto> menuList = menuService.getMenus(categoryId, page);
        return ResponseDto.success(menuList);
    }
}
