import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { esquemaVoluntario } from "../schemas/voluntario";
import { crearVoluntario } from "../services/voluntarios";

function FormularioVoluntario() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(esquemaVoluntario),
    defaultValues: { nombre: "", email: "", edad: "", turno: "", aceptaNormas: false },
  });

  const mutacion = useMutation({
    mutationFn: crearVoluntario,
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["voluntarios"] });
    },
  });

  return (
    <form onSubmit={handleSubmit((datos) => mutacion.mutate(datos))} noValidate>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? "error-nombre" : undefined}
          {...register("nombre")}
        />
        {errors.nombre && <p id="error-nombre" className="error" role="alert">{errors.nombre.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "error-email" : undefined}
          {...register("email")}
        />
        {errors.email && <p id="error-email" className="error" role="alert">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="edad">Edad</label>
        <input
          id="edad"
          type="number"
          aria-invalid={!!errors.edad}
          aria-describedby={errors.edad ? "error-edad" : undefined}
          {...register("edad")}
        />
        {errors.edad && <p id="error-edad" className="error" role="alert">{errors.edad.message}</p>}
      </div>

      <div>
        <label htmlFor="turno">Turno</label>
        <select
          id="turno"
          aria-invalid={!!errors.turno}
          aria-describedby={errors.turno ? "error-turno" : undefined}
          {...register("turno")}
        >
          <option value="">Elige un turno</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
        </select>
        {errors.turno && <p id="error-turno" className="error" role="alert">{errors.turno.message}</p>}
      </div>

      <div>
        <input
          id="aceptaNormas"
          type="checkbox"
          aria-invalid={!!errors.aceptaNormas}
          aria-describedby={errors.aceptaNormas ? "error-aceptaNormas" : undefined}
          {...register("aceptaNormas")}
        />
        <label htmlFor="aceptaNormas">Acepto las normas del voluntariado</label>
        {errors.aceptaNormas && <p id="error-aceptaNormas" className="error" role="alert">{errors.aceptaNormas.message}</p>}
      </div>

      <button disabled={mutacion.isPending}>
        {mutacion.isPending ? "Registrando…" : "Registrarme"}
      </button>

      {mutacion.isError && <p role="alert">{mutacion.error.message}</p>}
      {mutacion.isSuccess && <p role="status">¡Registro completado! Gracias por ayudar.</p>}
    </form>
  );
}

export default FormularioVoluntario;
