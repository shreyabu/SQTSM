package org.lei.personalized_advertisement_system.config;

import org.lei.personalized_advertisement_system.entity.Ad;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.entity.User;
import org.lei.personalized_advertisement_system.enums.ProductCategory;
import org.lei.personalized_advertisement_system.enums.Role;
import org.lei.personalized_advertisement_system.repository.AdRepository;
import org.lei.personalized_advertisement_system.repository.ProductRepository;
import org.lei.personalized_advertisement_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final AdRepository adRepository;

    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ProductRepository productRepository, AdRepository adRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.adRepository = adRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setPreferences("");
            adminUser.setRole(Role.ADMIN);
            userRepository.save(adminUser);
            System.out.println("Admin user created: username=admin, password=admin123");

            User user1 = new User("user1", passwordEncoder.encode("user1"), String.join(",", Arrays.asList(ProductCategory.ELECTRONICS.toString(), ProductCategory.SPORTS.toString())));

            User user2 = new User("user2", passwordEncoder.encode("user2"), String.join(",", Arrays.asList(ProductCategory.MUSIC.toString(), ProductCategory.SPORTS.toString())));

            User user3 = new User("user3", passwordEncoder.encode("user3"), String.join(",", Arrays.asList(ProductCategory.BOOKS.toString(), ProductCategory.FASHION.toString())));

            userRepository.saveAll(Arrays.asList(user1, user2, user3));
        }

        if (productRepository.count() == 0) {
            // Add sample products
            Product product1 = new Product();
            product1.setName("Laptop");
            product1.setDescription("High-performance laptop for professionals.");
            product1.setPrice(1000.0);
            product1.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product1.setSales(150);

            Product product2 = new Product();
            product2.setName("Smartphone");
            product2.setDescription("Latest smartphone with advanced features.");
            product2.setPrice(500.0);
            product2.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product2.setSales(300);

            Product product3 = new Product();
            product3.setName("Headphones");
            product3.setDescription("Noise-cancelling headphones for clear sound.");
            product3.setPrice(200.0);
            product3.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString(), ProductCategory.FASHION.toString())));
            product3.setSales(250);

            Product product4 = new Product();
            product4.setName("Backpack");
            product4.setDescription("Durable backpack suitable for all purposes.");
            product4.setPrice(50.0);
            product4.setCategories(String.join(",", List.of(ProductCategory.SPORTS.toString(), ProductCategory.FASHION.toString())));
            product4.setSales(120);

            productRepository.saveAll(Arrays.asList(product1, product2, product3, product4));
            System.out.println("Initialized sample products.");
        }

        if (adRepository.count() == 0) {
            adRepository.save(new Ad(
                    "Smartphone Sale",
                    "Latest 5G smartphones at discounted prices!",
                    699.0,
                    String.join(",", List.of(ProductCategory.ELECTRONICS.toString()))
            ));
            adRepository.save(new Ad(
                    "Winter Fashion Sale",
                    "Stay warm with our stylish winter collection.",
                    49.99,
                    String.join(",", List.of(ProductCategory.FASHION.toString()))
            ));
            adRepository.save(new Ad(
                    "Organic Grocery Basket",
                    "Fresh fruits and veggies delivered to your doorstep.",
                    39.99,
                    String.join(",", List.of(ProductCategory.FOOD.toString()))
            ));
            adRepository.save(new Ad(
                    "Sports Gear Clearance",
                    "Up to 50% off on all sports gear and equipment.",
                    25.0,
                    String.join(",", List.of(ProductCategory.SPORTS.toString()))
            ));
            adRepository.save(new Ad(
                    "Music Concert Tickets",
                    "Book now for the upcoming live concerts near you!",
                    99.0,
                    String.join(",", List.of(ProductCategory.MUSIC.toString()))
            ));
            adRepository.save(new Ad(
                    "Bestselling Novels",
                    "Discover the top bestselling novels of the year.",
                    15.99,
                    String.join(",", List.of(ProductCategory.BOOKS  .toString()))
            ));

            System.out.println("Ads initialized successfully.");
        } else {
            System.out.println("Ads already initialized.");
        }

    }
}

