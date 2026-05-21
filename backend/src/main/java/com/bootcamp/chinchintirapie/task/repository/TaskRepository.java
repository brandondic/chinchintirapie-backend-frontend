package com.bootcamp.chinchintirapie.task.repository;

import com.bootcamp.chinchintirapie.task.model.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    List<TaskEntity> findByUserId(Long userId);

    List<TaskEntity> findByCompleted(boolean completed);

    List<TaskEntity> findByUserIdAndCompleted(Long userId, boolean completed);
}
