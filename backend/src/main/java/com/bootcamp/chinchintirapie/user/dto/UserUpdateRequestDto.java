package com.bootcamp.chinchintirapie.user.dto;

import com.bootcamp.chinchintirapie.user.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateRequestDto(
        @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
        String fullName,

        @Email(message = "El correo no tiene un formato válido")
        String email,

        @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
        String password,

        Role role
) {
}
