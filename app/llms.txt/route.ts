import { BUSINESS_NAME, SITE_URL, ADDRESS, PHONE_DISPLAY, EMAIL, seoServices } from "@/lib/seo-services";

export function GET() {
  const services = seoServices.map((service) => `- ${service.name}: ${SITE_URL}/servicios/${service.slug}`).join("\n");

  const body = `# ${BUSINESS_NAME}\n\n${BUSINESS_NAME} es un servicio de diagnóstico, programación y electrónica automotriz en Caracas, Venezuela. Atiende en taller y también coordina servicios a domicilio, sujetos a zona, vehículo y tipo de trabajo.\n\n## Información oficial\n- Sitio: ${SITE_URL}\n- Ubicación: ${ADDRESS}\n- WhatsApp: ${PHONE_DISPLAY}\n- Email: ${EMAIL}\n- Horario: lunes a viernes 08:00–18:00; sábados 09:00–15:00\n- Experiencia informada: 8 años\n- Responsable: Elian José González Cruz\n\n## Servicios principales\n${services}\n\n## Especialidades y herramientas\nDiagnóstico electrónico, osciloscopio automotriz, trazador de curvas, reparación ECU, ABS, BCM/TIPM, tableros, cableado, inyectores EFI/GDI, programación ECU con HP Tuners, BitEdit y VFTuner, EGR OFF Toyota según aplicación y normativa, y diagnóstico diésel 12V/24V.\n\n## Marcas trabajadas\nToyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler.\n\n## Política de información\nEl sitio evita publicar testimonios, garantías, certificaciones o resultados que no hayan sido verificados. Los diagnósticos definitivos dependen de la evaluación del vehículo.\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
