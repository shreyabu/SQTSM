package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;
import org.lei.personalized_advertisement_system.entity.Product;

@Data
public class CartDTO {
    private String username;
    private Product product;
    private Integer quantity;
}
