package com.bootcamp.chinchintirapie.articulo.mapper;

import com.bootcamp.chinchintirapie.articulo.dto.ArticuloResponseDto;
import com.bootcamp.chinchintirapie.articulo.model.ArticuloEntity;

public class ArticuloMapper {

    private ArticuloMapper() {
    }

    public static ArticuloResponseDto toResponseDto(ArticuloEntity articulo) {
        return new ArticuloResponseDto(
                articulo.getId(),
                articulo.getTitle(),
                articulo.getDescription(),
                articulo.getUrlPhoto(),
                articulo.getBody(),
                articulo.getType(),
                articulo.getAuthor(),
                articulo.getCreatedAt(),
                articulo.getUploadedBy().getId(),
                articulo.getUploadedBy().getEmail()
        );
    }
}
