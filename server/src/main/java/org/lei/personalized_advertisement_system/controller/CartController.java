package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.DTO.AddToCartDTO;
import org.lei.personalized_advertisement_system.DTO.CartDTO;
import org.lei.personalized_advertisement_system.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartDTO addToCartDTO) {
        cartService.addToCart(addToCartDTO.getProductId(), addToCartDTO.getQuantity());
        return ResponseEntity.ok("Product added to cart.");
    }

    @GetMapping
    public ResponseEntity<List<CartDTO>> getCart() {
        return ResponseEntity.ok(cartService.getCartItems());
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeFromCart(@RequestBody AddToCartDTO AddToCartDTO) {
        cartService.removeFromCart(AddToCartDTO.getProductId());
        return ResponseEntity.ok("Product removed from cart.");
    }
}

