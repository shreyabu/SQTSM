package org.lei.personalized_advertisement_system.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String username;
    private Double totalPrice;
    private List<OrderItemDTO> items;
    private LocalDateTime createdAt;
}
