package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.CartDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CartService {
    void addToCart( Long productId, Integer quantity);
    Page<CartDTO> getCart(Integer page, Integer size);
    List<CartDTO> getCartItems();
    void updateCartItem(Long productId, Integer quantity);
    void removeFromCart(Long productId);
    void clearCart();
}
