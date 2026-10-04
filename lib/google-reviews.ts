export const googleMapsUrl = "https://maps.app.goo.gl/1A8QkEmg8wAKNteX7";
export type GoogleReview = { author: string; rating: number; text: string; url?: string; photo?: string };
export type GoogleReviewsData = { rating: number; count: number; reviews: GoogleReview[]; live: boolean; checkedAt: string; url: string; source?: "business" | "places" };
// Public reviews checked directly on the business's Google Maps listing, 2026-10-04.
export const initialGoogleReviews: GoogleReviewsData = {
  rating: 5, count: 5, live: false, checkedAt: "2026-10-04", url: googleMapsUrl,
  reviews: [
    { author: "Gabriel Abecassis", rating: 5, text: "Conocí a elian hace aproximadamente 6 meses, tengo una grand cherokee y de verdad me ha solucionado todos los problemas técnicos, eléctricos, electrónicos, mecanicos, etc que tenia mi vehiculo, mientras lo llevaba a miles de talleres en caracas, Elian (El Dueño) daba con la falle directa y con mucha sinceridad te dice cual es la falla directa del vehiculo, y te da solucion a un precio razonable, de verdad que lo recomiendo con los ojos cerrados, te envía videos de la fallas y hace pruebas reales, y te envía evidencia por video cuando resuelve el problema, no boten su dinero en talleres fantasmas, llevenselo a Elian y eviten dolores de cabeza, saludos..." },
    { author: "Gregorio2 Gonzalez2", rating: 5, text: "De los mejores diagnósticos que e visto, nada de andar mandando a comprar medio carro y sin dar con la falla, 100% recomendado" },
    { author: "Francys Medina", rating: 5, text: "Si buscan un diagnóstico certero... Acá lo tendrás, se los recomiendo al 100%... Después de tantos lugares, los visite y sin tantos días de espera solucionaron los problemas que otros no encontraban y ahora son mis grandes aliados! Mi vehículo se mantiene en condiciones para mi uso diario y en mantenimientos al día gracias a su valioso trabajo!" },
    { author: "Jhon f", rating: 5, text: "Excelente servicio. Muy satisfecho con el trabajo. Diagnóstico preciso, atención rápida y excelente disposición para explicar cada detalle. Transmiten mucha confianza." },
    { author: "bruno juarez", rating: 5, text: "Me realizo la eliminacion de EGR con reprogramacion y quedo espectacular. Muy profesional Elian" },
  ],
};
