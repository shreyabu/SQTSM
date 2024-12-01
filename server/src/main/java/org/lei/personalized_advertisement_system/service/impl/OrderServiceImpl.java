package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.CartDTO;
import org.lei.personalized_advertisement_system.DTO.OrderDTO;
import org.lei.personalized_advertisement_system.DTO.OrderItemDTO;
import org.lei.personalized_advertisement_system.entity.Cart;
import org.lei.personalized_advertisement_system.entity.Order;
import org.lei.personalized_advertisement_system.entity.OrderItem;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.repository.OrderRepository;
import org.lei.personalized_advertisement_system.service.CartService;
import org.lei.personalized_advertisement_system.service.OrderService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserService userService;

    @Override
    public OrderDTO createOrder() {
        List<CartDTO> cartItems = cartService.getCartItems();
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty.");
        }

        Double totalPrice = 0.0;
        Order order = new Order();
        List<OrderItem> orderItems = new ArrayList<>();
        List<Product> products = new ArrayList<>();
        for (CartDTO cart : cartItems) {
            OrderItem item = new OrderItem();
            item.setProduct(cart.getProduct());
            item.setQuantity(cart.getQuantity());
            item.setPrice(cart.getProduct().getPrice() * cart.getQuantity());
            item.setOrder(order);
            orderItems.add(item);
            products.add(cart.getProduct());
            totalPrice += item.getPrice();
        }
        order.setUser(userService.getCurrentUser());
        order.setTotalPrice(totalPrice);
        order.setItems(orderItems);

        orderRepository.save(order);
        userService.updateUserPreferences(products);
        cartService.clearCart();

        return convertToOrderDTO(order);
    }

    @Override
    public List<OrderDTO> getOrders() {
        return orderRepository.findByUserId(userService.getCurrentUser().getId()).orElseThrow().stream().map(this::convertToOrderDTO).collect(Collectors.toList());
    }


    public OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setUsername(order.getUser().getUsername());
        List<OrderItemDTO> itemDTOs = order.getItems().stream().map(this::convertToOrderItemDTO).collect(Collectors.toList());
        orderDTO.setItems(itemDTOs);
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setCreatedAt(order.getCreatedAt());
        return orderDTO;
    }

    private OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        OrderItemDTO itemDTO = new OrderItemDTO();
        itemDTO.setId(orderItem.getId());
        itemDTO.setProductId(orderItem.getProduct().getId());
        itemDTO.setProductName(orderItem.getProduct().getName());
        itemDTO.setQuantity(orderItem.getQuantity());
        itemDTO.setPrice(orderItem.getPrice());

        return itemDTO;
    }

}

