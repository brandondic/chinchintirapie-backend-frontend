package com.bootcamp.chinchintirapie.multimedia.service;

import com.bootcamp.chinchintirapie.multimedia.dto.MultimediaRequestDto;
import com.bootcamp.chinchintirapie.multimedia.dto.MultimediaResponseDto;
import com.bootcamp.chinchintirapie.multimedia.mapper.MultimediaMapper;
import com.bootcamp.chinchintirapie.multimedia.model.MultimediaEntity;
import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;
import com.bootcamp.chinchintirapie.multimedia.repository.MultimediaRepository;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import com.bootcamp.chinchintirapie.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MultimediaService {

    private final MultimediaRepository multimediaRepository;
    private final UserRepository userRepository;

    @Transactional
    public MultimediaResponseDto create(MultimediaRequestDto request) {
        UserEntity user = userRepository.findById(request.authorId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + request.authorId()));

        MultimediaEntity multimedia = MultimediaEntity.builder()
                .title(request.title())
                .url(request.url())
                .description(request.description())
                .year(request.year())
                .type(request.type())
                .categories(
                        request.categories() != null
                                ? new ArrayList<>(request.categories())
                                : new ArrayList<>()
                )
                .galleryUrls(
                        request.galleryUrls() != null
                                ? new ArrayList<>(request.galleryUrls())
                                : new ArrayList<>()
                )
                .thumbnailUrl(request.thumbnailUrl())
                .author(request.author())
                .uploadedBy(user)
                .build();

        MultimediaEntity saved = multimediaRepository.save(multimedia);
        return MultimediaMapper.toResponseDto(saved);
    }

    public List<MultimediaResponseDto> findAll() {
        return multimediaRepository.findAll()
                .stream()
                .map(MultimediaMapper::toResponseDto)
                .toList();
    }

    public MultimediaResponseDto findById(Long id) {
        return multimediaRepository.findById(id)
                .map(MultimediaMapper::toResponseDto)
                .orElseThrow(() -> new RuntimeException("Multimedia no encontrada con ID: " + id));
    }

    public List<MultimediaResponseDto> findByType(MultimediaType type) {
        return multimediaRepository.findByType(type)
                .stream()
                .map(MultimediaMapper::toResponseDto)
                .toList();
    }

    /**
     * Obtener lista de categorías únicas, opcionalmente filtradas por tipo.
     */
    public List<String> getCategories(MultimediaType type) {
        if (type != null) {
            return multimediaRepository.findDistinctCategoriesByType(type);
        }
        return multimediaRepository.findDistinctCategories();
    }

    /**
     * Buscar multimedia por tipo y categoría.
     */
    public List<MultimediaResponseDto> findByTypeAndCategory(MultimediaType type, String category) {
        return multimediaRepository.findByTypeAndCategory(type, category)
                .stream()
                .map(MultimediaMapper::toResponseDto)
                .toList();
    }

    @Transactional
    public MultimediaResponseDto update(Long id, MultimediaRequestDto request) {


        MultimediaEntity multimedia = multimediaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Multimedia no encontrada con ID: " + id));

        System.out.println("PASO 2");

        multimedia.setTitle(request.title());
        multimedia.setUrl(request.url());
        multimedia.setDescription(request.description());
        multimedia.setYear(request.year());
        multimedia.setType(request.type());
        multimedia.setCategories(
                request.categories() != null
                        ? new ArrayList<>(request.categories())
                        : new ArrayList<>()
        );

        multimedia.setGalleryUrls(
                request.galleryUrls() != null
                        ? new ArrayList<>(request.galleryUrls())
                        : new ArrayList<>()
        );
        multimedia.setThumbnailUrl(request.thumbnailUrl());
        multimedia.setAuthor(request.author());

        MultimediaEntity saved =
                multimediaRepository.save(multimedia);


        return MultimediaMapper.toResponseDto(saved);


    }

    @Transactional
    public void delete(Long id) {
        if (!multimediaRepository.existsById(id)) {
            throw new RuntimeException("Multimedia no encontrada con ID: " + id);
        }
        multimediaRepository.deleteById(id);
    }
}
