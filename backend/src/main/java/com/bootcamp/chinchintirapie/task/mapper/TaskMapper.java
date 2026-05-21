package com.bootcamp.chinchintirapie.task.mapper;

import com.bootcamp.chinchintirapie.task.dto.TaskResponseDto;
import com.bootcamp.chinchintirapie.task.model.TaskEntity;

public class TaskMapper {

    private TaskMapper() {
    }

    public static TaskResponseDto toResponseDto(TaskEntity task) {
        return new TaskResponseDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getCreatedAt(),
                task.getCompletedAt(),
                task.getUser().getId(),
                task.getUser().getEmail()
        );
    }
}
