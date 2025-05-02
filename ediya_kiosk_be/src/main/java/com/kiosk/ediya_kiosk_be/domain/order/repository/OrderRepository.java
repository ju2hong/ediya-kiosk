package com.kiosk.ediya_kiosk_be.domain.order.repository;

import com.kiosk.ediya_kiosk_be.domain.order.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.isDeleted = false")
    Page<Order> findAllOrderList(Pageable pageable);

    @Query("SELECT o FROM Order o WHERE DATE(o.orderTime) = :orderTime ORDER BY o.orderNumber DESC limit 1")
    Optional<Order> findLatestOrderNumberByOrderTime(@Param("orderTime") LocalDate orderTime);
}
