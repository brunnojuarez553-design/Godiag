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

## Reseñas de Google

La sección muestra las cinco opiniones reales consultadas el 4 de octubre de 2026.
`/api/google-reviews` consulta Google Places API (New) desde el servidor, sin exponer
la clave al navegador. Para activar la actualización, configurar en Vercel
`GOOGLE_PLACES_API_KEY` de un proyecto con Places API (New) habilitada y volver a desplegar.
Opcionalmente configurar `GOOGLE_PLACE_ID` para evitar la búsqueda inicial.
Sin clave o si Google falla, se conservan las opiniones originales y su fecha de consulta;
la interfaz nunca indica que está sincronizada cuando no lo está.

Places devuelve hasta cinco opiniones destacadas, la puntuación y el número total
actuales. No garantiza mostrar todas las opiniones nuevas; el enlace al perfil permite
leerlas todas. Para un historial completo se requiere Google Business Profile API con
OAuth del propietario. La clave debe permanecer en variables de servidor y restringirse
a Places API. Google Cloud puede requerir facturación; no se activa ningún servicio de
pago automáticamente. No se agregan estrellas de reseñas propias al marcado SEO.

### Sincronización completa (recomendada)

El endpoint también admite Google Business Profile API y prioriza esta conexión.
Configurar `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
`GOOGLE_BUSINESS_REFRESH_TOKEN` y `GOOGLE_BUSINESS_LOCATION`
(`accounts/ACCOUNT_ID/locations/LOCATION_ID`). Requiere proyecto aprobado para GBP
API, perfil verificado y autorización OAuth del propietario con scope
`https://www.googleapis.com/auth/business.manage`. Estas credenciales deben configurarse
en Vercel; nunca enviarlas por chat ni incorporarlas al repositorio.
La API pagina todas las reseñas y las ordena por actualización: cada visita obtiene
las existentes y las nuevas. Sin autorización no se puede activar esta conexión.
