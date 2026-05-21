package com.bootcamp.chinchintirapie.contacto.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactoRequestDto(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,

        @NotBlank(message = "El correo electrónico es obligatorio")
        @Email(message = "El correo electrónico debe ser válido")
        String email,

        @NotBlank(message = "El teléfono es obligatorio")
        String telefono,

        @NotBlank(message = "El asunto es obligatorio")
        String asunto,

        @NotBlank(message = "El mensaje es obligatorio")
        @Size(max = 1000, message = "El mensaje no puede superar los 1000 caracteres")
        String mensaje
) {
}
