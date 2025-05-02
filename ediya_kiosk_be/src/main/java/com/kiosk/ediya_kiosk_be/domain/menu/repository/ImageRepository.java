package com.kiosk.ediya_kiosk_be.domain.menu.repository;

import com.kiosk.ediya_kiosk_be.domain.menu.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
