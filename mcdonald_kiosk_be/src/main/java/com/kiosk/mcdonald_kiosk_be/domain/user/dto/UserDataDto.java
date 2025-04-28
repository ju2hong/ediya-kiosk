package com.kiosk.mcdonald_kiosk_be.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDataDto {
    private String accessToken;
    private String userName;
}
