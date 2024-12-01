package org.lei.personalized_advertisement_system.repository;

import org.lei.personalized_advertisement_system.entity.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    List<Ad> findTop10ByOrderByClicksDesc();
    List<Ad> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String title, String description);
}
