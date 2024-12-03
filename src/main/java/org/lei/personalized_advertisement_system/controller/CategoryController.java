package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.enums.ProductCategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping
public class CategoryController {
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(Arrays.stream(ProductCategory.values()).map(ProductCategory::toString).collect(Collectors.toList()));
    }
}
