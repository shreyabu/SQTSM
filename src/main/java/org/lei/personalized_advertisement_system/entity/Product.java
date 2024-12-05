package org.lei.personalized_advertisement_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 500)
    private String description;

    private Double price;

    private String image;

    @Column(length = 500)
    private String categories;

    private Integer sales = 0;

    private Double rating;

    private LocalDateTime createdAt = LocalDateTime.now();
}
