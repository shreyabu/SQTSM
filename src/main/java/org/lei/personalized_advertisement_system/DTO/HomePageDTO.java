package org.lei.personalized_advertisement_system.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class HomePageDTO {
    private List<AdDTO> ads;
    private List<ProductDTO> products;
    private String message;
}
