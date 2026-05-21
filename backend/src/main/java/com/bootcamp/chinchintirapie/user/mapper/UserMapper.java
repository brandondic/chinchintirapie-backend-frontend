package com.bootcamp.chinchintirapie.user.mapper;

import com.bootcamp.chinchintirapie.user.dto.UserResponseDto;
import com.bootcamp.chinchintirapie.user.model.UserEntity;

public class UserMapper {

    private UserMapper() {
    }

    public static UserResponseDto toResponseDto(UserEntity user) {
        return new UserResponseDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt(),
                user.getLastLogin(),
                user.isEnabled()
        );
    }
}
