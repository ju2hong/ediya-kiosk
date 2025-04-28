package com.kiosk.mcdonald_kiosk_be.domain.menu.repository;

import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    @Query(value = "SELECT m FROM Menu m WHERE m.menuRecommend = TRUE And m.isDeleted = FALSE")
    Page<Menu> findByMenuRecommend(Pageable pageable);

    @Query(value = "SELECT m FROM Menu m WHERE m.categoryIdx = :category_idx And m.isDeleted = FALSE")
    Page<Menu> findByCategoryIdxAndIsDeleted(Long category_idx, Pageable pageable);

    @Modifying
    @Query(value = "UPDATE Menu m SET m.isDeleted = TRUE WHERE m.menuIdx = :menuIdx")
    void deleteById(Long menuIdx);
}
