package com.bootcamp.chinchintirapie.contacto.controller;

import com.bootcamp.chinchintirapie.contacto.dto.ContactoRequestDto;
import com.bootcamp.chinchintirapie.contacto.dto.ContactoResponseDto;
import com.bootcamp.chinchintirapie.contacto.service.ContactoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacto")
@RequiredArgsConstructor
public class ContactoController {

    private final ContactoService contactoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactoResponseDto create(@Valid @RequestBody ContactoRequestDto request) {
        return contactoService.create(request);
    }
}
