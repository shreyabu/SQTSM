package org.lei.personalized_advertisement_system.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class AdDTO {
    private Long id;
    private String title;
    private String description;
    private String image;
    private List<String> categories;
    private Double price;
    private Integer clicks;
}

