package com.kiosk.mcdonald_kiosk_be.domain.order.controller;

import com.kiosk.mcdonald_kiosk_be.domain.order.dto.OrderRequestDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.dto.OrderResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.service.OrderService;
import com.kiosk.mcdonald_kiosk_be.domain.user.entity.PrincipalDetails;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/order")
    public ResponseDto<OrderResponseDto> order(@RequestBody OrderRequestDto orderRequestDto,
                                               @AuthenticationPrincipal PrincipalDetails user) {
        return orderService.order(orderRequestDto, user);
    }
}
