package org.lei.personalized_advertisement_system.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ads")
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    private String image;

    @Lob
    private String categories;

    private Integer clicks = 0;

    @ManyToMany
    @JoinTable(
            name = "ad_products",
            joinColumns = @JoinColumn(name = "ad_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Ad(String title, String description,String image, String categories, Set<Product> products) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.categories = categories;
        this.products = products;
    }
}
