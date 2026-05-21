package com.bootcamp.chinchintirapie.contacto.repository;

import com.bootcamp.chinchintirapie.contacto.model.ContactoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactoRepository extends JpaRepository<ContactoEntity, Long> {
}
