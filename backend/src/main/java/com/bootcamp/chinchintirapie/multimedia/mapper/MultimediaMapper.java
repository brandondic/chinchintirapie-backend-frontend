package com.bootcamp.chinchintirapie.multimedia.mapper;

import com.bootcamp.chinchintirapie.multimedia.dto.MultimediaResponseDto;
import com.bootcamp.chinchintirapie.multimedia.model.MultimediaEntity;

public class MultimediaMapper {

    private MultimediaMapper() {
    }

    public static MultimediaResponseDto toResponseDto(MultimediaEntity multimedia) {
        return new MultimediaResponseDto(
                multimedia.getId(),
                multimedia.getTitle(),
                multimedia.getUrl(),
                multimedia.getDescription(),
                multimedia.getThumbnailUrl(),
                multimedia.getYear(),
                multimedia.getType(),
                multimedia.getCategories(),
                multimedia.getAuthor(),
                multimedia.getUploadedAt(),
                multimedia.getUpdatedAt(),
                multimedia.getUploadedBy().getId(),
                multimedia.getUploadedBy().getEmail()
        );
    }
}
