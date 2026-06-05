package com.bootcamp.chinchintirapie.multimedia.dto;

import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record MultimediaRequestDto(
        @NotBlank(message = "El título es obligatorio")
        @Size(max = 255, message = "El título no puede exceder 255 caracteres")
        String title,

        @NotBlank(message = "La URL es obligatoria")
        @Size(max = 1000, message = "La URL no puede exceder 1000 caracteres")
        String url,

        @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
        String description,

        @Size(max = 4, message = "El año no puede exceder 4 caracteres")
        String year,

        @NotNull(message = "El tipo es obligatorio")
        MultimediaType type,

        List<String> categories,

        List<String> galleryUrls,

        @Size(max = 1000, message = "La URL de la portada no puede exceder 1000 caracteres")
        String thumbnailUrl,

        @NotBlank(message = "El autor es obligatorio")
        @Size(max = 255, message = "El autor no puede exceder 255 caracteres")
        String author,

        @NotNull(message = "El ID del usuario es obligatorio")
        Long authorId
) {
}
