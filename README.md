# Autotrónica Go Diag

Sitio web profesional de Autotrónica Go Diag, optimizado para mobile y preparado para desplegarse en Vercel.

Incluye un asistente virtual conversacional (botón flotante con el logo, reemplaza el botón de WhatsApp suelto) que responde con la información real del sitio, va recolectando los datos del caso de forma natural y, cuando ya tiene lo necesario, muestra un botón premium para continuar la conversación por WhatsApp con todo pre-cargado.

## Asistente virtual (Groq)

El asistente usa la API de Groq (`app/api/chat/route.ts`), corre 100% en el servidor: la key nunca se expone al navegador.

1. Crear una cuenta y una API key en https://console.groq.com/keys
2. En local: copiar `.env.example` como `.env.local` y pegar la key en `GROQ_API_KEY`.
3. En Vercel: **Project Settings → Environment Variables** → agregar `GROQ_API_KEY` con el valor de la key (para Production, Preview y Development). No se sube al repo (`.env*` ya está en `.gitignore`).
4. Redeploy si ya estaba desplegado, para que tome la variable nueva.

Modelos usados: `llama-3.3-70b-versatile` para la conversación y `llama-3.1-8b-instant` para extraer los datos del lead (vehículo, servicio, modalidad, detalle) en segundo plano.

## Deploy en Vercel

1. Importar este repositorio en Vercel.
2. Elegir **Next.js** como Framework Preset.
3. Mantener la raíz del repositorio como Root Directory.
4. Agregar la variable de entorno `GROQ_API_KEY` (ver arriba).
5. Presionar **Deploy**.

Vercel ejecutará automáticamente `npm install` y `npm run build`.
