package com.kiosk.mcdonald_kiosk_be.domain.user.dto;

import com.kiosk.mcdonald_kiosk_be.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class JoinRequestDto {
    private String userId;
    private String userPw;
    private String userName;

    public User toSaveEntity() {
        return User.builder()
                .userId(userId)
                .userPw(userPw)
                .userName(userName)
                .build();
    }
}
