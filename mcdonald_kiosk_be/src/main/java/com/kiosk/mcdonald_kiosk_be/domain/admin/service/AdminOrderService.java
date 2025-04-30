package com.kiosk.mcdonald_kiosk_be.domain.admin.service;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.OrderEditRequestDto;
import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.OrderListResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.entity.Order;
import com.kiosk.mcdonald_kiosk_be.domain.order.repository.OrderRepository;
import com.kiosk.mcdonald_kiosk_be.global.common.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminOrderService {

    private final OrderRepository orderRepository;


    @Transactional(readOnly = true)
    public Page<OrderListResponseDto> getOrderList(int page) {
        Pageable paging = PageRequest.of(page, 5, Sort.by(Sort.Order.desc("orderTime")));
        return orderRepository.findAllOrderList(paging).map(OrderListResponseDto::toDto);
    }

    @Transactional
    public ResponseDto<Order> editOrder(Long id, OrderEditRequestDto orderEditRequestDto) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("주문 목록을 찾을 수 업습니다."));

        order.editOrder(id,orderEditRequestDto);
        order = orderRepository.save(order);
        return ResponseDto.success(order);
    }


    @Transactional(readOnly = true)
    public ResponseDto<OrderListResponseDto> orderDetail(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("주문 목록을 찾을 수 없습니다."));
        return ResponseDto.success(OrderListResponseDto.toDto(order));
    }

    @Transactional
    public ResponseDto<Void> deleteOrder(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("주문 목록을 찾을 수 없습니다."));
        order.deleteOrder(id);
        orderRepository.save(order);
        return ResponseDto.successWithNoData();
    }

}
