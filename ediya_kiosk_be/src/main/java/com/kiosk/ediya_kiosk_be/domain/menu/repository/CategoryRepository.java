package com.kiosk.ediya_kiosk_be.domain.menu.repository;

import com.kiosk.ediya_kiosk_be.domain.menu.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
