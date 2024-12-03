package org.lei.personalized_advertisement_system.service.impl;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.lei.personalized_advertisement_system.DTO.CartDTO;
import org.lei.personalized_advertisement_system.entity.Cart;
import org.lei.personalized_advertisement_system.entity.User;
import org.lei.personalized_advertisement_system.repository.CartRepository;
import org.lei.personalized_advertisement_system.repository.ProductRepository;
import org.lei.personalized_advertisement_system.service.CartService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Override
    public void addToCart(Long productId, Integer quantity) {
        User currentUser = userService.getCurrentUser();
        Cart cartItem = cartRepository.findByUserIdAndProductId(currentUser.getId(), productId)
                .orElse(new Cart());
        cartItem.setUser(currentUser);
        cartItem.setProduct(productRepository.findById(productId).orElseThrow());
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
        cartRepository.save(cartItem);
    }

    @Override
    public Page<CartDTO> getCart(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return cartRepository.findByUserId(userService.getCurrentUser().getId(), pageRequest).map(this::convertToDTO);
    }

    @Override
    public List<CartDTO> getCartItems() {
        return cartRepository.findByUserId(userService.getCurrentUser().getId()).stream().map(this::convertToDTO).toList();
    }

    @Override
    public void updateCartItem(Long productId, Integer quantity) {
        if (quantity < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }

        Cart cartItem = cartRepository.findByUserIdAndProductId(userService.getCurrentUser().getId(), productId)
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));

        cartItem.setQuantity(quantity);
        cartRepository.save(cartItem);
    }

    @Override
    @Transactional
    public void removeFromCart(Long productId) {
        cartRepository.deleteByUserIdAndProductId(userService.getCurrentUser().getId(), productId);
    }

    @Override
    @Transactional
    public void clearCart() {
        cartRepository.deleteByUserId(userService.getCurrentUser().getId());
    }

    public CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setUsername(cart.getUser().getUsername());
        cartDTO.setProduct(cart.getProduct());
        cartDTO.setQuantity(cart.getQuantity());
        return cartDTO;
    }
}
