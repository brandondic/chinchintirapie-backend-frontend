package com.bootcamp.chinchintirapie.task.controller;

import com.bootcamp.chinchintirapie.task.dto.TaskRequestDto;
import com.bootcamp.chinchintirapie.task.dto.TaskResponseDto;
import com.bootcamp.chinchintirapie.task.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponseDto create(@Valid @RequestBody TaskRequestDto request) {
        return taskService.create(request);
    }

    @GetMapping
    public List<TaskResponseDto> findAll() {
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public TaskResponseDto findById(@PathVariable Long id) {
        return taskService.findById(id);
    }

    @GetMapping("/user/{userId}")
    public List<TaskResponseDto> findByUserId(@PathVariable Long userId) {
        return taskService.findByUserId(userId);
    }

    @PatchMapping("/{id}/toggle")
    public TaskResponseDto toggleCompleted(@PathVariable Long id) {
        return taskService.toggleCompleted(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.delete(id);
    }
}
