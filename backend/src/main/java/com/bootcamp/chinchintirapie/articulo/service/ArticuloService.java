package com.bootcamp.chinchintirapie.articulo.service;

import com.bootcamp.chinchintirapie.articulo.dto.ArticuloRequestDto;
import com.bootcamp.chinchintirapie.articulo.dto.ArticuloResponseDto;
import com.bootcamp.chinchintirapie.articulo.mapper.ArticuloMapper;
import com.bootcamp.chinchintirapie.articulo.model.ArticuloEntity;
import com.bootcamp.chinchintirapie.articulo.model.ArticuloType;
import com.bootcamp.chinchintirapie.articulo.repository.ArticuloRepository;
import com.bootcamp.chinchintirapie.user.model.UserEntity;
import com.bootcamp.chinchintirapie.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticuloService {

    private final ArticuloRepository articuloRepository;
    private final UserRepository userRepository;

    @Transactional
    public ArticuloResponseDto create(ArticuloRequestDto request) {
        UserEntity user = userRepository.findById(request.authorId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado con ID: " + request.authorId()));

        ArticuloEntity articulo = ArticuloEntity.builder()
                .title(request.title())
                .description(request.description())
                .urlPhoto(request.urlPhoto())
                .body(request.body())
                .type(request.type())
                .author(request.author())
                .uploadedBy(user)
                .build();

        ArticuloEntity saved = articuloRepository.save(articulo);
        return ArticuloMapper.toResponseDto(saved);
    }

    public List<ArticuloResponseDto> findAll() {
        return articuloRepository.findAll()
                .stream()
                .map(ArticuloMapper::toResponseDto)
                .toList();
    }

    public ArticuloResponseDto findById(Long id) {
        return articuloRepository.findById(id)
                .map(ArticuloMapper::toResponseDto)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado con ID: " + id));
    }

    public List<ArticuloResponseDto> findByType(ArticuloType type) {
        return articuloRepository.findByType(type)
                .stream()
                .map(ArticuloMapper::toResponseDto)
                .toList();
    }

    @Transactional
    public ArticuloResponseDto update(Long id, ArticuloRequestDto request) {
        ArticuloEntity articulo = articuloRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artículo no encontrado con ID: " + id));

        articulo.setTitle(request.title());
        articulo.setDescription(request.description());
        articulo.setUrlPhoto(request.urlPhoto());
        articulo.setBody(request.body());
        articulo.setType(request.type());
        articulo.setAuthor(request.author());

        ArticuloEntity saved = articuloRepository.save(articulo);
        return ArticuloMapper.toResponseDto(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!articuloRepository.existsById(id)) {
            throw new RuntimeException("Artículo no encontrado con ID: " + id);
        }
        articuloRepository.deleteById(id);
    }
}
