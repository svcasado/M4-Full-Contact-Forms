import { z } from "zod";

export const esquemaVoluntario = z
  .object({
    nombre: z.string().min(2, "El nombre es demasiado corto"),
    email: z.email("Email no válido"),
    edad: z.coerce.number().int("La edad debe ser un número entero").min(16, "Indica tu edad (mínimo 16 años)"),
    turno: z.enum(["mañana", "tarde"], { error: "Elige un turno" }),
    aceptaNormas: z.literal(true, { error: "Debes aceptar las normas del voluntariado" }),
  })
  .refine((datos) => datos.edad >= 18 || datos.turno === "mañana", {
    error: "Los menores de 18 solo pueden elegir el turno de mañana",
    path: ["turno"], // el error se muestra en el campo turno
  });
