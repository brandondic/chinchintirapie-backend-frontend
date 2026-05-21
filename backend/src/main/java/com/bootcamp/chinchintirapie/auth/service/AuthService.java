package com.bootcamp.chinchintirapie.auth.service;

import com.bootcamp.chinchintirapie.auth.dto.AuthRequestDto;
import com.bootcamp.chinchintirapie.auth.dto.AuthResponseDto;
import com.bootcamp.chinchintirapie.auth.dto.RegisterRequestDto;
import com.bootcamp.chinchintirapie.security.service.JwtService;
import com.bootcamp.chinchintirapie.user.model.Role;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import com.bootcamp.chinchintirapie.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public java.util.Map<String, String> register(RegisterRequestDto request) {
        // Validar que el email no esté registrado
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("El correo ya está registrado");
        }

        // Crear el usuario con rol CLIENT por defecto
        UserEntity user = UserEntity.builder()
                .fullName(request.fullName())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(Role.CLIENT)
                .enabled(true)
                .build();

        userRepository.save(user);

        return java.util.Map.of("message", "Usuario registrado con éxito");
    }

    @Transactional
    public AuthResponseDto login(AuthRequestDto request) {
        // Autenticar credenciales
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // Buscar usuario
        UserEntity user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Verificar que el usuario esté habilitado
        if (!user.isEnabled()) {
            throw new RuntimeException("La cuenta está deshabilitada. Contacte al administrador.");
        }

        // Actualizar último login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Generar token JWT
        User springUser = new User(
                user.getEmail(),
                user.getPassword(),
                List.of(() -> "ROLE_" + user.getRole().name())
        );

        String token = jwtService.generateToken(springUser);

        return new AuthResponseDto(
                "Login exitoso",
                token,
                "Bearer",
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
