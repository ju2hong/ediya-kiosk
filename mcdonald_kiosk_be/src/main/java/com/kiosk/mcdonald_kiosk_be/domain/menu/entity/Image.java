package com.kiosk.mcdonald_kiosk_be.domain.menu.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imgIdx;
    @Column(nullable = false)
    private String imgName;
    @Column(nullable = false)
    private String imgUrl;
}
