package com.bootcamp.chinchintirapie.multimedia.repository;

import com.bootcamp.chinchintirapie.multimedia.model.MultimediaEntity;
import com.bootcamp.chinchintirapie.multimedia.model.MultimediaType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MultimediaRepository extends JpaRepository<MultimediaEntity, Long> {

    List<MultimediaEntity> findByType(MultimediaType type);

    List<MultimediaEntity> findByUploadedById(Long authorId);
}
