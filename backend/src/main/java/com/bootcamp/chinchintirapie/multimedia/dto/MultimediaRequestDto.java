package com.bootcamp.chinchintirapie.multimedia.dto;

import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record MultimediaRequestDto(
        @NotBlank(message = "El título es obligatorio")
        String title,

        @NotBlank(message = "La URL es obligatoria")
        String url,

        String description,

        String year,

        @NotNull(message = "El tipo es obligatorio")
        MultimediaType type,

        List<String> categories,

        @NotBlank(message = "El autor es obligatorio")
        String author,

        @NotNull(message = "El ID del usuario es obligatorio")
        Long authorId
) {
}
