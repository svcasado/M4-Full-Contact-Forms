# Misión M4

M4 · Full Contact Forms

## Cómo probarlo

npm install
cp .env.example .env
npx json-server db.json --port 4000   # terminal 1
npm run dev                           # terminal 2

- Para probar los errores prueba a pulsar Registrarme con el formulario vacío
- La validacion cruzada puedes probarla poniendo 17 años y turno de tarde
- Error de red se puede probar parando json-server y recargando la página

## Estructura

```
src/
├── main.jsx # QueryClientProvider envolviendo <App />
├── App.jsx # formulario y lista
├── services/voluntarios.js # fetch a la API y control de errores
├── schemas/voluntario.js # reglas y mensajes
├── components/
│   ├── FormularioVoluntario.jsx # React Hook Form + zodResolver + useMutation
│   └── ListaVoluntarios.jsx # useQuery
└── index.css
```

## Uso de IA

Usé Claude Code (modelo Claude Opus 5.5).

Algunos prompts que he usado:

- ¿Puedes corregir lo que he hecho? ¿Hay algo que he pasado por alto o alguna mejora que le pueda hacer?
- ¿Puedes explicarme cómo puedo implementar esta parte en mi proyecto no se me ocurre ninguna idea para la validacion cruzada?
- ¿No entiendo esta parte me das un ejemplo mas sencillo para que lo pueda intentar yo solo?

Lo comprobé con npm run lint, npm run build y probando en el navegador todos los casos:

- Con el formulario vacío salen los cinco errores y el foco va al primer campo con error
- Con 17 años y turno de tarde, el error aparece en el campo turno
- Al registrar, en DevTools luego Network sale el POST y justo después el GET de la lista. El formulario se vacía y sale el mensaje de éxito. Luego miré el response tanto del GET como del POST y comprobé que todo cuadraba.
- Con json-server parado, la lista muestra el error y el formulario no pierde lo escrito

Lo que escribí a mano:

- He tratado de escribir todo a mano, incluso lo que ha generado Claude, para interiorizar conceptos y saber qué se estaba haciendo.Al ir haciendo las pruebas que he dicho iba viendo los problemas y lo iba arreglando poco a poco.

## Autopsia

1. El foco al primer campo con error lo pone React Hook Form por defecto al fallar la validación. La alternativa era llamar a setFocus a mano, como en el ejemplo de los apuntes. La descarté porque hace lo mismo con más código.

2. El botón se deshabilita con mutacion.isPending y no con isSubmitting. Envío con mutate, que no espera a la petición, así que isSubmitting se apagaría antes de que termine el POST. isPending dura lo mismo que la petición y evita el doble envío de verdad. La alternativa era usar isSubmitting, como en los ejemplos de los apuntes. La descarté porque dejaría el botón activo mientras la petición sigue en curso.
