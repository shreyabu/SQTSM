package org.lei.personalized_advertisement_system.repository;

import org.lei.personalized_advertisement_system.entity.Cart;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);

    Page<Cart> findByUserId(Long userId, Pageable pageable);

    List<Cart> findByUserId(Long userId);

    void deleteByUserIdAndProductId(Long userId, Long productId);

    void deleteByUserId(Long userId);
}
