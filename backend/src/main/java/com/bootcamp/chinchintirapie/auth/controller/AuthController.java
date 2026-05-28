package com.bootcamp.chinchintirapie.auth.controller;

import com.bootcamp.chinchintirapie.auth.dto.AuthRequestDto;
import com.bootcamp.chinchintirapie.auth.dto.AuthResponseDto;
import com.bootcamp.chinchintirapie.auth.dto.RegisterRequestDto;
import com.bootcamp.chinchintirapie.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public java.util.Map<String, String> register(@Valid @RequestBody RegisterRequestDto request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponseDto login(@Valid @RequestBody AuthRequestDto request) {
        return authService.login(request);
    }

    @PostMapping("/forgot-password")
    public java.util.Map<String, String> forgotPassword(@RequestBody java.util.Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("El correo es requerido");
        }
        return authService.forgotPassword(email);
    }

    @PostMapping("/reset-password")
    public java.util.Map<String, String> resetPassword(@RequestBody java.util.Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        
        if (token == null || token.isBlank() || newPassword == null || newPassword.isBlank()) {
            throw new IllegalArgumentException("Token y nueva contraseña son requeridos");
        }
        
        return authService.resetPassword(token, newPassword);
    }
}
