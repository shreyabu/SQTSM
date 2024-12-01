package org.lei.personalized_advertisement_system.enums;

public enum ProductCategory {
    ELECTRONICS,
    FASHION,
    FOOD,
    SPORTS,
    MUSIC,
    BOOKS;


    @Override
    public String toString() {
        return switch (this) {
            case ELECTRONICS -> "Electronics";
            case FASHION -> "Fashion";
            case FOOD -> "Food";
            case SPORTS -> "Sports";
            case MUSIC -> "Music";
            case BOOKS -> "Books";
        };
    }
}
