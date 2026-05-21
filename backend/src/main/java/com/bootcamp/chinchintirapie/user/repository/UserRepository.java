package com.bootcamp.chinchintirapie.user.repository;

import com.bootcamp.chinchintirapie.user.model.Role;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    List<UserEntity> findByRole(Role role);

    List<UserEntity> findByEnabled(boolean enabled);
}
