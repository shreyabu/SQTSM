package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.DTO.ProductCreateDTO;
import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.DTO.ProductUpdateDTO;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getAllProducts(@RequestParam("page") Integer page,
                                                           @RequestParam("size") Integer size) {
        return ResponseEntity.ok(productService.getAllProducts(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.convertToProductDTO((productService.getProductById(id))));
    }

    @GetMapping("/recommended")
    public List<ProductDTO> getRecommendedProducts(@RequestParam String username) {
        return productService.getRecommendedProducts(username);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductCreateDTO product) {
        return ResponseEntity.ok(productService.addProduct(product));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductUpdateDTO product) {
        return ResponseEntity.ok(productService.convertToProductDTO(productService.updateProduct(product)));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product has been deleted.");
    }
}
