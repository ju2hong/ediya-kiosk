package com.kiosk.mcdonald_kiosk_be.domain.user.enumeration;

import lombok.Getter;

@Getter
public enum UserRole {

    ROLE_USER("User"),
    ROLE_ADMIN("ADMIN");

    private final String value;

    UserRole(String value) {
        this.value = value;
    }
}
