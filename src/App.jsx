import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Menu, X } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const programs = [
  {
    title: "Growth & Leadership Development",
    description: "Transform leaders and build confidence through experiential learning.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503630935/m5AbCYJwXocCTijfPZE6d9/leadership-development-2Pr7LYhRtUM8JCHU3oKY3p.webp",
  },
  {
    title: "Team Engagement & Collaboration",
    description: "Strengthen bonds and improve teamwork through interactive activities.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503630935/m5AbCYJwXocCTijfPZE6d9/hero-main-dKBzxBhWVxthVHE5PXnynb.webp",
  },
  {
    title: "Happiness & Wellbeing Programs",
    description: "Create positive workplace culture and emotional wellbeing.",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503630935/m5AbCYJwXocCTijfPZE6d9/wellbeing-section-GA9JcxSjPFnCe9qqcUBVye.webp",
  },
  {
    title: "Community & Culture Building",
    description: "Foster inclusive communities and strengthen organizational culture.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const scrollToContact = (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError("Email is not configured yet. Add EmailJS keys in .env to enable sending.");
      return;
    }

    setIsSending(true);
    setSubmitError("");

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name || "Website visitor",
          company: formData.company || "Not provided",
          email: formData.email || "Not provided",
          phone: formData.phone || "Not provided",
          interest: formData.interest || "General enquiry",
          message: formData.message || "No message provided",
        },
        { publicKey }
      )
      .then(() => {
        setMessageSent(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        });
        setTimeout(() => setMessageSent(false), 3000);
      })
      .catch(() => {
        setSubmitError("Failed to send message. Please try again in a moment.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-white/95 backdrop-blur transition-shadow duration-300">
        <div className="container h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-[#ff6b35] text-white flex items-center justify-center font-semibold">U</div>
            <span className="font-semibold text-xl">Udaanfly</span>
          </a>
          <div
            className="hidden md:flex items-center gap-8 text-base text-[#2c2c2c]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <a href="#about" className="transition-colors hover:text-[#ff6b35]">About Us</a>
            <a href="#programs" className="transition-colors hover:text-[#ff6b35]">Programs</a>
            <a href="#testimonials" className="transition-colors hover:text-[#ff6b35]">Testimonials</a>
            <a href="#contact" className="transition-colors hover:text-[#ff6b35]">Contact</a>
          </div>
          <div className="hidden md:block">
            <Button asChild className="bg-[#ff6b35] text-white hover:bg-[#f15a22] text-xs h-8 px-3 transition-all duration-300 hover:-translate-y-0.5">
              <a href="#contact" onClick={scrollToContact}>Contact Us</a>
            </Button>
          </div>
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-[#2c2c2c] transition-colors hover:bg-[#fff2ec] hover:text-[#ff6b35]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        <div
          className={`md:hidden border-t border-border bg-white overflow-hidden transition-all duration-300 ease-out ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="container py-3 flex flex-col gap-3 text-sm">
            <a href="#about" onClick={() => setMenuOpen(false)} className="transition-colors duration-200 hover:text-[#ff6b35]">About Us</a>
            <a href="#programs" onClick={() => setMenuOpen(false)} className="transition-colors duration-200 hover:text-[#ff6b35]">Programs</a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="transition-colors duration-200 hover:text-[#ff6b35]">Testimonials</a>
            <a href="#contact" onClick={scrollToContact} className="transition-colors duration-200 hover:text-[#ff6b35]">Contact</a>
          </div>
        </div>
      </nav>

      <section className="pt-28 pb-20 bg-secondary">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block rounded-full bg-[#fff2ec] text-[#ff6b35] px-4 py-1.5 text-sm mb-4 font-medium">Creating Happiness that Connects</span>
            <h1 className="mb-4 text-[2.7rem] md:text-[3.35rem] leading-[1.05]">
              Empowering Minds,
              <br />
              <span className="text-[#ff6b35]">Elevating Teams</span>
            </h1>
            <p className="text-[#565d69] mb-7 max-w-xl text-[1.02rem] md:text-[1.12rem] leading-8 md:leading-9">
              Science-backed corporate team building, employee engagement, and wellbeing workshops that transform organizations and create meaningful human connection.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild className="bg-[#ff6b35] text-white hover:bg-[#f15a22] transition-all duration-300 hover:-translate-y-0.5">
                <a href="#contact" onClick={scrollToContact}>
                  Contact Us <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503630935/m5AbCYJwXocCTijfPZE6d9/hero-main-dKBzxBhWVxthVHE5PXnynb.webp"
            alt="Team building workshop"
            className="w-full h-[380px] rounded-xl object-cover shadow-lg"
          />
        </div>
      </section>

      <section id="about" className="py-20 bg-card">
        <div className="container grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="mb-5 text-[2.2rem]">Who We Are</h2>
            <p className="text-muted-foreground mb-3 text-sm leading-7">
              Udaanfly is a Mumbai-based corporate happiness, employee engagement, and experiential learning company dedicated to creating impactful people experiences through transformative workshops and programs.
            </p>
            <p className="text-muted-foreground mb-3 text-sm leading-7">
              Founded by Pankita Gala, a corporate facilitator and happiness coach with over 25 years of experience, Udaanfly combines positive psychology, experiential learning, and emotional wellbeing practices to design workshops that are meaningful, energetic, and result-oriented.
            </p>
            <p className="text-muted-foreground text-sm leading-7">
              Our mission is to help people build stronger relationships, improve communication, reduce stress, and create meaningful human connection in the workplace and beyond.
            </p>
          </div>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503630935/m5AbCYJwXocCTijfPZE6d9/leadership-development-2Pr7LYhRtUM8JCHU3oKY3p.webp"
            alt="Leadership development"
            className="w-full h-[360px] rounded-xl object-cover"
          />
        </div>
      </section>

      <section id="programs" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="mb-3 text-[2.2rem]">What We Offer</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Science-backed programs designed to improve communication, teamwork, confidence, and emotional wellbeing across your organization.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {programs.map((program) => (
              <Card key={program.title} className="overflow-hidden p-0 gap-0 min-h-[300px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="h-[150px] relative">
                  <img src={program.image} alt={program.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <div className="absolute inset-0 bg-[#ff6b35]/55" />
                </div>
                <CardContent className="p-4 flex-1">
                  <h3 className="text-[0.95rem] mb-2">{program.title}</h3>
                  <p className="text-muted-foreground text-xs leading-5">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="mb-3 text-[2.2rem]">Why Choose Udaanfly?</h2>
            <p className="text-muted-foreground text-sm">We bring expertise, authenticity, and proven results to every engagement</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              ["01", "Science Backed Framework", "Evidence-based methodologies grounded in positive psychology and behavioral science"],
              ["02", "Customised For Every Audience", "Tailored programs designed specifically for your organization's unique needs"],
              ["03", "Engagement That Drives Results", "High-participation experiences that create lasting behavioral change"],
              ["04", "Global Reach Physical + Virtual", "Flexible delivery options for organizations across India and globally"],
            ].map(([num, title, copy]) => (
              <div key={num}>
                <p className="text-[#ff6b35] text-4xl font-bold mb-3">{num}</p>
                <h3 className="text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="mb-3 text-[2.2rem]">What Our Clients Say</h2>
            <p className="text-muted-foreground text-sm">Hear from organizations that have transformed through our programs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["HR Manager", "ICICI Prudential", "Udaanfly conducted one of the most engaging corporate team building workshops we have experienced. The activities were energetic, interactive, and thoughtfully designed. Highly recommended!"],
              ["HR Head", "Donear", "An outstanding experiential learning experience. The workshop was highly interactive, professionally conducted, and perfectly balanced. Pankita's facilitation style made it truly memorable."],
              ["Vice President", "V3", "The happiness and wellbeing workshop was truly refreshing. It beautifully combined positive psychology with practical activities. One of the best corporate wellbeing workshops we have attended."],
            ].map(([role, org, quote]) => (
              <Card key={org} className="p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-5">
                  <p className="text-[#ff6b35] text-xs tracking-[0.2em] mb-3">★★★★★</p>
                  <p className="text-muted-foreground text-sm italic leading-6 mb-4">"{quote}"</p>
                  <hr className="border-border mb-3" />
                  <p className="text-sm font-semibold">{role}</p>
                  <p className="text-xs text-muted-foreground">{org}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-card">
        <div className="container grid md:grid-cols-[1fr_1.5fr] gap-14">
          <div>
            <h2 className="mb-3 text-[2.2rem]">Get In Touch</h2>
            <p className="text-muted-foreground text-sm mb-7">
              Ready to transform your organization? Let's connect and explore how Udaanfly can support your team's growth and wellbeing journey.
            </p>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="size-4 text-[#ff6b35] mt-0.5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:pankita.gala@gmail.com" className="text-[#ff6b35] transition-colors duration-200 hover:text-[#f15a22]">pankita.gala@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-4 text-[#ff6b35] mt-0.5" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href="tel:+919821578960" className="text-[#ff6b35] transition-colors duration-200 hover:text-[#f15a22]">+91 98215 78960</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-[#ff6b35] mt-0.5" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-muted-foreground">Mumbai, India</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                Connect on social
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.instagram.com/pankitagala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-11 rounded-full bg-[#ff6b35] text-white shadow-sm transition-all duration-300 hover:bg-[#f15a22] hover:-translate-y-0.5 hover:shadow-md"
                  aria-label="Instagram"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/1KmbH245Fh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-11 rounded-full bg-[#ff6b35] text-white shadow-sm transition-all duration-300 hover:bg-[#f15a22] hover:-translate-y-0.5 hover:shadow-md"
                  aria-label="Facebook"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/pankitagala?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center size-11 rounded-full bg-[#ff6b35] text-white shadow-sm transition-all duration-300 hover:bg-[#f15a22] hover:-translate-y-0.5 hover:shadow-md"
                  aria-label="LinkedIn"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input name="name" placeholder="Your Name" value={formData.name} onChange={onFieldChange} required />
              <Input name="company" placeholder="Company Name" value={formData.company} onChange={onFieldChange} />
            </div>
            <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={onFieldChange} required />
            <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={onFieldChange} />
            <Input name="interest" placeholder="Program Type/Interest" value={formData.interest} onChange={onFieldChange} />
            <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={onFieldChange} />
            <Button
              className={messageSent ? "w-full bg-green-600 hover:bg-green-600 text-white" : "w-full bg-[#ff6b35] hover:bg-[#f15a22] text-white"}
              disabled={messageSent || isSending}
            >
              {isSending ? "Sending..." : messageSent ? "✓ Message Sent!" : "Send Message"}
            </Button>
            {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
          </form>
        </div>
      </section>

      <footer className="bg-[#1f2937] text-[#9ca3af] py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 pb-9 border-b border-white/10">
            <div>
              <div className="size-8 rounded-md bg-[#ff6b35] text-white flex items-center justify-center font-semibold mb-3">U</div>
              <div className="text-white font-semibold mb-2">Udaanfly</div>
              <p className="text-sm">Creating happiness that connects and transforms organizations.</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#d1d5db] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="transition-colors hover:text-[#ff6b35]">About Us</a></li>
                <li><a href="#programs" className="transition-colors hover:text-[#ff6b35]">Programs</a></li>
                <li><a href="#testimonials" className="transition-colors hover:text-[#ff6b35]">Testimonials</a></li>
                <li><a href="#contact" className="transition-colors hover:text-[#ff6b35]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#d1d5db] mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#programs" className="transition-colors hover:text-[#ff6b35]">Team Building</a></li>
                <li><a href="#programs" className="transition-colors hover:text-[#ff6b35]">Wellbeing Programs</a></li>
                <li><a href="#programs" className="transition-colors hover:text-[#ff6b35]">Leadership Development</a></li>
                <li><a href="#programs" className="transition-colors hover:text-[#ff6b35]">Culture Building</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.08em] uppercase text-[#d1d5db] mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:pankita.gala@gmail.com" className="transition-colors hover:text-[#ff6b35]">Email Us</a></li>
                <li><a href="tel:+919821578960" className="transition-colors hover:text-[#ff6b35]">Call Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 text-center text-xs text-[#6b7280]">
            © 2025 Udaanfly. All rights reserved. | Empowering Minds. Elevating Teams.
          </div>
        </div>
      </footer>
    </div>
  );
}
