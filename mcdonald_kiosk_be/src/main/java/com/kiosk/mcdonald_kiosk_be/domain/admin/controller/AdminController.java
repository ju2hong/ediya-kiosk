package com.kiosk.mcdonald_kiosk_be.domain.admin.controller;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.OrderListResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.service.AdminOrderService;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminOrderService adminOrderService;

    @GetMapping("/order")
    public ResponseDto<Page<OrderListResponseDto>> getOrderList(@RequestParam(value = "page",defaultValue = "0") int page) {
        return ResponseDto.success(adminOrderService.getOrderList(page));
    }
}
