package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.service.AdService;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
    private AdService adService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping("/ads")
    public ResponseEntity<?> getHomePage(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && !token.isBlank()) {
            return ResponseEntity.ok(adService.getRecommendedAds());
        }
        return ResponseEntity.ok(adService.getPopularAds());
    }

    @GetMapping("/products")
    public ResponseEntity<?> getProducts(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && !token.isBlank()) {
            String username = userService.getCurrentUser().getUsername();
            return ResponseEntity.ok(productService.getRecommendedProducts(username));
        }
        return ResponseEntity.ok(productService.getPopularProducts());
    }
}

