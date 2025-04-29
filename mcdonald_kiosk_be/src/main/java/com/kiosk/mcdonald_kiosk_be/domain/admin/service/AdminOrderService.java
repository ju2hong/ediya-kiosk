package com.kiosk.mcdonald_kiosk_be.domain.admin.service;

import com.kiosk.mcdonald_kiosk_be.domain.admin.dto.OrderListResponseDto;
import com.kiosk.mcdonald_kiosk_be.domain.order.repository.OrderRepository;
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
}
