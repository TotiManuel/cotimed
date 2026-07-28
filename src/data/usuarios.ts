// src/data/usuarios.ts

import type { Usuario } from "../types/Usuario";

export const usuarios: Usuario[] = [
  {
    id: 1,
    nombre: "Administrador",
    apellido: "Sistema",
    email: "admin@medmarket.com",
    telefono: "3510000000",
    password: "admin123",
    rol: "ADMIN",
    estado: "ACTIVO",
    fotoPerfil: "",
    fechaCreacion: new Date("2026-01-01"),
    ultimoAcceso: new Date(),
  },

  {
    id: 2,
    nombre: "Hospital",
    apellido: "Central",
    email: "institucion@medmarket.com",
    telefono: "3511111111",
    password: "institucion123",
    rol: "INSTITUCION",
    estado: "ACTIVO",
    fotoPerfil: "",
    fechaCreacion: new Date("2026-01-02"),
    ultimoAcceso: new Date(),
  },

  {
    id: 3,
    nombre: "MedTech",
    apellido: "Proveedor",
    email: "proveedor@medmarket.com",
    telefono: "3512222222",
    password: "proveedor123",
    rol: "PROVEEDOR",
    estado: "ACTIVO",
    fotoPerfil: "",
    fechaCreacion: new Date("2026-01-03"),
    ultimoAcceso: new Date(),
  },

  {
    id: 4,
    nombre: "Juan",
    apellido: "Pérez",
    email: "empleado@medmarket.com",
    telefono: "3513333333",
    password: "empleado123",
    rol: "EMPLEADO",
    estado: "ACTIVO",
    fotoPerfil: "",
    fechaCreacion: new Date("2026-01-04"),
    ultimoAcceso: new Date(),
  },
];