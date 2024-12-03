package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.ProductCreateDTO;
import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.DTO.ProductUpdateDTO;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.repository.ProductRepository;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.StringToListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
    public ProductDTO addProduct(ProductCreateDTO product) {
        Product newProduct = new Product();
        newProduct.setName(product.getName());
        newProduct.setDescription(product.getDescription());
        newProduct.setPrice(product.getPrice());
        newProduct.setCategories(String.join(",", product.getCategories()));
        newProduct.setImage(product.getImage());
        return convertToProductDTO(productRepository.save(newProduct));
    }

    @Override
    public Product updateProduct(ProductUpdateDTO product) {
        Product existingProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setImage(product.getImage());
        existingProduct.setCategories(String.join(",", product.getCategories()));
        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Page<ProductDTO> getAllProducts(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return productRepository.findAll(pageRequest).map(this::convertToProductDTO);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    @Override
    public List<ProductDTO> getRecommendedProducts(String username) {
        List<String> preferences = userService.getPreferencesByUsername(username);

        if (preferences == null || preferences.isEmpty()) {
            return productRepository.findTop12ByOrderBySalesDesc().stream()
                    .map(this::convertToProductDTO)
                    .collect(Collectors.toList());
        }

        return productRepository.findAll().stream()
                .filter(product -> preferences.stream().anyMatch(product.getCategories()::contains))
                .map(this::convertToProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getPopularProducts() {
        List<Product> popularProducts = productRepository.findTop12ByOrderBySalesDesc();

        // 转换为 DTO 列表返回
        return popularProducts.stream()
                .map(this::convertToProductDTO)
                .toList();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public ProductDTO convertToProductDTO(Product product) {
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
