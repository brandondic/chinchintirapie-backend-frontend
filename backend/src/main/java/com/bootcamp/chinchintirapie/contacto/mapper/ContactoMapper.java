package com.bootcamp.chinchintirapie.contacto.mapper;

import com.bootcamp.chinchintirapie.contacto.dto.ContactoResponseDto;
import com.bootcamp.chinchintirapie.contacto.model.ContactoEntity;

public class ContactoMapper {

    private ContactoMapper() {
    }

    public static ContactoResponseDto toResponseDto(ContactoEntity contacto) {
        return new ContactoResponseDto(
                contacto.getId(),
                contacto.getNombre(),
                contacto.getEmail(),
                contacto.getTelefono(),
                contacto.getAsunto(),
                contacto.getMensaje(),
                contacto.getCreatedAt()
        );
    }
}
