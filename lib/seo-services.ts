export const SITE_URL = "https://www.autotronicagodiag.com";
export const BUSINESS_NAME = "Autotrónica Go Diagnosis";
export const WHATSAPP = "584222872237";
export const PHONE_DISPLAY = "+58 422 287 2237";
export const EMAIL = "godiag2023@gmail.com";
export const ADDRESS = "Carretera Panamericana, vía Los Teques, km 1.5, sector industrial Los Cocos, Caracas, Venezuela";

export type SeoService = {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  intro: string;
  problem: string;
  process: string[];
  applications: string[];
  keywords: string[];
};

export const seoServices: SeoService[] = [
  {
    slug: "diagnostico-electronico-caracas",
    name: "Diagnóstico electrónico automotriz en Caracas",
    shortName: "Diagnóstico electrónico",
    title: "Diagnóstico Electrónico Automotriz en Caracas | Go Diagnosis",
    description: "Diagnóstico electrónico automotriz en Caracas con escáner, medición y análisis técnico. Atención en taller y a domicilio con Autotrónica Go Diagnosis.",
    intro: "Cuando aparece una falla eléctrica o electrónica, el objetivo no es cambiar piezas por descarte: es encontrar la causa. En Autotrónica Go Diagnosis realizamos diagnóstico electrónico automotriz en Caracas mediante lectura de sistemas, medición y comprobaciones técnicas.",
    problem: "Este servicio está orientado a testigos encendidos, fallas intermitentes, problemas de arranque, pérdida de potencia, errores de comunicación entre módulos y otras anomalías electrónicas que requieren una evaluación ordenada.",
    process: ["Recepción del síntoma y antecedentes", "Lectura electrónica y comprobaciones", "Medición de señales y circuitos cuando corresponde", "Definición del alcance técnico según la evidencia encontrada"],
    applications: ["Vehículos gasolina", "Vehículos diésel", "Vehículos eléctricos compatibles", "Toyota, Ford, Chevrolet, Mitsubishi, Jeep, Dodge y Chrysler"],
    keywords: ["diagnóstico electrónico automotriz Caracas", "taller electrónica automotriz Caracas", "diagnóstico con escáner Caracas", "diagnóstico con osciloscopio automotriz"],
  },
  {
    slug: "reparacion-ecu-caracas",
    name: "Reparación de ECU en Caracas",
    shortName: "Reparación ECU",
    title: "Reparación de ECU en Caracas | Computadoras de Carro",
    description: "Diagnóstico y reparación de ECU de motor en Caracas. Evaluación electrónica de computadoras automotrices antes de considerar reemplazos innecesarios.",
    intro: "La ECU o computadora de motor concentra funciones críticas del vehículo. Una falla en la unidad requiere diagnóstico electrónico antes de decidir si corresponde reparar, programar o reemplazar el módulo.",
    problem: "Trabajamos sobre computadoras de motor y unidades de control que presentan fallas electrónicas, problemas de comunicación o condiciones que requieren comprobación interna del módulo.",
    process: ["Diagnóstico previo del sistema y alimentación", "Comprobación de comunicación y señales", "Evaluación electrónica de la ECU", "Reparación o intervención según la falla localizada"],
    applications: ["ECU de motor", "Computadoras automotrices", "Módulos electrónicos compatibles", "Diagnóstico previo al reemplazo"],
    keywords: ["reparación ECU Caracas", "dónde reparar computadora de carro", "diagnóstico ECU automotriz", "especialista computadoras de autos Caracas"],
  },
  {
    slug: "reparacion-abs-caracas",
    name: "Reparación de módulo ABS en Caracas",
    shortName: "Reparación ABS",
    title: "Reparación de Módulo ABS en Caracas | Go Diagnosis",
    description: "Diagnóstico y reparación electrónica de módulos ABS en Caracas. Evaluación del sistema y del módulo antes de reemplazar componentes.",
    intro: "Un testigo ABS no siempre significa que el módulo debe reemplazarse. El sistema necesita una evaluación que permita diferenciar una falla de alimentación, sensor, cableado, comunicación o electrónica interna.",
    problem: "El servicio apunta a fallas asociadas al sistema ABS y a módulos que requieren diagnóstico específico para determinar el origen de la anomalía.",
    process: ["Lectura de códigos y datos del sistema", "Comprobación de alimentación, comunicación y señales", "Evaluación del módulo ABS", "Reparación electrónica cuando corresponde"],
    applications: ["Módulos ABS", "Fallos de comunicación", "Testigos ABS", "Diagnóstico electrónico asociado"],
    keywords: ["reparación módulo ABS Caracas", "diagnóstico ABS Caracas", "módulo ABS reparación", "electrónica ABS automotriz"],
  },
  {
    slug: "reparacion-bcm-tipm-caracas",
    name: "Reparación BCM / TIPM en Caracas",
    shortName: "BCM / TIPM",
    title: "Reparación BCM y TIPM en Caracas | Jeep Dodge Chrysler",
    description: "Diagnóstico y reparación de BCM y TIPM en Caracas, con enfoque en fallas eléctricas, comunicación y control en Jeep, Dodge, Chrysler y aplicaciones compatibles.",
    intro: "Los módulos BCM y TIPM administran múltiples funciones de carrocería, alimentación y control. Una falla puede generar síntomas aparentemente no relacionados entre sí, por lo que el diagnóstico debe considerar módulo, cableado, alimentación y red de comunicación.",
    problem: "Atendemos fallas eléctricas, problemas de comunicación y anomalías de control vinculadas a módulos BCM/TIPM, especialmente en vehículos Jeep, Dodge y Chrysler compatibles.",
    process: ["Lectura de fallas y red de comunicación", "Comprobación de alimentaciones y circuitos", "Evaluación electrónica del módulo", "Intervención según la falla encontrada"],
    applications: ["BCM", "TIPM", "Jeep", "Dodge", "Chrysler"],
    keywords: ["reparación BCM Caracas", "reparación TIPM Caracas", "TIPM Jeep reparación", "especialista electrónico Jeep Dodge Chrysler"],
  },
  {
    slug: "programacion-ecu-caracas",
    name: "Programación y reprogramación ECU en Caracas",
    shortName: "Programación ECU",
    title: "Programación ECU en Caracas | HP Tuners BitEdit VFTuner",
    description: "Programación y calibración ECU en Caracas con HP Tuners, BitEdit y VFTuner según vehículo y aplicación. Evaluación técnica previa.",
    intro: "La programación de una ECU debe partir de una aplicación compatible y de un objetivo técnico claro. Autotrónica Go Diagnosis trabaja con herramientas especializadas para ajustes de software y calibración según vehículo.",
    problem: "Este servicio se orienta a vehículos que requieren revisión o modificación de parámetros de software, calibración o trabajos compatibles con las herramientas disponibles.",
    process: ["Identificación del vehículo y ECU", "Evaluación de compatibilidad", "Lectura y respaldo cuando corresponde", "Programación o calibración según el trabajo acordado"],
    applications: ["HP Tuners", "BitEdit", "VFTuner", "Toyota y otras aplicaciones compatibles"],
    keywords: ["reprogramación ECU Caracas", "HP Tuners Caracas", "VFTuner Toyota", "BitEdit ECU", "programación ECU automotriz"],
  },
  {
    slug: "inyectores-gdi-efi-caracas",
    name: "Limpieza y prueba de inyectores GDI / EFI en Caracas",
    shortName: "Inyectores GDI / EFI",
    title: "Limpieza y Prueba de Inyectores GDI EFI en Caracas",
    description: "Entonación, limpieza y prueba de inyectores EFI y GDI en Caracas para verificar funcionamiento, entrega y condiciones del sistema de inyección.",
    intro: "Los sistemas EFI y GDI requieren que los inyectores trabajen de forma consistente. La limpieza y prueba permite evaluar su funcionamiento antes de atribuir una falla a otros componentes del sistema.",
    problem: "El servicio está orientado a inyectores que requieren limpieza, comprobación y verificación de entrega dentro de un diagnóstico del sistema de inyección.",
    process: ["Recepción y evaluación del conjunto", "Limpieza de inyectores", "Prueba y verificación de funcionamiento", "Conclusión técnica del estado observado"],
    applications: ["Inyectores EFI", "Inyectores GDI", "Entonación de inyectores", "Laboratorio y prueba"],
    keywords: ["limpieza inyectores GDI Caracas", "entonación inyectores GDI", "laboratorio inyectores Caracas", "inyectores EFI limpieza"],
  },
  {
    slug: "diagnostico-diesel-12v-24v-caracas",
    name: "Diagnóstico diésel 12V / 24V en Caracas",
    shortName: "Diésel 12V / 24V",
    title: "Diagnóstico Diésel 12V y 24V en Caracas | Go Diagnosis",
    description: "Diagnóstico electrónico diésel 12V y 24V en Caracas para vehículos y equipos compatibles. Lectura, medición y comprobaciones técnicas.",
    intro: "Los sistemas diésel de 12V y 24V requieren un diagnóstico que contemple alimentación, señales, sensores, actuadores y electrónica de control. La medición permite reducir el reemplazo innecesario de componentes.",
    problem: "Trabajamos sobre vehículos y equipos diésel compatibles con fallas eléctricas o electrónicas que requieren lectura y comprobaciones específicas.",
    process: ["Identificación del sistema 12V/24V", "Lectura electrónica disponible", "Comprobación de alimentación, señales y circuitos", "Definición de la intervención necesaria"],
    applications: ["Sistemas diésel 12V", "Sistemas diésel 24V", "Vehículos y equipos compatibles", "Diagnóstico electrónico"],
    keywords: ["diagnóstico diésel 12v 24v Caracas", "escáner camiones diésel Caracas", "electrónica diésel Caracas", "diagnóstico diésel automotriz"],
  },
  {
    slug: "servicio-automotriz-domicilio-caracas",
    name: "Electrónica automotriz a domicilio en Caracas",
    shortName: "Servicio a domicilio",
    title: "Diagnóstico y Electrónica Automotriz a Domicilio en Caracas",
    description: "Diagnóstico, programación y electrónica automotriz a domicilio en Caracas. Coordinación previa por WhatsApp según zona, vehículo y trabajo.",
    intro: "Autotrónica Go Diagnosis puede coordinar sus servicios técnicos a domicilio en Caracas. Antes de la visita se realiza una preevaluación por WhatsApp para conocer vehículo, síntomas, zona y alcance del trabajo.",
    problem: "La modalidad a domicilio está pensada para clientes que necesitan atención técnica en la ubicación del vehículo y desean coordinar previamente el equipo y tipo de intervención necesarios.",
    process: ["Consulta inicial por WhatsApp", "Preevaluación del caso", "Coordinación de zona y modalidad", "Intervención técnica en la ubicación acordada"],
    applications: ["Diagnóstico electrónico", "Programación y electrónica", "Servicios del taller coordinables a domicilio", "Caracas, sujeto a coordinación de zona"],
    keywords: ["diagnóstico automotriz a domicilio Caracas", "electrónica automotriz a domicilio Caracas", "taller automotriz a domicilio Caracas", "diagnóstico de carro a domicilio"],
  },
];

export function getSeoService(slug: string) {
  return seoServices.find((service) => service.slug === slug);
}
