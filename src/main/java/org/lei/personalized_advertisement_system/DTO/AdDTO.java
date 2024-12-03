package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class AdDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
    private List<String> categories;
    private Integer clicks;
    private Set<ProductDTO> products;
}
