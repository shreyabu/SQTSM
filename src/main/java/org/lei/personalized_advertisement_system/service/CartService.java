package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.CartDTO;

import java.util.List;

public interface CartService {
    void addToCart( Long productId, int quantity);
    List<CartDTO> getCartItems();
    void removeFromCart(Long productId);
    void clearCart();
}
