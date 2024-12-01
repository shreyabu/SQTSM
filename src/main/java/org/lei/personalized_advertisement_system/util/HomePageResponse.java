package org.lei.personalized_advertisement_system.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.lei.personalized_advertisement_system.DTO.AdDTO;
import org.lei.personalized_advertisement_system.DTO.ProductDTO;

import java.util.List;

@Data
@AllArgsConstructor
public class HomePageResponse {
    private List<AdDTO> ads;
    private List<ProductDTO> products;
    private String message;
}

