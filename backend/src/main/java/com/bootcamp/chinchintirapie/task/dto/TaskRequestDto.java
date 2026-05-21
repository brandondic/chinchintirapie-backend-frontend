package com.bootcamp.chinchintirapie.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskRequestDto(
        @NotBlank(message = "El título es obligatorio")
        String title,

        String description,

        @NotNull(message = "El usuario es obligatorio")
        Long userId
) {
}
