package com.bootcamp.chinchintirapie.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record GoogleAuthRequestDto(
        @NotBlank(message = "El token de Google es requerido")
        String token
) {}
