import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
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
    X
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
    return (
        <div className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-white">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass-panel border-b border-border/40 px-4 md:px-10 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
                        <Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-foreground uppercase">FluxCert</span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    <a href="#features" className="text-sm font-bold text-slate-600 hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">Platform</a>
                    <a href="#api" className="text-sm font-bold text-slate-600 hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">API Docs</a>
                    <a href="#integrations" className="text-sm font-bold text-slate-600 hover:text-primary transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md px-2 py-1">Integrations</a>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/auth?mode=login">
                            <Button variant="ghost" className="text-sm font-bold hover:bg-slate-100 transition-colors px-6">Login</Button>
                        </Link>
                        <Link href="/auth?mode=register">
                            <Button className="text-sm font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all px-6">Get Started</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-xl" aria-label="Open Menu">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-[400px] p-10 flex flex-col pt-20">
                                <nav className="flex flex-col gap-6 items-start">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Navigation</h4>
                                    <a href="#features" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Platform</a>
                                    <a href="#api" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">API Docs</a>
                                    <a href="#integrations" className="text-3xl font-black tracking-tighter hover:text-primary transition-colors">Integrations</a>
                                    <div className="h-px w-full bg-slate-100 my-4" />
                                    <Link href="/auth?mode=login" className="w-full">
                                        <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold">Login</Button>
                                    </Link>
                                    <Link href="/auth?mode=register" className="w-full">
                                        <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">Get Started</Button>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="flex-grow pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-16 md:py-32 px-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="outline" className="mb-8 px-5 py-2 border-primary/30 bg-primary/5 text-primary rounded-full font-bold shadow-sm">
                                <Zap className="h-4 w-4 mr-2 fill-primary" />
                                Excel-to-Certificate Automation API
                            </Badge>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter mb-8 text-balance leading-[0.95] text-slate-900"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            Automate Your <span className="text-primary italic">Credential</span> Issuance at Scale
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto text-balance font-medium leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Transform Excel/CSV records into production-ready certificates. Deploy via REST API or our visual designer in minutes.
                        </motion.p>

                        <motion.div
                            className="flex flex-col items-center gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                                <Link href="/auth?mode=register" className="w-full sm:w-auto">
                                    <Button size="lg" className="h-16 px-12 text-xl font-bold rounded-2xl group shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all w-full sm:w-auto">
                                        Open Designer Studio
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-2xl bg-white/60 backdrop-blur-sm border-2 hover:bg-slate-50 active:scale-[0.97] transition-all w-full sm:w-auto">
                                    View API Docs
                                </Button>
                            </div>
                            <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                                Free for developers • No credit card required
                            </p>
                        </motion.div>

                        {/* Mockup Preview */}
                        <motion.div
                            className="mt-24 relative px-2"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-slate-50 to-transparent -z-20" />
                            <div className="glass-panel rounded-[2rem] p-3 md:p-5 border-white/40 shadow-3xl overflow-hidden aspect-[16/10] md:aspect-[16/9] max-w-5xl mx-auto ring-1 ring-slate-200/50">
                                <div className="bg-slate-900 w-full h-full rounded-[1.5rem] flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute top-4 left-6 hidden sm:flex gap-1.5 z-20">
                                        <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-sm" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-sm" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-sm" />
                                    </div>
                                    <div className="absolute top-4 inset-x-0 text-center text-white/10 font-black text-4xl sm:text-7xl uppercase tracking-[0.2em] select-none pointer-events-none">Visual Editor</div>

                                    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-16">
                                        <div className="w-full max-w-3xl aspect-[1.414/1] bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 sm:p-12 border-[8px] sm:border-[12px] border-white ring-1 ring-slate-100 group hover:border-primary/5 transition-all duration-700 scale-[0.85] sm:scale-100 origin-center">
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:20px_20px]" />
                                            <Award className="h-8 w-8 sm:h-14 sm:w-14 text-primary mb-4 sm:mb-8 opacity-90" />
                                            <h3 className="text-[10px] sm:text-xl font-black text-slate-800 uppercase tracking-[0.3em] mb-1 sm:mb-4 text-center">Certificate of Excellence</h3>
                                            <div className="w-12 sm:w-20 h-0.5 sm:h-1 bg-primary mb-4 sm:mb-10 rounded-full" />
                                            <p className="text-slate-400 italic mb-1 sm:mb-3 text-[8px] sm:text-xs uppercase font-bold tracking-[0.2em]">This is to certify that</p>
                                            <p className="text-xl sm:text-4xl font-serif text-slate-900 mb-4 sm:mb-12 border-b sm:border-b-2 border-slate-100 pb-1 sm:pb-3 px-8 sm:px-16 text-center">
                                                {"{{Name}}"}
                                            </p>
                                            <p className="text-slate-500 text-[8px] sm:text-sm max-w-[200px] sm:max-w-md text-center font-bold leading-relaxed">
                                                has successfully completed the <span className="text-slate-800 font-black">{"{{Course}}"}</span> course on <span className="text-slate-900 font-black">{"{{Date}}"}</span>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 md:py-32 px-6 bg-slate-50/50 border-y border-border/40 scroll-mt-16">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter mb-6 text-slate-900 uppercase">Built for <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Enterprise</span> Flow</h2>
                            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto font-medium">Production-ready infrastructure designed to bridge the gap between static data and professional credentials.</p>
                        </div>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {[
                                {
                                    icon: <FileSpreadsheet className="h-6 w-6" />,
                                    title: "Smart Excel Ingestion",
                                    label: "Administrator",
                                    desc: "Intelligent auto-header detection and dynamic field mapping. Upload your CSV and start issuing instantly within seconds."
                                },
                                {
                                    icon: <Layers className="h-6 w-6" />,
                                    title: "Visual Template Studio",
                                    label: "Designer",
                                    desc: "Robust drag-and-drop editor with dynamic text bindings, multi-layer support, and automated QR security signatures."
                                },
                                {
                                    icon: <Cpu className="h-6 w-6" />,
                                    title: "API & LMS Integrations",
                                    label: "Developer",
                                    desc: "Fast REST API with granular keys and webhooks. Connect FluxCert to your LMS, CRM, or custom application in minutes."
                                }
                            ].map((f, i) => (
                                <motion.div key={i} variants={fadeInUp}>
                                    <Card className="rounded-[2.5rem] border border-border/60 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden group hover:-translate-y-2 h-full bg-white flex flex-col">
                                        <CardContent className="p-10 md:p-12 flex flex-col h-full">
                                            <Badge variant="secondary" className="w-fit mb-8 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/5 border-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                                                {f.label}
                                            </Badge>
                                            <div className="bg-primary/5 w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 text-primary transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white shadow-sm">
                                                {f.icon}
                                            </div>
                                            <h3 className="text-2xl font-black mb-4 tracking-tighter text-slate-900 uppercase leading-none">{f.title}</h3>
                                            <p className="text-slate-600 leading-relaxed font-semibold text-lg">{f.desc}</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 md:py-32 px-4 sm:px-10 relative overflow-hidden backdrop-blur-3xl">
                    <motion.div
                        className="max-w-6xl mx-auto bg-slate-950 rounded-[3rem] md:rounded-[4rem] p-10 md:p-24 text-center relative border border-white/10 shadow-3xl overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <Badge variant="outline" className="mb-8 border-white/20 text-white/80 px-5 py-1.5 bg-white/5 rounded-full backdrop-blur-md uppercase tracking-[0.3em] text-[10px] font-black">
                                Production Ready
                            </Badge>
                            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-[0.02em] leading-[0.9] uppercase">Ready to automate your <span className="text-primary italic">graduates</span>?</h2>
                            <p className="text-slate-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-bold leading-relaxed">Join 500+ institutions issuing 10k+ professional certificates per month.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                                <Link href="/auth?mode=register" className="w-full sm:w-auto">
                                    <Button size="lg" className="h-18 px-14 text-2xl font-black rounded-2xl shadow-2xl shadow-primary/40 transition-all hover:scale-[1.05] active:scale-[0.95] w-full bg-primary hover:bg-primary/90 text-white uppercase tracking-tighter">
                                        Start Free Now
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="h-18 px-14 text-2xl font-black rounded-2xl text-white border-white/10 hover:bg-white/5 active:scale-[0.95] transition-all w-full sm:w-auto uppercase tracking-tighter">
                                    Talk to Sales
                                </Button>
                            </div>

                            <div className="mt-24 border-t border-white/10 pt-16 w-full">
                                <p className="text-white/40 text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-12">Trusted Infrastructure Partner</p>
                                <div className="flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-20 gap-y-10">
                                    {["UNIVERSITY", "BOOTCAMP.IO", "LMSFLOW", "TECHCORP"].map((brand, idx) => (
                                        <div key={idx} className="text-white/30 hover:text-white/90 transition-all duration-500 font-black text-xl sm:text-3xl tracking-tighter cursor-default group uppercase">
                                            {brand.split('.').map((part, pIdx) => (
                                                <span key={pIdx} className={pIdx === 0 ? "group-hover:text-primary transition-colors" : ""}>{part}</span>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
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
                                { name: "API Reference", href: "#" },
                                { name: "SDKs", href: "#" },
                                { name: "Guides", href: "#", icon: true },
                                { name: "Status", href: "#" }
                            ]
                        },
                        {
                            title: "Company",
                            links: [
                                { name: "Philosophy", href: "#" },
                                { name: "B2B Scale", href: "#" },
                                { name: "Compliance", href: "#" },
                                { name: "Contact", href: "#" }
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
