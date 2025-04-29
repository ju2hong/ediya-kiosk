package com.kiosk.mcdonald_kiosk_be.domain.admin.service;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.CategoryResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.MenuResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Category;
import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Image;
import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Menu;
import com.kiosk.mcdonald_kiosk_be.domain.menu.repository.CategoryRepository;
import com.kiosk.mcdonald_kiosk_be.domain.menu.repository.ImageRepository;
import com.kiosk.mcdonald_kiosk_be.domain.menu.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminMenuService {
    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;
    private final ImageRepository imageRepository;

    @Transactional(readOnly = true)
    public List<CategoryResponseDto> findAllCategory() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(CategoryResponseDto::new).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<MenuResponseDto> findByCategoryMenus(Long categoryIdx, int page) {
        Pageable pageable = PageRequest.of(page, 5, Sort.by(Sort.Order.desc("menuCreateDate")));

        Page<Menu> menuEntity = menuRepository.findByCategoryIdxAndIsDeleted(categoryIdx,pageable);

        return menuEntity.map((menu) -> new MenuResponseDto(menu,
                imageRepository.findById(menu.getMenuIdx())
                        .orElseThrow(() -> new IllegalArgumentException("이미지가 존재하지 않습니다.")).getImgUrl(),
                categoryRepository.findById(menu.getCategoryIdx())
                        .orElseThrow(() -> new IllegalArgumentException("카테고리가 존재하지 않습니다.")).getCategoryTitle()
        ));
    }

    @Transactional(readOnly = true)
    public MenuResponseDto findByMenuIdx(Long menuIdx) {
        Menu menu = menuRepository.findById(menuIdx)
                .orElseThrow(() -> new IllegalArgumentException("상품이 존재하지 않습니다."));
        return new MenuResponseDto(menu,
                imageRepository.findById(menu.getImgIdx())
                        .orElseThrow(() -> new IllegalArgumentException("이미지가 존재하지 않습니다.")).getImgUrl(),
                categoryRepository.findById(menu.getCategoryIdx())
                        .orElseThrow(() -> new IllegalArgumentException("카테고리가 존재하지 않습니다.")).getCategoryTitle());
    }

    @Transactional(readOnly = true)
    public String findByImage(final Long imageIdx) {
        Image image = imageRepository.findById(imageIdx)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이미지 입니다."));
        return image.getImgUrl();
    }

}
