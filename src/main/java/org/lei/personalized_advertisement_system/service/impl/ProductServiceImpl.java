package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.repository.ProductRepository;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.StringToListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setCategories(product.getCategories());
        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<ProductDTO> getRecommendedProducts(String username) {
        List<String> preferences = userService.getPreferencesByUsername(username);

        if (preferences == null || preferences.isEmpty()) {
            return productRepository.findTop10ByOrderBySalesDesc().stream()
                    .map(this::convertProductToProductDTO)
                    .collect(Collectors.toList());
        }

        return productRepository.findAll().stream()
                .filter(product -> preferences.stream().anyMatch(product.getCategories()::contains))
                .map(this::convertProductToProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getPopularProducts() {
        List<Product> popularProducts = productRepository.findTop10ByOrderBySalesDesc();

        // 转换为 DTO 列表返回
        return popularProducts.stream()
                .map(this::convertProductToProductDTO)
                .toList();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public ProductDTO convertProductToProductDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setImage(product.getImage());
        productDTO.setCategories(StringToListUtil.toList(product.getCategories()));
        productDTO.setSales(product.getSales());
        productDTO.setRating(product.getRating());
        return productDTO;
    }
}
