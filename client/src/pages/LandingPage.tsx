import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import {
    Award,
    ShieldCheck,
    Zap,
    Layers,
    ArrowRight,
    CheckCircle2,
    FileSpreadsheet,
    Cpu,
    Menu,
    X,
    Code2,
    Lock,
    Globe,
    Activity
} from "lucide-react";

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LandingPage() {
    const [demoMode, setDemoMode] = useState<"visual" | "code">("visual");

    return (
        <div className="flex flex-col min-h-screen bg-white selection:bg-primary selection:text-white font-sans">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
            </div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-10 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-slate-900 p-1.5 rounded-lg shadow-lg">
                        <Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">FluxCert</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Platform</a>
                    <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Developers</Link>
                    <Link href="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Pricing</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3">
                        <Link href="/auth?mode=login">
                            <Button variant="ghost" className="text-sm font-medium hover:bg-slate-100 text-slate-700">Sign in</Button>
                        </Link>
                        <Link href="/auth?mode=register">
                            <Button className="text-sm font-bold shadow-lg shadow-slate-900/20 bg-slate-900 hover:bg-slate-800 text-white transition-all px-5 rounded-lg">Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-lg" aria-label="Open Menu">
                                    <Menu className="h-6 w-6 text-slate-700" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-[400px] p-6 flex flex-col pt-16 bg-white">
                                <nav className="flex flex-col gap-6 items-start">
                                    <div className="flex flex-col gap-4 w-full">
                                        <a href="#features" className="text-2xl font-bold text-slate-900 tracking-tight">Platform</a>
                                        <a href="#solutions" className="text-2xl font-bold text-slate-900 tracking-tight">Solutions</a>
                                        <a href="#developers" className="text-2xl font-bold text-slate-900 tracking-tight">Developers</a>
                                    </div>
                                    <div className="h-px w-full bg-slate-100 my-2" />
                                    <div className="flex flex-col gap-3 w-full">
                                        <Link href="/auth?mode=login" className="w-full">
                                            <Button variant="outline" className="w-full h-12 rounded-lg text-base font-semibold border-slate-200">Sign in</Button>
                                        </Link>
                                        <Link href="/auth?mode=register" className="w-full">
                                            <Button className="w-full h-12 rounded-lg text-base font-bold bg-slate-900 text-white hover:bg-slate-800">Get Started</Button>
                                        </Link>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-grow pt-20 relative z-10">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium mb-8">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                                New: SOC2 Type II Certified
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 text-slate-900 leading-[0.95]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            The Standard for <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Credentials</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Automate certificate issuance with our production-ready API and visual designer. Built for ambitious education and enterprise teams.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <Link href="/auth?mode=register">
                                <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 transition-all shadow-xl shadow-slate-900/20">
                                    Start Building
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/docs">
                                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 transition-all">
                                    Read Documentation
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Interactive Preview */}
                        <motion.div
                            className="relative max-w-5xl mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            {/* Toggle Switch */}
                            <div className="flex justify-center mb-8">
                                <div className="p-1.5 bg-slate-100/80 backdrop-blur-sm rounded-xl inline-flex shadow-inner border border-slate-200/50">
                                    <button
                                        onClick={() => setDemoMode("visual")}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${demoMode === "visual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                    >
                                        <Layers className="h-4 w-4" />
                                        Visual Designer
                                    </button>
                                    <button
                                        onClick={() => setDemoMode("code")}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${demoMode === "code" ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                                    >
                                        <Code2 className="h-4 w-4" />
                                        API Payload
                                    </button>
                                </div>
                            </div>

                            <div className="relative rounded-[2rem] border border-slate-200/60 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-900/5">
                                <div className="bg-slate-50/50 w-full h-[500px] md:h-[600px] flex items-center justify-center relative overflow-hidden">
                                    {/* Simple Window Controls */}
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-white border-b border-slate-100 flex items-center px-4 gap-2 z-20">
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {demoMode === "visual" ? (
                                            <motion.div
                                                key="visual"
                                                initial={{ opacity: 0, width: "95%" }}
                                                animate={{ opacity: 1, width: "100%" }}
                                                exit={{ opacity: 0, width: "95%" }}
                                                transition={{ duration: 0.4 }}
                                                className="w-full flex justify-center items-center p-8 pt-16"
                                            >
                                                <div className="w-full max-w-3xl aspect-[1.414/1] bg-white rounded-sm shadow-xl flex flex-col items-center justify-center p-12 border border-slate-200 relative">
                                                    <Award className="h-16 w-16 text-blue-600 mb-6" />
                                                    <h3 className="text-2xl font-serif text-slate-900 mb-2 font-bold tracking-tight">CERTIFICATE OF COMPLETION</h3>
                                                    <div className="w-16 h-1 bg-blue-600 mb-8" />
                                                    <p className="text-slate-500 text-sm uppercase tracking-widest font-medium mb-4">Presented to</p>
                                                    <p className="text-4xl font-serif text-slate-900 mb-8 italic">
                                                        Emily Johnson
                                                    </p>
                                                    <p className="text-slate-600 max-w-md text-center">
                                                        For successfully demonstrating mastery in <span className="text-slate-900 font-bold">Advanced Systems Architecture</span>.
                                                    </p>
                                                    <div className="absolute bottom-12 right-12 w-24 h-24 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
                                                        <Cpu className="h-10 w-10 text-slate-300" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="code"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-full max-w-3xl h-[400px] bg-[#0d1117] rounded-xl shadow-2xl border border-slate-800 p-6 flex flex-col font-mono text-xs sm:text-sm text-left overflow-hidden relative"
                                            >
                                                <div className="flex border-b border-slate-800 pb-4 mb-4 gap-4 text-slate-400">
                                                    <span className="text-blue-400 font-bold">POST</span> /v1/certificates/issue
                                                </div>
                                                <pre className="text-slate-300 overflow-visible">
                                                    <code>{`{
  "template_id": "tpl_8x92m4k2",
  "recipient": {
    "name": "Emily Johnson",
    "email": "emily@example.com",
    "metadata": {
      "course": "Advanced Systems Architecture",
      "grade": "A+",
      "issue_date": "2024-03-15"
    }
  },
  "options": {
    "format": "pdf",
    "delivery": "email_instant"
  }
}`}</code>
                                                </pre>
                                                <div className="absolute bottom-0 left-0 right-0 bg-[#0d1117]/90 backdrop-blur-sm p-4 border-t border-slate-800 flex justify-between items-center text-green-400">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        200 OK
                                                    </div>
                                                    <span className="text-slate-500">45ms</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Metrics / Trust Section */}
                <section className="py-20 border-y border-slate-100 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left items-center">
                            <div className="col-span-2 md:col-span-1">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Trusted by</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">500+ Teams</p>
                            </div>
                            <div className="col-span-2 md:col-span-3 flex flex-wrap gap-8 md:gap-16 items-center justify-center md:justify-end opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="text-xl font-black text-slate-800 flex items-center gap-2 rotate-0 hover:scale-110 transition-transform cursor-default"><Globe className="h-6 w-6" /> GlobalEdu</div>
                                <div className="text-xl font-black text-slate-800 flex items-center gap-2 rotate-0 hover:scale-110 transition-transform cursor-default"><Layers className="h-6 w-6" /> StackBuild</div>
                                <div className="text-xl font-black text-slate-800 flex items-center gap-2 rotate-0 hover:scale-110 transition-transform cursor-default"><Cpu className="h-6 w-6" /> TechFlow</div>
                                <div className="text-xl font-black text-slate-800 flex items-center gap-2 rotate-0 hover:scale-110 transition-transform cursor-default"><Zap className="h-6 w-6" /> FastCert</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 px-6 relative">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-slate-900">Infrastructure for the Modern Credential</h2>
                            <p className="text-slate-600 text-lg">We handle the complexity of rendering, signing, and delivering certificates so you can focus on education.</p>
                        </div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {[
                                {
                                    icon: <FileSpreadsheet className="h-6 w-6" />,
                                    title: "Bulk CSV Ingestion",
                                    desc: "Upload 1,000+ records and detect columns automatically. Our engine maps headers to template variables instantly."
                                },
                                {
                                    icon: <Layers className="h-6 w-6" />,
                                    title: "Pixel-Perfect Renderer",
                                    desc: "Our PDF engine ensures vectors are sharp and fonts are embedded correctly. No more blurry certificate exports."
                                },
                                {
                                    icon: <Code2 className="h-6 w-6" />,
                                    title: "Developer API",
                                    desc: "A clean REST API that fits into your CI/CD or LMS workflow. Webhooks notify you on successful delivery."
                                },
                                {
                                    icon: <ShieldCheck className="h-6 w-6" />,
                                    title: "Verifiable Security",
                                    desc: "Each certificate gets a unique, tamper-proof ID and QR code hosted on a permanent verification URL."
                                },
                                {
                                    icon: <Globe className="h-6 w-6" />,
                                    title: "Custom Domains",
                                    desc: "Serve certificates from credentials.yourdomain.com. Fully white-labeled experience for your brand."
                                },
                                {
                                    icon: <Activity className="h-6 w-6" />,
                                    title: "Analytics Dashboard",
                                    desc: "Track open rates, share rates, and LinkedIn adds. Understand the impact of your credential program."
                                }
                            ].map((f, i) => (
                                <motion.div key={i} variants={fadeInUp}>
                                    <div className="group p-8 rounded-2xl border border-slate-200 bg-white hover:border-blue-600/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                                        <div className="bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {f.icon}
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 text-slate-900">{f.title}</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm font-medium">{f.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                        {/* Abstract Shapes */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to scale your certification?</h2>
                            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">Join the platform powering the next generation of digital credentials. 99.99% uptime SLA available.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                                <Link href="/auth?mode=register">
                                    <Button className="h-14 px-8 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all w-full sm:w-auto">
                                        Start for Free
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-14 px-8 text-lg font-bold rounded-xl text-white border-white/10 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto bg-transparent">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-background border-t border-border/40 py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 md:gap-12">
                    <div className="flex flex-col items-start gap-8">
                        <div className="flex items-center gap-2">
                            <Award className="h-8 w-8 text-primary" />
                            <span className="text-3xl font-black tracking-tighter uppercase">FluxCert</span>
                        </div>
                        <p className="text-slate-600 text-lg leading-relaxed font-bold">
                            The infrastructure layer for high-fidelity verifiable credentials. Bridging Excel to automation.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Zap, Cpu, ShieldCheck].map((Icon, i) => (
                                <a key={i} href="#" className="h-12 w-12 flex items-center justify-center rounded-[1rem] bg-slate-50 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                    <Icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {[
                        {
                            title: "Platform",
                            links: [
                                { name: "Templates", href: "#" },
                                { name: "Designer Studio", href: "#", badge: "Beta" },
                                { name: "Excel Engine", href: "#" },
                                { name: "Cloud Vault", href: "#" }
                            ]
                        },
                        {
                            title: "Developers",
                            links: [
                                { name: "API Reference", href: "/docs" },
                                { name: "SDKs", href: "/docs" },
                                { name: "Guides", href: "/docs", icon: true },
                                { name: "Status", href: "#" }
                            ]
                        },
                        {
                            title: "Company",
                            links: [
                                { name: "Philosophy", href: "#" },
                                { name: "B2B Scale", href: "#" },
                                { name: "Compliance", href: "/terms" },
                                { name: "Contact", href: "/contact" }
                            ]
                        }
                    ].map((group, i) => (
                        <div key={i}>
                            <h4 className="font-black text-xs uppercase tracking-[0.2em] mb-10 text-slate-400">{group.title}</h4>
                            <ul className="space-y-6">
                                {group.links.map((link: any, j) => (
                                    <li key={j}>
                                        <a href={link.href} className="text-slate-600 hover:text-primary transition-all font-bold text-lg flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded pl-0 hover:pl-2">
                                            {link.name}
                                            {link.badge && <Badge className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-none font-black">{link.badge}</Badge>}
                                            {link.icon && <CheckCircle2 className="h-4 w-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                        © 2026 FluxCert Inc. Production-ready Infrastructure.
                    </p>
                    <div className="flex items-center gap-10">
                        {["Twitter", "LinkedIn", "GitHub"].map((social, i) => (
                            <a key={i} href="#" className="text-[10px] font-black text-slate-500 hover:text-primary transition-all uppercase tracking-[0.2em] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary p-1">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
}
