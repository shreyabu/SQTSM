package org.lei.personalized_advertisement_system.controller;

import org.lei.personalized_advertisement_system.DTO.OrderDTO;
import org.lei.personalized_advertisement_system.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderDTO> createOrder() {
        return ResponseEntity.ok(orderService.createOrder());
    }

    @GetMapping
    public ResponseEntity<Page<OrderDTO>> getOrders(@RequestParam("page") Integer page,
                                                    @RequestParam("size") Integer size) {
        return ResponseEntity.ok(orderService.getOrders(page, size));
    }
}

