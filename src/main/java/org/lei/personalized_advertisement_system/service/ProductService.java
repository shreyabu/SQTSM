package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.ProductCreateDTO;
import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.DTO.ProductUpdateDTO;
import org.lei.personalized_advertisement_system.entity.Product;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    ProductDTO addProduct(ProductCreateDTO product);

    Product updateProduct(ProductUpdateDTO product);

    void deleteProduct(Long id);

    Page<ProductDTO> getAllProducts(Integer page, Integer size);

    List<Product> getAllProducts();

    List<ProductDTO> getRecommendedProducts(String username);

    List<ProductDTO> getPopularProducts();

    Product getProductById(Long id);

    ProductDTO convertToProductDTO(Product product);
}
