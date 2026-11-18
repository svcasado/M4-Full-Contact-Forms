const API_URL = import.meta.env.VITE_API_URL;

// Capa de servicios: el único sitio que conoce la red
export async function obtenerVoluntarios() {
  const respuesta = await fetch(`${API_URL}/voluntarios`);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar la lista (error ${respuesta.status})`);
  }
  return respuesta.json();
}

export async function crearVoluntario(nuevo) {
  const respuesta = await fetch(`${API_URL}/voluntarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo),
  });
  if (!respuesta.ok) {
    throw new Error(`No se pudo completar el registro (error ${respuesta.status})`);
  }
  return respuesta.json();
}
