package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.AdDTO;

import java.util.List;

public interface AdService {
    List<AdDTO> getRecommendedAds(String username);
    List<AdDTO> getPopularAds();
    List<AdDTO> searchAds(String query);
    void recordClick(Long adId);
}
