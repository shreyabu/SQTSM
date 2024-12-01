package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.entity.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);

    Product updateProduct(Long id, Product product);

    void deleteProduct(Long id);

    List<Product> getAllProducts();

    List<ProductDTO> getRecommendedProducts(String username);

    List<ProductDTO> getPopularProducts();

    Product getProductById(Long id);

    ProductDTO convertProductToProductDTO(Product product);
}
