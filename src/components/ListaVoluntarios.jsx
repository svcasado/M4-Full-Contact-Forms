import { useQuery } from "@tanstack/react-query";
import { obtenerVoluntarios } from "../services/voluntarios";

function ListaVoluntarios() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["voluntarios"],
    queryFn: obtenerVoluntarios,
  });

  if (isPending) return <p>Cargando voluntarios…</p>;
  if (isError) return <p role="alert">Error: {error.message}</p>;
  if (data.length === 0) return <p>Todavía no hay voluntarios registrados.</p>;

  return (
    <ul>
      {data.map((v) => (
        <li key={v.id}>
          {v.nombre} ({v.edad} años) · turno de {v.turno}
        </li>
      ))}
    </ul>
  );
}

export default ListaVoluntarios;
