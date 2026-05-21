package com.bootcamp.chinchintirapie.user.dto;

import com.bootcamp.chinchintirapie.user.model.Role;

import java.time.LocalDateTime;

public record UserResponseDto(
        Long id,
        String fullName,
        String email,
        Role role,
        LocalDateTime createdAt,
        LocalDateTime lastLogin,
        boolean enabled
) {
}
