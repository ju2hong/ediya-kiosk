package com.kiosk.mcdonald_kiosk_be.domain.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileDto {
    private String uuid;
    private String fileName;
    private String contentType;
}
