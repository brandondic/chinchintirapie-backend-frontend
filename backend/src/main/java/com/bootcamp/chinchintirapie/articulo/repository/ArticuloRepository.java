package com.bootcamp.chinchintirapie.articulo.repository;

import com.bootcamp.chinchintirapie.articulo.model.ArticuloEntity;
import com.bootcamp.chinchintirapie.articulo.model.ArticuloType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticuloRepository extends JpaRepository<ArticuloEntity, Long> {

    List<ArticuloEntity> findByType(ArticuloType type);

    List<ArticuloEntity> findByUploadedById(Long authorId);
}
