package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;
import org.lei.personalized_advertisement_system.entity.Product;

import java.time.LocalDateTime;

@Data
public class CartDTO {
    private String username;
    private Product product;
    private Integer quantity;
    private LocalDateTime createdAt;
}
