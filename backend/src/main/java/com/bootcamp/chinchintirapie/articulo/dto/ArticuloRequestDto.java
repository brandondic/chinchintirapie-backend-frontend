package com.bootcamp.chinchintirapie.articulo.dto;

import com.bootcamp.chinchintirapie.articulo.model.ArticuloType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ArticuloRequestDto(
        @NotBlank(message = "El título es obligatorio")
        String title,

        String description,

        String urlPhoto,

        @NotBlank(message = "El cuerpo del artículo es obligatorio")
        String body,

        @NotNull(message = "El tipo es obligatorio")
        ArticuloType type,

        @NotBlank(message = "El autor es obligatorio")
        String author,

        @NotNull(message = "El ID del usuario es obligatorio")
        Long authorId
) {
}
