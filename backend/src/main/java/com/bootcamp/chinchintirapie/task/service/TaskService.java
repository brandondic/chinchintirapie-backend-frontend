package com.bootcamp.chinchintirapie.task.service;

import com.bootcamp.chinchintirapie.task.dto.TaskRequestDto;
import com.bootcamp.chinchintirapie.task.dto.TaskResponseDto;
import com.bootcamp.chinchintirapie.task.mapper.TaskMapper;
import com.bootcamp.chinchintirapie.task.model.TaskEntity;
import com.bootcamp.chinchintirapie.task.repository.TaskRepository;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import com.bootcamp.chinchintirapie.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Transactional
    public TaskResponseDto create(TaskRequestDto request) {
        UserEntity user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + request.userId()));

        TaskEntity task = TaskEntity.builder()
                .title(request.title())
                .description(request.description())
                .completed(false)
                .user(user)
                .build();

        TaskEntity savedTask = taskRepository.save(task);

        return TaskMapper.toResponseDto(savedTask);
    }

    public List<TaskResponseDto> findAll() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toResponseDto)
                .toList();
    }

    public TaskResponseDto findById(Long id) {
        return taskRepository.findById(id)
                .map(TaskMapper::toResponseDto)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID: " + id));
    }

    public List<TaskResponseDto> findByUserId(Long userId) {
        return taskRepository.findByUserId(userId)
                .stream()
                .map(TaskMapper::toResponseDto)
                .toList();
    }

    @Transactional
    public TaskResponseDto toggleCompleted(Long id) {
        TaskEntity task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada con ID: " + id));

        task.setCompleted(!task.isCompleted());
        task.setCompletedAt(task.isCompleted() ? LocalDateTime.now() : null);

        TaskEntity savedTask = taskRepository.save(task);
        return TaskMapper.toResponseDto(savedTask);
    }

    @Transactional
    public void delete(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Tarea no encontrada con ID: " + id);
        }
        taskRepository.deleteById(id);
    }
}
