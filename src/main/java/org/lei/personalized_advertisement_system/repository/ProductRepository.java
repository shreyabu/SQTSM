package org.lei.personalized_advertisement_system.repository;

import org.lei.personalized_advertisement_system.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE "
            + "LOWER(p.categories) LIKE LOWER(CONCAT('%', :category, '%'))")
    List<Product> findProductsByCategory(@Param("category") String category, Pageable pageable);



    @Query("SELECT p FROM Product p WHERE p.id NOT IN :existingIds ORDER BY p.sales DESC")
    List<Product> findAdditionalProducts(@Param("existingIds") Collection<Long> existingIds, Pageable pageable);


    List<Product> findTop12ByOrderBySalesDesc();
}

