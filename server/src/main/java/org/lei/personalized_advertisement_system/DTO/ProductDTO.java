package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;

@Data
public class ProductDTO {
    private Long id;

    private String name;

    private String description;

    private Double price;

    private String category;
}
