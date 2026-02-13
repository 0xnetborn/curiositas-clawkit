"use client";

import { useState, useRef, useEffect } from "react";
import { animate } from "animejs";

interface ContactSectionProps {
  id?: string;
}

export default function ContactSection({ id = "contact" }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate("#contact-title", {
              opacity: [0, 1],
              translateY: [30, 0],
              easing: "easeOutExpo",
              duration: 800,
            });
            animate("#contact-form", {
              opacity: [0, 1],
              translateY: [40, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: 200,
            });
            animate("#contact-info", {
              opacity: [0, 1],
              translateX: [-30, 0],
              easing: "easeOutExpo",
              duration: 800,
              delay: 400,
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-[#0a0f14] to-[#0d1318]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #14b8a6 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div id="contact-info" className="opacity-0">
            <h2
              id="contact-title"
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Get in Touch
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Ready to supercharge your workflow with AI agents? Let&apos;s talk about
              how CurioKit can help your team move faster.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400">hello@curiositas.studio</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Web</p>
                  <p className="text-gray-400">curiositas.studio</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-400">Rome, Italy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="opacity-0 bg-[#0f1419] rounded-2xl p-8 border border-gray-800/50"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-teal-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400">
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0a0f14] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#0a0f14] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0a0f14] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                    placeholder="Acme Inc."
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-[#0a0f14] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-[#0f1419] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
