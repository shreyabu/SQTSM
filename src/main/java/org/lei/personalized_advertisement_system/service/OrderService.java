package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO createOrder();
    List<OrderDTO> getOrders();
}
