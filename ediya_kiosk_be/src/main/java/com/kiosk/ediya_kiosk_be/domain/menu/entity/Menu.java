package com.kiosk.ediya_kiosk_be.domain.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuIdx;
    @Column(nullable = false)
    private Long categoryIdx;
    @Column(nullable = false)
    private Long imgIdx;
    @Column(nullable = false)
    private String menuName;
    @Column(nullable = false)
    private int menuPrice;
    @Column(nullable = false)
    private int menuCalory;
    @Column(nullable = false)
    private String menuCode;
    @Column(nullable = false)
    private boolean menuRecommend;
    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime menuCreateDate;
    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime menuUpdateDate;
    @Column(nullable = false)
    private boolean isDeleted;

    public void update(String menuName, Long categoryIdx, int menuPrice, int menuCalory, boolean menuRecommend) {
        this.menuName = menuName;
        this.categoryIdx = categoryIdx;
        this.menuPrice = menuPrice;
        this.menuCalory = menuCalory;
        this.menuRecommend = menuRecommend;
        this.menuUpdateDate = LocalDateTime.now();
    }
}
