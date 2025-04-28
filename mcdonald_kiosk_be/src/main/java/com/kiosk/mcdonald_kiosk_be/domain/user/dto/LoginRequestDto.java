package com.kiosk.mcdonald_kiosk_be.domain.user.dto;

import com.kiosk.mcdonald_kiosk_be.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class LoginRequestDto {
    private String userId;
    private String userPw;

    public User toSaveEntity() {
        return User.builder()
                .userId(userId)
                .userPw(userPw)
                .build();
    }
}
