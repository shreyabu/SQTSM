package org.lei.personalized_advertisement_system.service;

import org.lei.personalized_advertisement_system.DTO.AdDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdService {

    /**
     * 创建广告
     * @param adDTO 广告数据传输对象
     * @return 创建的广告
     */
    AdDTO createAd(AdDTO adDTO);

    /**
     * 更新广告
     * @param adDTO 广告数据传输对象
     * @return 更新后的广告
     */
    AdDTO updateAd(AdDTO adDTO);

    /**
     * 根据ID获取广告
     * @param id 广告ID
     * @return 广告数据传输对象
     */
    AdDTO getAdById(Long id);

    /**
     * 获取分页广告列表
     * @param page 当前页码
     * @param size 每页大小
     * @return 广告分页结果
     */
    Page<AdDTO> getAllAds(int page, int size);

    /**
     * 删除广告
     * @param id 广告ID
     */
    void deleteAd(Long id);

    /**
     * 获取推荐广告列表
     * @return 推荐广告列表
     */
    List<AdDTO> getRecommendedAds();

    /**
     * 获取最受欢迎广告列表
     * @return 最受欢迎广告列表
     */
    List<AdDTO> getPopularAds();

    void incrementAdClicks(Long adId);
}
