package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;

@Data
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private Integer quantity;
    private Double price;
}
