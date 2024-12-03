package org.lei.personalized_advertisement_system.config;

import org.lei.personalized_advertisement_system.entity.Ad;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.entity.User;
import org.lei.personalized_advertisement_system.enums.ProductCategory;
import org.lei.personalized_advertisement_system.enums.Role;
import org.lei.personalized_advertisement_system.repository.AdRepository;
import org.lei.personalized_advertisement_system.repository.ProductRepository;
import org.lei.personalized_advertisement_system.repository.UserRepository;
import org.lei.personalized_advertisement_system.service.AdService;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final AdRepository adRepository;

    private final ProductService productService;

    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, ProductRepository productRepository, AdRepository adRepository, AdService adService, ProductService productService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.adRepository = adRepository;
        this.productService = productService;
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
            List<Product> products = new ArrayList<>();

            Product product1 = new Product();
            product1.setName("Sony WH-1000XM5");
            product1.setDescription("The Best Wireless Noise Canceling Headphones, Made Of Soft Fit Synthetic Leather, Integrated Processor V1, With 4 Beamforming Microphones, Up To 30-Hour Battery Life, Black");
            product1.setPrice(298.0);
            product1.setImage("https://i.postimg.cc/ZY6b3Dpb/51a-Xvjzcuk-L-AC-SX679.jpg");
            product1.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString(), ProductCategory.FASHION.toString())));
            product1.setSales(150);
            products.add(product1);

            Product product2 = new Product();
            product2.setName("Peet's Coffee");
            product2.setDescription("Medium Roast Ground Coffee - Big Bang 18 Ounce Bag");
            product2.setPrice(12.34);
            product2.setImage("https://i.postimg.cc/pLcRRNbZ/41f-Kc-Ir-Vy1-L-SX300-SY300-QL70-FMwebp.webp");
            product2.setCategories(String.join(",", List.of(ProductCategory.FOOD.toString())));
            product2.setSales(300);
            products.add(product2);

            Product product3 = new Product();
            product3.setName("Amazon TV");
            product3.setDescription("Amazon Fire TV 50\" 4-Series 4K UHD smart TV with Fire TV Alexa Voice Remote, stream live TV without cable");
            product3.setPrice(200.0);
            product3.setImage("https://i.postimg.cc/zDkmqmTg/716fl-IFu1-QL-AC-SX679.jpg");
            product3.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product3.setSales(250);
            products.add(product3);

            Product product4 = new Product();
            product4.setName("Samsung Galaxy S24 Ultra Cell Phone");
            product4.setDescription("Samsung Galaxy S24 Ultra Cell Phone, 256GB AI Smartphone, Unlocked Android, 200MP, 100x Zoom Cameras, Fast Processor, Long Battery Life, Edge-to-Edge Display, S Pen, US Version, 2024, Titanium Violet");
            product4.setPrice(949.0);
            product4.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product4.setSales(120);
            products.add(product4);

            Product product5 = new Product();
            product5.setName("Anon M4 Snow Goggles");
            product5.setDescription("Anon M4 Snow Goggles, Smoke / Perceive Sun");
            product5.setPrice(250.0);
            product5.setCategories(String.join(",", List.of(ProductCategory.SPORTS.toString(), ProductCategory.FASHION.toString())));
            product5.setSales(110);
            products.add(product5);

            Product product6 = new Product();
            product6.setName("Apple MacBook Pro 16-inch");
            product6.setDescription("Apple M2 Pro chip, 16GB RAM, 512GB SSD, Retina Display, macOS Ventura");
            product6.setPrice(2499.0);
            product6.setImage("https://i.postimg.cc/76z3Rg6G/macbook-pro.jpg");
            product6.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product6.setSales(95);
            products.add(product6);

            Product product7 = new Product();
            product7.setName("Nike Air Max 270");
            product7.setDescription("Nike Men's Air Max 270 Running Shoes, Comfortable and Stylish");
            product7.setPrice(150.0);
            product7.setImage("https://i.postimg.cc/c1vXyZWW/nike-airmax.jpg");
            product7.setCategories(String.join(",", List.of(ProductCategory.FASHION.toString(), ProductCategory.SPORTS.toString())));
            product7.setSales(500);
            products.add(product7);

            Product product8 = new Product();
            product8.setName("Dyson Airwrap Complete Styler");
            product8.setDescription("Styler for Multiple Hair Types and Styles, Includes Multiple Attachments");
            product8.setPrice(599.99);
            product8.setImage("https://i.postimg.cc/mrD1w5Wr/dyson-airwrap.jpg");
            product8.setCategories(String.join(",", List.of(ProductCategory.FASHION.toString(), ProductCategory.BEAUTY.toString())));
            product8.setSales(80);
            products.add(product8);

            Product product9 = new Product();
            product9.setName("LEGO Star Wars Millennium Falcon");
            product9.setDescription("Star Wars Building Kit, Collectible Model, Great for Kids and Adults");
            product9.setPrice(799.99);
            product9.setImage("https://i.postimg.cc/RF1FwcsL/lego-starwars.jpg");
            product9.setCategories(String.join(",", List.of(ProductCategory.TOYS.toString())));
            product9.setSales(70);
            products.add(product9);

            Product product10 = new Product();
            product10.setName("KitchenAid Stand Mixer");
            product10.setDescription("KitchenAid Artisan Stand Mixer, 5-Quart Bowl, Multiple Speeds, Includes Attachments");
            product10.setPrice(449.0);
            product10.setImage("https://i.postimg.cc/FRz3FtTc/kitchenaid-mixer.jpg");
            product10.setCategories(String.join(",", List.of(ProductCategory.HOME.toString(), ProductCategory.KITCHEN.toString())));
            product10.setSales(350);
            products.add(product10);

            Product product11 = new Product();
            product11.setName("Samsung 75-Inch 4K UHD TV");
            product11.setDescription("Samsung Class QLED Smart TV with Alexa Built-In");
            product11.setPrice(1299.0);
            product11.setImage("https://i.postimg.cc/gJZZzpyf/samsung-tv.jpg");
            product11.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product11.setSales(60);
            products.add(product11);

            Product product12 = new Product();
            product12.setName("Bose QuietComfort Earbuds II");
            product12.setDescription("Noise Cancelling, Wireless Bluetooth Earbuds with High-Fidelity Audio");
            product12.setPrice(249.0);
            product12.setImage("https://i.postimg.cc/VkSyP5Ds/bose-earbuds.jpg");
            product12.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString(), ProductCategory.FASHION.toString())));
            product12.setSales(200);
            products.add(product12);

            Product product13 = new Product();
            product13.setName("Instant Pot Duo 7-in-1 Electric Pressure Cooker");
            product13.setDescription("Instant Pot Duo 7-in-1, 6 Quart, Stainless Steel, Pressure Cooker, Steamer, and More");
            product13.setPrice(89.99);
            product13.setImage("https://i.postimg.cc/KjZjhmPV/instant-pot.jpg");
            product13.setCategories(String.join(",", List.of(ProductCategory.KITCHEN.toString(), ProductCategory.HOME.toString())));
            product13.setSales(400);
            products.add(product13);

            Product product14 = new Product();
            product14.setName("Canon EOS Rebel T8i Camera");
            product14.setDescription("DSLR Camera with EF-S 18-55mm Lens Kit, Wi-Fi, 24.1MP");
            product14.setPrice(899.0);
            product14.setImage("https://i.postimg.cc/FzbnRnDQ/canon-camera.jpg");
            product14.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product14.setSales(50);
            products.add(product14);

            Product product15 = new Product();
            product15.setName("Adidas Ultraboost 22");
            product15.setDescription("Adidas Men's Ultraboost 22 Running Shoes, Performance and Comfort");
            product15.setPrice(190.0);
            product15.setImage("https://i.postimg.cc/0Q9n8KFF/adidas-ultraboost.jpg");
            product15.setCategories(String.join(",", List.of(ProductCategory.FASHION.toString(), ProductCategory.SPORTS.toString())));
            product15.setSales(250);
            products.add(product15);

            Product product16 = new Product();
            product16.setName("Casio G-Shock Watch");
            product16.setDescription("Casio G-Shock Men's Watch, Rugged and Durable, Shock Resistant");
            product16.setPrice(150.0);
            product16.setImage("https://i.postimg.cc/t4PVD3k9/gshock-watch.jpg");
            product16.setCategories(String.join(",", List.of(ProductCategory.FASHION.toString())));
            product16.setSales(175);
            products.add(product16);

            Product product17 = new Product();
            product17.setName("Dell XPS 13 Laptop");
            product17.setDescription("Dell XPS 13 9310 Laptop, 11th Gen Intel Core i7, 16GB RAM, 512GB SSD");
            product17.setPrice(1599.0);
            product17.setImage("https://i.postimg.cc/FsFT2mDp/dell-xps.jpg");
            product17.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product17.setSales(90);
            products.add(product17);

            Product product18 = new Product();
            product18.setName("Cuisinart Coffee Maker");
            product18.setDescription("Cuisinart 12-Cup Programmable Coffee Maker with Glass Carafe");
            product18.setPrice(79.99);
            product18.setImage("https://i.postimg.cc/vZN79xmn/cuisinart-coffee.jpg");
            product18.setCategories(String.join(",", List.of(ProductCategory.HOME.toString(), ProductCategory.KITCHEN.toString())));
            product18.setSales(300);
            products.add(product18);

            Product product19 = new Product();
            product19.setName("Fossil Smartwatch");
            product19.setDescription("Fossil Gen 5 Smartwatch, Fitness Tracker with Heart Rate Monitor");
            product19.setPrice(299.0);
            product19.setImage("https://i.postimg.cc/dtgNZF8q/fossil-smartwatch.jpg");
            product19.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString(), ProductCategory.FASHION.toString())));
            product19.setSales(125);
            products.add(product19);

            Product product20 = new Product();
            product20.setName("Echo Dot (5th Gen)");
            product20.setDescription("Amazon Smart Speaker with Alexa, Voice Control for Music, Smart Home, and More");
            product20.setPrice(49.99);
            product20.setImage("https://i.postimg.cc/7ZyGfpPB/echo-dot.jpg");
            product20.setCategories(String.join(",", List.of(ProductCategory.ELECTRONICS.toString())));
            product20.setSales(500);
            products.add(product20);

            productRepository.saveAll(products);
            System.out.println("Initialized sample products.");
        }

        if (adRepository.count() == 0) {
            List<Ad> ads = new ArrayList<>();

            // 从数据库获取所有产品
            List<Product> allProducts = productService.getAllProducts();

            // 示例广告数据
            Ad ad1 = new Ad(
                    "Sony Noise Cancelling Headphones",
                    "Experience immersive sound with the Sony WH-1000XM5 headphones.",
                    "https://i.postimg.cc/ZY6b3Dpb/51a-Xvjzcuk-L-AC-SX679.jpg",
                    "ELECTRONICS,FASHION",
                    Set.of(allProducts.get(0), allProducts.get(1)) // 关联产品
            );
            ads.add(ad1);

            Ad ad2 = new Ad(
                    "Peet's Coffee - Big Bang",
                    "Start your day with Peet's medium roast ground coffee.",
                    "https://i.postimg.cc/pLcRRNbZ/41f-Kc-Ir-Vy1-L-SX300-SY300-QL70-FMwebp.webp",
                    "FOOD",
                    Set.of(allProducts.get(2))
            );
            ads.add(ad2);

            Ad ad3 = new Ad(
                    "Amazon Fire TV",
                    "Get your favorite shows with the Amazon Fire TV 4K UHD.",
                    "https://i.postimg.cc/zDkmqmTg/716fl-IFu1-QL-AC-SX679.jpg",
                    "ELECTRONICS",
                    Set.of(allProducts.get(3))
            );
            ads.add(ad3);

            Ad ad4 = new Ad(
                    "Samsung Galaxy S24 Ultra",
                    "The latest AI smartphone with cutting-edge features.",
                    "https://i.postimg.cc/8zzs8bZ7/samsung-galaxy.jpg",
                    "ELECTRONICS",
                    Set.of(allProducts.get(4))
            );
            ads.add(ad4);

            Ad ad5 = new Ad(
                    "GoPro HERO11",
                    "Capture life with GoPro HERO11 waterproof action camera.",
                    "https://i.postimg.cc/3Jr0X1GW/gopro.jpg",
                    "ELECTRONICS",
                    Set.of(allProducts.get(5), allProducts.get(6))
            );
            ads.add(ad5);

            Ad ad6 = new Ad(
                    "Home Gym Equipment",
                    "Stay fit at home with our best-selling gym equipment.",
                    "https://i.postimg.cc/nLbQqL7r/home-gym.jpg",
                    "FITNESS",
                    Set.of(allProducts.get(7))
            );
            ads.add(ad6);

            Ad ad7 = new Ad(
                    "Nike Running Shoes",
                    "Run faster with Nike's latest running shoes.",
                    "https://i.postimg.cc/T1wV3RxH/nike-shoes.jpg",
                    "FASHION,SPORTS",
                    Set.of(allProducts.get(8))
            );
            ads.add(ad7);

            Ad ad8 = new Ad(
                    "KitchenAid Mixer",
                    "Your perfect kitchen companion for baking and cooking.",
                    "https://i.postimg.cc/QNwPFPpz/kitchenaid-mixer.jpg",
                    "HOME,FOOD",
                    Set.of(allProducts.get(9), allProducts.get(10))
            );
            ads.add(ad8);

            Ad ad9 = new Ad(
                    "Dell XPS 13 Laptop",
                    "Powerful performance in a sleek and portable design.",
                    "https://i.postimg.cc/YCH7msJm/dell-laptop.jpg",
                    "ELECTRONICS",
                    Set.of(allProducts.get(11))
            );
            ads.add(ad9);

            Ad ad10 = new Ad(
                    "Dyson Airwrap",
                    "Effortless styling with Dyson's advanced hair tool.",
                    "https://i.postimg.cc/MT7X7q89/dyson-airwrap.jpg",
                    "FASHION,HOME",
                    Set.of(allProducts.get(12), allProducts.get(13))
            );
            ads.add(ad10);

            // 保存广告到数据库
            adRepository.saveAll(ads);
            System.out.println("Ads populated successfully!");
        } else {
            System.out.println("Ads already initialized.");
        }

    }
}

