package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import com.kiosk.mcdonald_kiosk_be.domain.user.entity.User;
import com.kiosk.mcdonald_kiosk_be.domain.user.enumeration.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
@Builder
public class UserResponseDto {
    private int idx;
    private String userId;
    private String userPw;
    private String userName;
    private UserRole userRole;
    private int userPoint;
    private LocalDateTime userCreateDate;

    public static UserResponseDto fromEntity(User user) {
        return UserResponseDto.builder()
                .idx(user.getUserIdx().intValue())
                .userId(user.getUserId())
                .userPw(user.getUserPw())
                .userName(user.getUserName())
                .userRole(user.getUserRole())
                .userPoint(user.getUserPoint())
                .userCreateDate(user.getUserCreateDate())
                .build();
    }
}
