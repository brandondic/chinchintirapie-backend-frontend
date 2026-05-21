package com.bootcamp.chinchintirapie.contacto.dto;

import java.time.LocalDateTime;

public record ContactoResponseDto(
        Long id,
        String nombre,
        String email,
        String telefono,
        String asunto,
        String mensaje,
        LocalDateTime createdAt
) {
}
