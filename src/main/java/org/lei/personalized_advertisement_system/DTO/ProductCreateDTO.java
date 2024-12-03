package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;

import java.util.List;

@Data
public class ProductCreateDTO {
    private String name;
    private String description;
    private Double price;
    private String image;
    private List<String> categories;
}
