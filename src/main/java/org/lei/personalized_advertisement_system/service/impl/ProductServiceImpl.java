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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<ProductDTO> getPopularProducts() {
        return productRepository.findTop12ByOrderBySalesDesc().stream().map(this::convertToProductDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getRecommendedProducts(String username) {
        List<String> preferences = userService.getPreferencesByUsername(username);
        List<ProductDTO> recommendedProducts = new ArrayList<>();

        if (preferences != null && !preferences.isEmpty()) {
            for (String category : preferences) {
                List<ProductDTO> categoryProducts = productRepository.findProductsByCategory(category, PageRequest.of(0, 12))
                        .stream()
                        .map(this::convertToProductDTO)
                        .toList();

                recommendedProducts.addAll(categoryProducts);

                if (recommendedProducts.size() >= 12) {
                    break;
                }
            }
        }

        if (recommendedProducts.size() < 12) {
            int productsToAdd = 12 - recommendedProducts.size();
            List<Long> existingProductIds = recommendedProducts.stream()
                    .map(ProductDTO::getId)
                    .collect(Collectors.toList());

            List<ProductDTO> additionalProducts = productRepository.findAdditionalProducts(existingProductIds, PageRequest.of(0, productsToAdd)).stream()
                    .map(this::convertToProductDTO)
                    .toList();

            recommendedProducts.addAll(additionalProducts);
        }
        return recommendedProducts;
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
