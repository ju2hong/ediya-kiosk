package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import com.kiosk.mcdonald_kiosk_be.domain.user.enumeration.UserRole;
import lombok.Getter;
import lombok.Setter;

@Setter @Getter
public class UserEditRequestDto {
    private String userId;
    private String userPw;
    private String userName;
    private UserRole userRole;
    private int userPoint;
}
