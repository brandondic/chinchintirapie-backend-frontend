package com.bootcamp.chinchintirapie.storage.model;

import lombok.Getter;

@Getter
public enum StorageFolder {
    NOTICIAS("noticias"),
    CRONICAS("cronicas"),
    REPOSITORIO("repositorio"),
    CEDOC("cedoc"),
    MATERIAL_EDUCATIVO("material_educativo"),
    USUARIOS("usuarios"),
    GENERAL("general");

    private final String path;

    StorageFolder(String path) {
        this.path = path;
    }
}
