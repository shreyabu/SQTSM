package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;

@Data
public class AddToCartDTO {
    private Long productId;
    private int quantity;
}
