package org.lei.personalized_advertisement_system.service.impl;

import org.lei.personalized_advertisement_system.DTO.AdDTO;
import org.lei.personalized_advertisement_system.DTO.ProductDTO;
import org.lei.personalized_advertisement_system.entity.Ad;
import org.lei.personalized_advertisement_system.entity.Product;
import org.lei.personalized_advertisement_system.repository.AdRepository;
import org.lei.personalized_advertisement_system.repository.ProductRepository;
import org.lei.personalized_advertisement_system.service.AdService;
import org.lei.personalized_advertisement_system.service.ProductService;
import org.lei.personalized_advertisement_system.service.UserService;
import org.lei.personalized_advertisement_system.util.StringToListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AdServiceImpl implements AdService {

    @Autowired
    private AdRepository adRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @Override
    public AdDTO createAd(AdDTO adDTO) {
        Ad ad = mapToEntity(adDTO);
        Ad savedAd = adRepository.save(ad);
        return mapToDTO(savedAd);
    }

    @Override
    public AdDTO updateAd(AdDTO adDTO) {
        Ad existAd = adRepository.findById(adDTO.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Ad with id " + adDTO.getId() + " not found"));

        if (adDTO.getTitle() != null) {
            existAd.setTitle(adDTO.getTitle());
        }
        if (adDTO.getDescription() != null) {
            existAd.setDescription(adDTO.getDescription());
        }
        if (adDTO.getCategories() != null && !adDTO.getCategories().isEmpty()) {
            existAd.setCategories(String.join(",", adDTO.getCategories()));
        }
        if (adDTO.getImage() != null) {
            existAd.setImage(adDTO.getImage());
        }
        if (adDTO.getProducts() != null) {
            Set<Long> productIds = adDTO.getProducts().stream().map(ProductDTO::getId).collect(Collectors.toSet());
            List<Product> products = productRepository.findAllById(productIds);
            if (products.size() != productIds.size()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Some product IDs are invalid.");
            }
            existAd.setProducts(new HashSet<>(products));
        }

        Ad updatedAd = adRepository.save(existAd);
        return mapToDTO(updatedAd);
    }

    @Override
    public AdDTO getAdById(Long id) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with id " + id + " not found"));
        return mapToDTO(ad);
    }

    @Override
    public Page<AdDTO> getAllAds(int page, int size) {
        return adRepository.findAll(PageRequest.of(page, size))
                .map(this::mapToDTO);
    }

    @Override
    public void deleteAd(Long id) {
        adRepository.deleteById(id);
    }

    @Override
    public List<AdDTO> getRecommendedAds() {
        List<String> userPreferences = userService.getPreferencesByUsername(userService.getCurrentUser().getUsername());

        List<AdDTO> recommendedAds = adRepository.findAll().stream()
                .filter(ad -> {
                    List<String> adCategories = StringToListUtil.toList(ad.getCategories());
                    return userPreferences.stream().anyMatch(adCategories::contains);
                })
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        if (recommendedAds.size() < 5) {
            int adsToAdd = 5 - recommendedAds.size();

            List<Long> existingAdIds = recommendedAds.stream()
                    .map(AdDTO::getId)
                    .toList();

            List<AdDTO> additionalAds = adRepository.findAll().stream()
                    .filter(ad -> !existingAdIds.contains(ad.getId()))
                    .limit(adsToAdd)
                    .map(this::mapToDTO)
                    .toList();

            recommendedAds.addAll(additionalAds);
        }

        return recommendedAds;
    }


    @Override
    public List<AdDTO> getPopularAds() {
        return adRepository.findTop5ByOrderByClicksDesc().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void incrementAdClicks(Long adId) {
        Ad ad = adRepository.findById(adId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad with id " + adId + " not found"));
        ad.setClicks(ad.getClicks() + 1);
        adRepository.save(ad);
    }

    private Ad mapToEntity(AdDTO adDTO) {
        Ad ad = new Ad();
        ad.setId(adDTO.getId());
        ad.setTitle(adDTO.getTitle());
        ad.setDescription(adDTO.getDescription());
        ad.setImage(adDTO.getImage());
        ad.setCategories(adDTO.getCategories() != null ? String.join(",", adDTO.getCategories()) : null);
        if (adDTO.getProducts() != null) {
            List<Long> productIds = adDTO.getProducts().stream().map(ProductDTO::getId).collect(Collectors.toList());
            List<Product> products = productRepository.findAllById(productIds);
            ad.setProducts(new HashSet<>(products));
        }
        return ad;
    }

    private AdDTO mapToDTO(Ad ad) {
        AdDTO adDTO = new AdDTO();
        adDTO.setId(ad.getId());
        adDTO.setTitle(ad.getTitle());
        adDTO.setDescription(ad.getDescription());
        adDTO.setImage(ad.getImage());
        adDTO.setCategories(StringToListUtil.toList(ad.getCategories()));
        adDTO.setClicks(ad.getClicks());
        adDTO.setProducts(ad.getProducts() != null ? ad.getProducts().stream().map(product -> productService.convertToProductDTO(product)).collect(Collectors.toSet()) : Set.of());
        return adDTO;
    }
}
