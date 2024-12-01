package org.lei.personalized_advertisement_system.entity;

import jakarta.persistence.*;
import lombok.*;

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

    private Double price;

    private Integer clicks = 0;

    public Ad(String title, String description, Double price, String categories) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.categories = categories;
    }
}

