package com.bootcamp.chinchintirapie.articulo.controller;

import com.bootcamp.chinchintirapie.articulo.dto.ArticuloRequestDto;
import com.bootcamp.chinchintirapie.articulo.dto.ArticuloResponseDto;
import com.bootcamp.chinchintirapie.articulo.model.ArticuloType;
import com.bootcamp.chinchintirapie.articulo.service.ArticuloService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/articulos")
@RequiredArgsConstructor
public class ArticuloController {

    private final ArticuloService articuloService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ArticuloResponseDto create(@Valid @RequestBody ArticuloRequestDto request) {
        return articuloService.create(request);
    }

    @GetMapping
    public List<ArticuloResponseDto> findAll() {
        return articuloService.findAll();
    }

    @GetMapping("/{id}")
    public ArticuloResponseDto findById(@PathVariable Long id) {
        return articuloService.findById(id);
    }

    @GetMapping("/type/{type}")
    public List<ArticuloResponseDto> findByType(@PathVariable ArticuloType type) {
        return articuloService.findByType(type);
    }

    @PutMapping("/{id}")
    public ArticuloResponseDto update(@PathVariable Long id, @Valid @RequestBody ArticuloRequestDto request) {
        return articuloService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        articuloService.delete(id);
    }
}
