package com.kiosk.mcdonald_kiosk_be.domain.admin.controller;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.UserEditRequestDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.UserResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.service.AdminUserService;
import com.kiosk.mcdonald_kiosk_be.domain.user.entity.User;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;

    @GetMapping("/user")
    public ResponseDto<Page<UserResponseDto>> getUserList(@RequestParam(value = "page",defaultValue = "0") int page) {
        return ResponseDto.success(adminUserService.getUserList(page));
    }

    @PatchMapping("/user/{id}")
    public ResponseDto<User> editUser(@PathVariable("id") Long id, @RequestBody UserEditRequestDto userEditRequestDto) {
        return adminUserService.editUser(id,userEditRequestDto);
    }

    @GetMapping("/user/{id}")
    public ResponseDto<UserResponseDto> getOrderDetail(@PathVariable("id") Long userIdx) {
        return adminUserService.orderDetail(userIdx);
    }

    @DeleteMapping("/user/{id}")
    public ResponseDto<Void> deleteOrder(@PathVariable("id") Long userIdx) {
        return adminUserService.deleteOrder(userIdx);
    }

}
