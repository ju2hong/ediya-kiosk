package com.kiosk.mcdonald_kiosk_be.domain.order.service;

import com.kiosk.mcdonald_kiosk_be.domain.order.dto.OrderRequestDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.dto.OrderResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.entity.Order;
import com.kiosk.mcdonald_kiosk_be.domain.order.repository.OrderRepository;
import com.kiosk.mcdonald_kiosk_be.domain.user.entity.PrincipalDetails;
import com.kiosk.mcdonald_kiosk_be.domain.user.entity.User;
import com.kiosk.mcdonald_kiosk_be.domain.user.repository.UserRepository;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Transactional
    public ResponseDto<OrderResponseDto> order(OrderRequestDto orderRequestDto,
                                        PrincipalDetails user) {
        try {
            Optional<Order> sortedByDateOrder = orderRepository.findLatestOrderNumberByOrderTime(LocalDate.now());

            int orderNum = 1;
            if (sortedByDateOrder.isPresent()) {
                orderNum = sortedByDateOrder.get().getOrderNumber() + 1;
            }
            Order order = orderRepository.save(orderRequestDto.toEntity(orderNum));

            // 관리자 페이지 - 적립금
             if (user != null) {
                User curUser = userRepository.findByUserId(user.getUserId())
                        .orElseThrow(() -> new IllegalArgumentException("일치하는 유저가 없습니다."));
                int point = (int)(curUser.getUserPoint()+(orderRequestDto.getTotalPrice()*0.01));
                curUser.updatePoint(point);
                userRepository.save(curUser);
                return ResponseDto.success(Order.toDto(order, curUser.getUserPoint()));
            }
            return ResponseDto.success(Order.toDto(order, -1));
        } catch (Exception e) {
            return ResponseDto.fail("500", "주문 목록 불러오기 실패");
        }
    }
}
