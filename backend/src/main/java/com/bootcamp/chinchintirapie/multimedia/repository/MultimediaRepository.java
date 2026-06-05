package com.bootcamp.chinchintirapie.multimedia.repository;

import com.bootcamp.chinchintirapie.multimedia.model.MultimediaEntity;
import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MultimediaRepository extends JpaRepository<MultimediaEntity, Long> {

    List<MultimediaEntity> findByType(MultimediaType type);

    List<MultimediaEntity> findByUploadedById(Long authorId);

    /**
     * Obtener todas las categorías distintas de todos los multimedia.
     */
    @Query("SELECT DISTINCT c FROM MultimediaEntity m JOIN m.categories c ORDER BY c")
    List<String> findDistinctCategories();

    /**
     * Obtener categorías distintas filtradas por tipo de multimedia.
     */
    @Query("SELECT DISTINCT c FROM MultimediaEntity m JOIN m.categories c WHERE m.type = :type ORDER BY c")
    List<String> findDistinctCategoriesByType(@Param("type") MultimediaType type);

    /**
     * Buscar multimedia por tipo y que contenga una categoría específica.
     */
    @Query("SELECT m FROM MultimediaEntity m JOIN m.categories c WHERE m.type = :type AND c = :category")
    List<MultimediaEntity> findByTypeAndCategory(@Param("type") MultimediaType type, @Param("category") String category);
}
