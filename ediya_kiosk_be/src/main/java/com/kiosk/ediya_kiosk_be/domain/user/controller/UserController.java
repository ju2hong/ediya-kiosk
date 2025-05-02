package com.kiosk.ediya_kiosk_be.domain.user.controller;

import com.kiosk.ediya_kiosk_be.domain.user.dto.JoinRequestDto;
import com.kiosk.ediya_kiosk_be.domain.user.dto.LoginRequestDto;
import com.kiosk.ediya_kiosk_be.domain.user.dto.UserDataDto;
import com.kiosk.ediya_kiosk_be.domain.user.entity.User;
import com.kiosk.ediya_kiosk_be.domain.user.service.UserService;
import com.kiosk.ediya_kiosk_be.global.common.ResponseDto;
import com.kiosk.ediya_kiosk_be.global.config.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtTokenProvider;

    @PostMapping("/join")
    public ResponseDto<Void> join(@Valid @RequestBody JoinRequestDto dto) {
        String encodedPassword = passwordEncoder.encode(dto.getUserPw());
        dto.setUserPw(encodedPassword);

        return userService.join(dto);
    }

    @PostMapping("/login")
    public ResponseDto<Object> login(@RequestBody LoginRequestDto request) {

        User user;
        try {
            user = userService.findByUserIdAndPassword(request.getUserId(),
                    request.getUserPw());
        } catch(UsernameNotFoundException | BadCredentialsException ex) {
            return ResponseDto.fail("ERROR_CODE",ex.getMessage());
        }
        String token = jwtTokenProvider.createToken(user.getUserId(),user.getUserRole());

        UserDataDto userDataDto = new UserDataDto(token, user.getUserName());

        return ResponseDto.success(userDataDto);
    }

}
