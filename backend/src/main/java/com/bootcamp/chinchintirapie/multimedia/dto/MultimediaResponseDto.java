package com.bootcamp.chinchintirapie.multimedia.dto;

import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;

import java.time.LocalDateTime;
import java.util.List;

public record MultimediaResponseDto(
        Long id,
        String title,
        String url,
        String description,
        String thumbnailUrl,
        String year,
        MultimediaType type,
        List<String> categories,
        String author,
        LocalDateTime uploadedAt,
        LocalDateTime updatedAt,
        Long authorId,
        String authorEmail
) {
}
