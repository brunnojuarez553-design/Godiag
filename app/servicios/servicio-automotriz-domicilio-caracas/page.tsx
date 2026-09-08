import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, ShieldCheck, Wrench } from "lucide-react";

const whatsapp = "584222872237";
const siteUrl = "https://www.autotronicagodiag.com";

export const metadata: Metadata = {
  title: "Programación y EGR OFF a Domicilio en Caracas | Go Diagnosis",
  description:
    "Programación ECU y EGR OFF a domicilio en Caracas con Autotrónica Go Diagnosis. Servicio sujeto a compatibilidad, zona y coordinación previa de turno.",
  alternates: { canonical: "/servicios/servicio-automotriz-domicilio-caracas" },
  openGraph: {
    title: "Programación y EGR OFF a Domicilio en Caracas | Go Diagnosis",
    description:
      "Servicio a domicilio exclusivo para programación ECU y EGR OFF, con validación y turno previo en Caracas.",
    url: `${siteUrl}/servicios/servicio-automotriz-domicilio-caracas`,
    type: "website",
  },
};

export default function DomicilioPage() {
  const message = encodeURIComponent(
    "Hola Autotrónica Go Diagnosis. Quiero consultar por programación o EGR OFF a domicilio. Mi vehículo es: "
  );

  return (
    <main className="seo-service-page">
      <header className="seo-service-header">
        <Link href="/servicios" className="seo-back"><ArrowLeft size={17} /> Volver a servicios</Link>
      </header>

      <section className="seo-service-hero">
        <span className="kicker">SERVICIO A DOMICILIO · CARACAS</span>
        <h1>Programación y EGR OFF<br />a domicilio.</h1>
        <p>
          La modalidad a domicilio de Autotrónica Go Diagnosis está disponible únicamente para
          trabajos de programación y eliminación de EGR, siempre con validación técnica y turno previo.
        </p>
        <a className="primary-btn" href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noreferrer">
          Consultar disponibilidad <ArrowRight size={17} />
        </a>
      </section>

      <section className="seo-service-content">
        <div>
          <span className="kicker">ALCANCE DEL SERVICIO</span>
          <h2>Antes de coordinar la visita,<br />se valida el vehículo y el trabajo.</h2>
          <p>
            No todos los servicios del taller se realizan a domicilio. Esta modalidad se reserva para
            programación ECU y EGR OFF en aplicaciones compatibles. La coordinación depende del vehículo,
            la zona, el software requerido y el alcance técnico del trabajo.
          </p>
        </div>

        <div className="seo-process-grid">
          <article><b>01</b><Wrench /><h3>Identificación</h3><p>Marca, modelo, año, motorización y trabajo solicitado.</p></article>
          <article><b>02</b><ShieldCheck /><h3>Compatibilidad</h3><p>Se confirma que la aplicación y las herramientas sean compatibles.</p></article>
          <article><b>03</b><MapPin /><h3>Coordinación</h3><p>Se acuerdan zona, día y horario antes de la visita.</p></article>
          <article><b>04</b><ArrowRight /><h3>Intervención</h3><p>Programación o EGR OFF en la ubicación previamente acordada.</p></article>
        </div>
      </section>

      <section className="seo-service-local">
        <div>
          <span className="kicker">IMPORTANTE</span>
          <h2>El resto de los servicios<br />se realiza en el taller.</h2>
          <p>
            Diagnóstico electrónico, reparación de ECU, ABS, BCM/TIPM, inyectores, cableado,
            diésel y demás trabajos se atienden en el taller de Autotrónica Go Diagnosis.
          </p>
        </div>
        <a className="text-link" href={`https://wa.me/${whatsapp}?text=${message}`} target="_blank" rel="noreferrer">
          Coordinar programación o EGR OFF <ArrowRight size={16} />
        </a>
      </section>
    </main>
  );
}
