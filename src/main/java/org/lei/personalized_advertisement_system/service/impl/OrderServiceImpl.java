package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.CartDTO;
import org.lei.personalized_advertisement_system.DTO.OrderDTO;
import org.lei.personalized_advertisement_system.DTO.OrderItemDTO;
import org.lei.personalized_advertisement_system.entity.*;
import org.lei.personalized_advertisement_system.enums.Role;
import org.lei.personalized_advertisement_system.repository.OrderRepository;
import org.lei.personalized_advertisement_system.service.CartService;
import org.lei.personalized_advertisement_system.service.OrderService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.StringToListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
        User currentUser = userService.getCurrentUser();
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
        String orderNumber = generateOrderNumber();
        order.setOrderNumber(orderNumber);
        order.setUser(currentUser);
        order.setTotalPrice(totalPrice);
        order.setItems(orderItems);

        orderRepository.save(order);
        Set<String> preferences = new HashSet<>();
        for (Product product : products) {
            if (product.getCategories() != null) {
                preferences.addAll(StringToListUtil.toList(product.getCategories()));
            }
        }
        preferences.addAll(StringToListUtil.toList(currentUser.getPreferences()));
        userService.updateUserPreferences(preferences);
        cartService.clearCart();

        return convertToOrderDTO(order);
    }

    @Override
    public Page<OrderDTO> getOrders(int page, int size) {
        User currentUser = userService.getCurrentUser();
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Order> orderPage;
        if (currentUser.getRole().equals(Role.ADMIN)) {
            orderPage = orderRepository.findAll(pageRequest);
        } else {
            orderPage = orderRepository.findByUserId(currentUser.getId(), pageRequest);
        }
        return orderPage.map(this::convertToOrderDTO);
    }


    public OrderDTO convertToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderNumber(order.getOrderNumber());
        orderDTO.setUsername(order.getUser().getUsername());
        List<OrderItemDTO> itemDTOs = order.getItems().stream().map(this::convertToOrderItemDTO).collect(Collectors.toList());
        orderDTO.setItems(itemDTOs);
        orderDTO.setTotalPrice(order.getTotalPrice());
        orderDTO.setCreatedAt(order.getCreatedAt());
        return orderDTO;
    }

    public OrderItemDTO convertToOrderItemDTO(OrderItem orderItem) {
        OrderItemDTO itemDTO = new OrderItemDTO();
        itemDTO.setId(orderItem.getId());
        itemDTO.setProductId(orderItem.getProduct().getId());
        itemDTO.setProductName(orderItem.getProduct().getName());
        itemDTO.setQuantity(orderItem.getQuantity());
        itemDTO.setPrice(orderItem.getPrice());

        return itemDTO;
    }

    private String generateOrderNumber() {
        return "ORD-" + System.currentTimeMillis();
    }

}

