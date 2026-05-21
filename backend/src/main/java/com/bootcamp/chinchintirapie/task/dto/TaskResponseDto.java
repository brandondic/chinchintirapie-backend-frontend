package com.bootcamp.chinchintirapie.task.dto;

import java.time.LocalDateTime;

public record TaskResponseDto(
        Long id,
        String title,
        String description,
        boolean completed,
        LocalDateTime createdAt,
        LocalDateTime completedAt,
        Long userId,
        String userEmail
) {
}
