package com.bootcamp.chinchintirapie.multimedia.controller;

import com.bootcamp.chinchintirapie.multimedia.dto.MultimediaRequestDto;
import com.bootcamp.chinchintirapie.multimedia.dto.MultimediaResponseDto;
import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;
import com.bootcamp.chinchintirapie.multimedia.service.MultimediaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/multimedia")
@RequiredArgsConstructor
public class MultimediaController {

    private final MultimediaService multimediaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MultimediaResponseDto create(@Valid @RequestBody MultimediaRequestDto request) {
        return multimediaService.create(request);
    }

    @GetMapping
    public List<MultimediaResponseDto> findAll() {
        return multimediaService.findAll();
    }

    @GetMapping("/{id}")
    public MultimediaResponseDto findById(@PathVariable Long id) {
        return multimediaService.findById(id);
    }

    @GetMapping("/type/{type}")
    public List<MultimediaResponseDto> findByType(@PathVariable MultimediaType type) {
        return multimediaService.findByType(type);
    }

    @PutMapping("/{id}")
    public MultimediaResponseDto update(@PathVariable Long id, @Valid @RequestBody MultimediaRequestDto request) {
        return multimediaService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        multimediaService.delete(id);
    }
}
