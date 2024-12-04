package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.DTO.AddToCartDTO;
import org.lei.personalized_advertisement_system.DTO.CartDTO;
import org.lei.personalized_advertisement_system.DTO.UpdateCartDTO;
import org.lei.personalized_advertisement_system.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody AddToCartDTO addToCartDTO) {
        cartService.addToCart(addToCartDTO.getProductId(), addToCartDTO.getQuantity());
        return ResponseEntity.ok("Product added to cart.");
    }

    @GetMapping
    public ResponseEntity<Page<CartDTO>> getCart(@RequestParam("page") Integer page,
                                                 @RequestParam("size") Integer size) {
        return ResponseEntity.ok(cartService.getCart(page, size));
    }

    @PutMapping
    public ResponseEntity<String> updateCart(@RequestBody UpdateCartDTO dto) {
        cartService.updateCartItem(dto.getProductId(), dto.getQuantity());
        return ResponseEntity.ok("Cart updated successfully.");
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long productId) {
        cartService.removeFromCart(productId);
        return ResponseEntity.ok("Product removed from cart.");
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCartCount() {
        Map<String, Integer> response = new HashMap<>();
        response.put("count", cartService.getCartItems().size());
        return ResponseEntity.ok(response);
    }
}

