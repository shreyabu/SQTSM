package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.DTO.AdDTO;
import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.service.AdService;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.HomePageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class HomeController {

    @Autowired
    private AdService adService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @GetMapping("/")
    public ResponseEntity<?> getHomePage(@RequestHeader(value = "Authorization", required = false) String token) {
        List<AdDTO> ads;
        List<ProductDTO> products;

        if (token != null && !token.isBlank()) {
            // 如果提供了token，尝试获取用户信息
            String username = userService.getCurrentUser().getUsername();
            if (username != null) {
                ads = adService.getRecommendedAds(username); // 推荐广告
                products = productService.getRecommendedProducts(username); // 推荐商品
                return ResponseEntity.ok(new HomePageResponse(ads, products, "Welcome back, " + username + "!"));
            }
        }

        // 用户未登录或token无效
        ads = adService.getPopularAds(); // 热门广告
        products = productService.getPopularProducts(); // 热门商品
        return ResponseEntity.ok(new HomePageResponse(ads, products, "Explore popular ads and products!"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AdDTO>> searchAds(@RequestParam String query) {
        List<AdDTO> results = adService.searchAds(query);
        return ResponseEntity.ok(results);
    }

    @PostMapping("/click/{adId}")
    public ResponseEntity<?> recordAdClick(@PathVariable Long adId) {
        adService.recordClick(adId);
        return ResponseEntity.ok("Ad click recorded.");
    }
}

