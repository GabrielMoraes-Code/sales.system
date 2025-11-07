package com.sales.order.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateOrderRequest {
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String address;
    private List<OrderItemRequest> items;
    
    @Data
    public static class OrderItemRequest {
        private Long productId;
        private String productName;
        private Integer quantity;
        private Double price;
    }
}
