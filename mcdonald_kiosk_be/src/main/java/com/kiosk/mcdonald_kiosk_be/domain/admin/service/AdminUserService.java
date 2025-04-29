package com.kiosk.mcdonald_kiosk_be.domain.admin.service;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.UserResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminUserService {
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<UserResponseDto> getUserList(int page) {
        Pageable paging = PageRequest.of(page, 5, Sort.by(Sort.Order.desc("userCreateDate")));
        return userRepository.findAllUserList(paging).map(UserResponseDto::fromEntity);
    }
}
