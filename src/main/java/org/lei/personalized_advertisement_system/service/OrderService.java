package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.OrderDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface OrderService {
    OrderDTO createOrder();
    Page<OrderDTO> getOrders(int page, int size);
}
