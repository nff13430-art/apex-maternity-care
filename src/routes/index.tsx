import { createFileRoute } from "@tanstack/react-router";
import centreImg from "@/assets/centre.jpg";
import { Activity, Baby, Stethoscope, Scan, MapPin, Phone, Clock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex CT Scan & Maternity Centre — Katihar, Bihar" },
      { name: "description", content: "Apex CT Scan & Maternity Centre in Katihar — 96 Slice CT Scan, 3D/4D Ultrasound, Colour Doppler, Digital X-Ray & Maternity care by Dr. Kunal Singh and Dr. Aishwarya Singh." },
      { property: "og:title", content: "Apex CT Scan & Maternity Centre — Katihar" },
      { property: "og:description", content: "Advanced diagnostics and trusted maternity care in Katihar, Bihar." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const ADDRESS = "Old SBI Gali, MG Road, Katihar, Bihar 854105";
const MAP_QUERY = encodeURIComponent("APEX CT SCAN & MATERNITY CENTRE, Old SBI Gali, MG Road, Katihar, Bihar 854105");

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Apex CT Scan</div>
              <div className="text-xs text-muted-foreground">& Maternity Centre</div>
            </div>
          </a>
          <nav className="hidden gap-7 text-sm text-muted-foreground md:flex">
            <a href="#services" className="hover:text-foreground">Services</a>
            <a href="#doctors" className="hover:text-foreground">Doctors</a>
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
          <Button asChild size="sm"><a href="tel:+910000000000"><Phone className="mr-2 h-4 w-4" />Call Now</a></Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Trusted diagnostics in Katihar
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              APEX CT Scan & Maternity Centre
            </h1>
            <p className="mt-4 max-w-xl text-base/relaxed text-white/85">
              A unit of Apex Radio-Diagnostic Centre. 96 Slice CT Scan, 3D/4D Ultrasound,
              Colour Doppler, Digital X-Ray and complete maternity care under one roof.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary"><a href="#contact">Book a Scan</a></Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-white/40 hover:bg-white/10 hover:text-primary-foreground">
                <a href="#services">Our Services</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src={centreImg}
              alt="Apex CT Scan & Maternity Centre building exterior in Katihar"
              className="w-full rounded-2xl border border-white/20 object-cover"
              style={{ boxShadow: "var(--shadow-soft)" }}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Quick info */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
          {[
            { icon: MapPin, title: "Visit Us", text: ADDRESS },
            { icon: Clock, title: "Open Hours", text: "Mon – Sun · 8:00 AM – 9:00 PM" },
            { icon: Phone, title: "Appointments", text: "Call to book your scan or consultation" },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Services</h2>
          <p className="mt-3 text-muted-foreground">
            Advanced imaging and maternity care delivered with accuracy and compassion.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Scan, title: "96 Slice CT Scan", desc: "AI-enabled, high-resolution CT imaging for fast and precise diagnosis." },
            { icon: Activity, title: "3D / 4D Ultrasound", desc: "Detailed real-time imaging including obstetric and abdominal studies." },
            { icon: Activity, title: "Colour Doppler", desc: "Vascular and cardiac flow studies for accurate evaluation." },
            { icon: Scan, title: "Digital X-Ray", desc: "Low-dose digital X-ray with instant, high-clarity reports." },
            { icon: Baby, title: "Maternity Care", desc: "Antenatal, delivery and postnatal care in a safe, modern facility." },
            { icon: Stethoscope, title: "Radiology Consults", desc: "Expert reporting by experienced consultant radiologists." },
          ].map((s) => (
            <div key={s.title} className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Meet Our Doctors</h2>
            <p className="mt-3 text-muted-foreground">Experienced specialists committed to quality care.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { name: "Dr. Kunal Singh", qual: "MBBS, MD (Radiodiagnosis)", role: "Consultant Radiologist" },
              { name: "Dr. Aishwarya Singh", qual: "MBBS, MS (Obstetrics & Gynaecology)", role: "Maternity & Women's Health" },
            ].map((d) => (
              <div key={d.name} className="rounded-2xl border border-border bg-card p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
                    {d.name.split(" ")[1][0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{d.name}</h3>
                    <p className="text-sm text-muted-foreground">{d.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{d.qual}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <img src={centreImg} alt="Centre exterior at night" className="rounded-2xl border border-border object-cover" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About the Centre</h2>
            <p className="mt-4 text-muted-foreground">
              APEX CT Scan & Maternity Centre is a unit of Apex Radio-Diagnostic Centre, serving
              Katihar and the surrounding region with modern diagnostic imaging and dedicated
              maternity services. Our facility combines the latest equipment with experienced
              specialists to deliver timely, accurate and compassionate care.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> AI-enabled 96 Slice CT Scanner</li>
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> In-house obstetrics and radiology team</li>
              <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Clean, comfortable and modern facility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Visit or Contact Us</h2>
            <p className="mt-3 text-muted-foreground">We're here to help. Reach out for appointments or queries.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <h3 className="text-lg font-semibold">Get in Touch</h3>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-muted-foreground">{ADDRESS}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Hours</div>
                    <div className="text-muted-foreground">Open all days · 8:00 AM – 9:00 PM</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">info@apexctkatihar.in</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <iframe
                title="Map to Apex CT Scan & Maternity Centre"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                className="h-full min-h-[320px] w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Apex CT Scan & Maternity Centre. All rights reserved.</div>
          <div>{ADDRESS}</div>
        </div>
      </footer>
    </div>
  );
}
