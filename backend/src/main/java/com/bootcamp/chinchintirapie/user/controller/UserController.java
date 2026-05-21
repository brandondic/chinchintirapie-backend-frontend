package com.bootcamp.chinchintirapie.user.controller;

import com.bootcamp.chinchintirapie.user.dto.UserResponseDto;
import com.bootcamp.chinchintirapie.user.dto.UserUpdateRequestDto;
import com.bootcamp.chinchintirapie.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserResponseDto> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public UserResponseDto findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @GetMapping("/email/{email}")
    public UserResponseDto findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PutMapping("/{id}")
    public UserResponseDto update(
            @PathVariable Long id,
            @Valid @RequestBody UserUpdateRequestDto request
    ) {
        return userService.update(id, request);
    }

    @PatchMapping("/{id}/toggle-enabled")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void toggleEnabled(@PathVariable Long id) {
        userService.toggleEnabled(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
