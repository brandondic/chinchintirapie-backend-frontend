package com.bootcamp.chinchintirapie.user.service;

import com.bootcamp.chinchintirapie.user.dto.UserResponseDto;
import com.bootcamp.chinchintirapie.user.dto.UserUpdateRequestDto;
import com.bootcamp.chinchintirapie.user.mapper.UserMapper;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import com.bootcamp.chinchintirapie.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponseDto> findAll() {
        return userRepository.findAll()
                .stream()
                .map(UserMapper::toResponseDto)
                .toList();
    }

    public UserResponseDto findById(Long id) {
        return userRepository.findById(id)
                .map(UserMapper::toResponseDto)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));
    }

    public UserResponseDto findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(UserMapper::toResponseDto)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con email: " + email));
    }

    @Transactional
    public UserResponseDto update(Long id, UserUpdateRequestDto request) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        if (request.fullName() != null && !request.fullName().isBlank()) {
            user.setFullName(request.fullName());
        }
        if (request.email() != null && !request.email().isBlank()) {
            // Verificar que el nuevo email no esté en uso por otro usuario
            if (!user.getEmail().equals(request.email()) && userRepository.existsByEmail(request.email())) {
                throw new RuntimeException("El correo ya está en uso por otro usuario");
            }
            user.setEmail(request.email());
        }
        if (request.password() != null && !request.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.password()));
        }
        if (request.role() != null) {
            user.setRole(request.role());
        }

        UserEntity updatedUser = userRepository.save(user);
        return UserMapper.toResponseDto(updatedUser);
    }

    @Transactional
    public void toggleEnabled(Long id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + id));

        user.setEnabled(!user.isEnabled());
        userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado con ID: " + id);
        }
        userRepository.deleteById(id);
    }
}
