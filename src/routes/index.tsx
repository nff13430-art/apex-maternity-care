import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import centreImg from "@/assets/centre.jpg";
import { Activity, Baby, Stethoscope, Scan, MapPin, Phone, Clock, Mail, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apex CT Scan & Maternity Centre — Katihar, Bihar" },
      { name: "description", content: "Apex CT Scan & Maternity Centre in Katihar — 96 Slice CT Scan, 3D/4D Ultrasound, Colour Doppler, Digital X-Ray & Maternity care." },
      { property: "og:title", content: "Apex CT Scan & Maternity Centre — Katihar" },
      { property: "og:description", content: "Advanced diagnostics and trusted maternity care in Katihar, Bihar." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const ADDRESS = "Old SBI Gali, MG Road, Katihar, Bihar 854105";
const PHONE = "+91 74887 38051";
const PHONE_TEL = "+917488738051";
const MAP_QUERY = encodeURIComponent("APEX CT SCAN & MATERNITY CENTRE, Old SBI Gali, MG Road, Katihar, Bihar 854105");

const SCAN_TYPES = [
  "96 Slice CT Scan",
  "3D / 4D Ultrasound",
  "Colour Doppler",
  "Digital X-Ray",
  "Maternity Consultation",
];

function Home() {
  const [form, setForm] = useState({ name: "", phone: "", age: "", gender: "", scan: SCAN_TYPES[0] });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello, I would like to book a scan.\n\nName: ${form.name}\nPhone: ${form.phone}\nAge: ${form.age}\nGender: ${form.gender}\nScan: ${form.scan}`
    );
    window.open(`https://wa.me/917488738051?text=${msg}`, "_blank");
    setSubmitted(true);
  };

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
            <a href="#book" className="hover:text-foreground">Book</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </nav>
          <Button asChild size="sm"><a href={`tel:${PHONE_TEL}`}><Phone className="mr-2 h-4 w-4" />Call Now</a></Button>
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
              <Button asChild size="lg" variant="secondary"><a href="#book">Book a Scan</a></Button>
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
            { icon: Clock, title: "Open Hours", text: "Mon – Sun · 9:00 AM – 5:00 PM" },
            { icon: Phone, title: "Appointments", text: PHONE },
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
            { icon: Stethoscope, title: "Expert Reporting", desc: "Timely, accurate reports reviewed by experienced consultants." },
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
      <section id="about" className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <img src={centreImg} alt="Centre exterior" className="rounded-2xl border border-border object-cover" />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" /> About the Centre
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Modern diagnostics, trusted maternity care — right here in Katihar
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              APEX CT Scan & Maternity Centre, a unit of Apex Radio-Diagnostic Centre, is one of
              Katihar's most trusted destinations for advanced medical imaging and dedicated
              maternity services. Built around the belief that quality healthcare should be
              accessible, accurate and compassionate, our centre brings together state-of-the-art
              technology and a team of experienced doctors under one roof.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              From our AI-enabled 96 Slice CT Scanner and 3D/4D Ultrasound to Colour Doppler,
              Digital X-Ray and complete antenatal, delivery and postnatal care — every service
              is delivered with precision, hygiene and warmth. Hundreds of families across Katihar
              and the surrounding region trust us with their health every month, and we are proud
              to walk that journey with each one of them.
            </p>
            <ul className="mt-7 grid gap-3 text-sm">
              {[
                "AI-enabled 96 Slice CT Scanner for fast, precise diagnosis",
                "In-house obstetrics and radiology specialists",
                "Clean, comfortable and modern facility",
                "Same-day reports and home delivery options",
                "Affordable pricing with no compromise on quality",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2 text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Book a Scan */}
      <section id="book" className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Book a Scan</h2>
            <p className="mt-3 text-muted-foreground">
              Fill in your details and we'll confirm your appointment on WhatsApp / call.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-5 rounded-2xl border border-border bg-card p-6 md:p-8"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" required maxLength={80} value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" required type="tel" pattern="[0-9+\s-]{7,15}" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit mobile" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" required type="number" min={0} max={120} value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="Age in years" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select id="gender" required value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scan">Scan / Service</Label>
              <select id="scan" required value={form.scan}
                onChange={(e) => setForm({ ...form, scan: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {SCAN_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <Button type="submit" size="lg" className="mt-2">Confirm Booking</Button>
            {submitted && (
              <p className="text-sm text-primary text-center">
                Thanks! Opening WhatsApp to confirm your booking…
              </p>
            )}
            <p className="text-xs text-muted-foreground text-center">
              Or call us directly at <a href={`tel:${PHONE_TEL}`} className="font-medium text-primary">{PHONE}</a>
            </p>
          </form>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
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
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Phone</div>
                  <a href={`tel:${PHONE_TEL}`} className="text-muted-foreground hover:text-primary">{PHONE}</a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Hours</div>
                  <div className="text-muted-foreground">Open all days · 9:00 AM – 5:00 PM</div>
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
