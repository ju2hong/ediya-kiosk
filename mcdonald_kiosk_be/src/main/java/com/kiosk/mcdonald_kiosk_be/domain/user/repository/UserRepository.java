package com.kiosk.mcdonald_kiosk_be.domain.user.repository;

import com.kiosk.mcdonald_kiosk_be.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUserId(String userId);

    @Query("SELECT u FROM User u WHERE u.isDeleted = false")
    Page<User> findAllUserList(Pageable pageable);
}
