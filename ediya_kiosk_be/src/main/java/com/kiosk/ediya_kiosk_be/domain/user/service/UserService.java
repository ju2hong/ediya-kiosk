package com.kiosk.ediya_kiosk_be.domain.user.service;


import com.kiosk.ediya_kiosk_be.domain.user.dto.JoinRequestDto;
import com.kiosk.ediya_kiosk_be.domain.user.entity.User;
import com.kiosk.ediya_kiosk_be.domain.user.enumeration.UserRole;
import com.kiosk.ediya_kiosk_be.domain.user.repository.UserRepository;
import com.kiosk.ediya_kiosk_be.global.common.ResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //회원가입
    @Transactional
    public ResponseDto<Void> join(JoinRequestDto request) {
        Optional<User> existingUser = userRepository.findByUserId(request.getUserId());

        if(existingUser.isPresent()) {
            return ResponseDto.fail("ERROR_ENCODE","중복된 아이디가 존재합니다.");
        }
        
        User user = User.builder()
                .userId(request.getUserId())
                .userPw(request.getUserPw())
                .userName(request.getUserName())
                .userRole(UserRole.ROLE_USER)
                .userPoint(0)
                .userCreateDate(LocalDateTime.now())
                .userUpdateDate(null)
                .isDeleted(false)
                .build();

        try {
            userRepository.save(user);
            return ResponseDto.successWithNoData();
        } catch (Exception e) {
            return ResponseDto.fail("ERROR_CODE","회원가입 실패 : " + e.getMessage());
        }
    }

    //로그인
    public User findByUserIdAndPassword(String userId, String password) {
        Optional<User> optionalUser = userRepository.findByUserId(userId);
        User user = optionalUser.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));

        if(!passwordEncoder.matches(password,user.getUserPw())) {
            throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
        }
        return optionalUser.get();
    }

}
