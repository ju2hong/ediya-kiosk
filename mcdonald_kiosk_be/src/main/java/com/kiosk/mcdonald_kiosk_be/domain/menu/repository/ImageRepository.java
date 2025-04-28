package com.kiosk.mcdonald_kiosk_be.domain.menu.repository;

import com.kiosk.mcdonald_kiosk_be.domain.menu.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
