import FormularioVoluntario from "./components/FormularioVoluntario";
import ListaVoluntarios from "./components/ListaVoluntarios";

function App() {
  return (
    <main>
      <h1>Voluntarios del banco de alimentos</h1>

      <h2>Hazte voluntario</h2>
      <FormularioVoluntario />

      <h2>Voluntarios registrados</h2>
      <ListaVoluntarios />
    </main>
  );
}

export default App;
