package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.AdDTO;
import org.lei.personalized_advertisement_system.entity.Ad;
import org.lei.personalized_advertisement_system.repository.AdRepository;
import org.lei.personalized_advertisement_system.service.AdService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.StringToListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdServiceImpl implements AdService {

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private UserService userService;

    @Override
    public List<AdDTO> getRecommendedAds(String username) {
        List<String> preferences = userService.getPreferencesByUsername(username);
        return adRepository.findAll().stream()
                .filter(ad -> preferences.stream().anyMatch(preference -> ad.getCategories().contains(preference)))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AdDTO> getPopularAds() {
        return adRepository.findTop10ByOrderByClicksDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<AdDTO> searchAds(String query) {
        return adRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void recordClick(Long adId) {
        Ad ad = adRepository.findById(adId).orElseThrow(() -> new RuntimeException("Ad not found!"));
        ad.setClicks(ad.getClicks() + 1);
        adRepository.save(ad);
    }

    private AdDTO convertToDTO(Ad ad) {
        return new AdDTO(ad.getId(), ad.getTitle(), ad.getImage(), ad.getDescription(), StringToListUtil.toList(ad.getCategories()), ad.getPrice(), ad.getClicks());
    }
}

