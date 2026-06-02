package com.bootcamp.chinchintirapie.articulo.dto;

import com.bootcamp.chinchintirapie.articulo.model.ArticuloType;

import java.time.LocalDateTime;

public record ArticuloResponseDto(
        Long id,
        String title,
        String description,
        String urlPhoto,
        String body,
        ArticuloType type,
        String author,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long authorId,
        String authorEmail
) {
}
