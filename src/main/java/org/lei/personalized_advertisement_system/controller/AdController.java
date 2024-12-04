package org.lei.personalized_advertisement_system.controller;

import jakarta.annotation.security.RolesAllowed;
import org.lei.personalized_advertisement_system.DTO.AdDTO;
import org.lei.personalized_advertisement_system.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ad")
public class AdController {

    @Autowired
    private AdService adService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<AdDTO> createAd(@RequestBody AdDTO adDTO) {
        AdDTO savedAd = adService.createAd(adDTO);
        return ResponseEntity.ok(savedAd);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<AdDTO> updateAd(@RequestBody AdDTO adDTO) {
        AdDTO savedAd = adService.updateAd(adDTO);
        return ResponseEntity.ok(savedAd);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdDTO> getAdById(@PathVariable Long id) {
        AdDTO adDTO = adService.getAdById(id);
        return ResponseEntity.ok(adDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Page<AdDTO>> getAllAds(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<AdDTO> adsPage = adService.getAllAds(page, size);
        return ResponseEntity.ok(adsPage);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAd(@PathVariable Long id) {
        adService.deleteAd(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/click/{id}")
    public ResponseEntity<String> incrementClicks(@PathVariable Long id) {
        adService.incrementAdClicks(id);
        return ResponseEntity.ok("Click count updated successfully.");
    }
}
