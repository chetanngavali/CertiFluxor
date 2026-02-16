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
import { LogoIcon } from "@/components/ui/logo";
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
    Type,
    Image as ImageIcon,
    QrCode,
    Variable,
    Settings,
    Activity,
    Twitter,
    Linkedin,
    Github
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
                <Link href="/">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <LogoIcon className="h-8 w-8 shadow-sm group-hover:scale-105 transition-transform" />
                        <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">CertiFluxor</span>
                    </div>
                </Link>

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
                            CertiFluxor automates certificate issuance with a production-ready API and visual designer. The enterprise infrastructure for digital credentials.
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
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.4 }}
                                                className="w-full h-full flex bg-slate-50/50"
                                            >
                                                {/* Simulated Editor Sidebar */}
                                                <div className="hidden md:flex w-16 border-r border-slate-200 bg-white flex-col items-center py-6 gap-6 z-10">
                                                    {[
                                                        { icon: <Type className="h-5 w-5" />, active: true },
                                                        { icon: <ImageIcon className="h-5 w-5" />, active: false },
                                                        { icon: <QrCode className="h-5 w-5" />, active: false },
                                                        { icon: <Variable className="h-5 w-5" />, active: false },
                                                        { icon: <Settings className="h-5 w-5" />, active: false }
                                                    ].map((tool, i) => (
                                                        <div key={i} className={`p-2.5 rounded-lg transition-all cursor-default ${tool.active ? "bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-200" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"}`}>
                                                            {tool.icon}
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Editor Canvas */}
                                                <div className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-hidden">
                                                    {/* Canvas Grid Background */}
                                                    <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5 }}></div>

                                                    {/* Certificate Container - Scaled Down */}
                                                    <div className="relative w-full max-w-[500px] bg-white shadow-2xl shadow-slate-200/60 aspect-[1.414/1] flex flex-col items-center justify-between p-8 border border-slate-100 transform transition-transform hover:scale-[1.01] duration-500">
                                                        {/* Ornamental Border */}
                                                        <div className="absolute inset-3 border-2 border-slate-100 pointer-events-none"></div>
                                                        <div className="absolute inset-5 border border-slate-200 pointer-events-none"></div>

                                                        {/* Header */}
                                                        <div className="text-center w-full mt-2">
                                                            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white mb-3 shadow-xl shadow-slate-900/10">
                                                                <Award className="h-4 w-4" />
                                                            </div>
                                                            <h3 className="text-xl font-serif font-bold text-slate-900 tracking-wide uppercase">Certificate of Mastery</h3>
                                                        </div>

                                                        {/* Dynamic Field: Recipient */}
                                                        <div className="relative group text-center w-full max-w-sm my-auto">
                                                            <div className="absolute -inset-x-4 -inset-y-2 border-2 border-dashed border-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none"></div>
                                                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-sm pointer-events-none">
                                                                Variable: {"{{recipient.name}}"}
                                                            </div>
                                                            <p className="font-serif text-4xl text-slate-900 italic font-medium relative z-0 tracking-tight">
                                                                Alex Morgan
                                                            </p>
                                                            <div className="h-px w-20 bg-slate-200 mx-auto mt-3"></div>
                                                        </div>

                                                        {/* Body Text */}
                                                        <div className="text-center max-w-xs mx-auto mb-4">
                                                            <p className="text-slate-500 text-xs leading-relaxed">
                                                                For outstanding performance in <strong className="text-slate-900">Enterprise Systems Architecture</strong>.
                                                            </p>
                                                            <p className="text-slate-400 text-[10px] mt-1 font-medium">Issued on Feb 16, 2026</p>
                                                        </div>

                                                        {/* Footer: Signature & QR */}
                                                        <div className="flex items-end justify-between w-full px-6 mb-1">
                                                            <div className="text-center">
                                                                <div className="font-serif italic text-xl text-slate-400 mb-1 transform -rotate-2">James Doe</div>
                                                                <div className="h-px w-20 bg-slate-300 mb-1"></div>
                                                                <p className="text-[8px] uppercase font-bold text-slate-400 tracking-widest">Instructor</p>
                                                            </div>

                                                            <div className="text-center">
                                                                <div className="bg-white p-1 border border-slate-100 shadow-sm inline-block mb-1">
                                                                    <QrCode className="h-10 w-10 text-slate-900" strokeWidth={1.5} />
                                                                </div>
                                                                <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">ID: 8X92M</p>
                                                            </div>
                                                        </div>

                                                        {/* Gold Seal - Smaller & Tucked */}
                                                        <div className="absolute top-10 right-10 hidden md:flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-full shadow-lg border border-amber-100">
                                                            <div className="absolute inset-1 border border-amber-200/50 rounded-full"></div>
                                                            <ShieldCheck className="h-7 w-7 text-amber-500/80" strokeWidth={1.5} />
                                                        </div>
                                                    </div>

                                                    {/* Floating Editor Palette - Positioned in Corner */}
                                                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200/60 p-4 hidden xl:block animate-in slide-in-from-right-8 duration-700 delay-300 w-56">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typography</span>
                                                                <Settings className="h-3 w-3 text-slate-300" />
                                                            </div>

                                                            <div className="space-y-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 font-serif text-xl font-bold">Aa</div>
                                                                    <div>
                                                                        <div className="text-xs font-bold text-slate-700">Playfair Display</div>
                                                                        <div className="text-[10px] text-slate-400 font-medium">Regular • 48px</div>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <div className="text-[10px] font-bold text-slate-400 mb-2">Color</div>
                                                                    <div className="flex gap-2">
                                                                        <div className="w-6 h-6 rounded-full bg-slate-900 ring-2 ring-offset-1 ring-slate-200 cursor-pointer"></div>
                                                                        <div className="w-6 h-6 rounded-full bg-blue-600 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-blue-200 transition-all"></div>
                                                                        <div className="w-6 h-6 rounded-full bg-emerald-600 cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-emerald-200 transition-all"></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                    <div className="group h-full p-8 rounded-2xl border border-slate-100 bg-white hover:border-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full pointer-events-none" />

                                        <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-6 text-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/20 relative z-10">
                                            {f.icon}
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">{f.title}</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm font-medium mb-6">{f.desc}</p>

                                        <div className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                            Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                        </div>
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
            <footer className="bg-slate-950 text-slate-400 py-12 md:py-16 px-6 border-t border-slate-800 relative overflow-hidden">
                {/* Background Grid Pattern for Footer */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">

                    {/* Brand Column (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <LogoIcon className="h-6 w-6" />
                            <span className="text-xl font-black tracking-tighter uppercase text-white">CertiFluxor</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                            The enterprise-grade infrastructure for generating, signing, and delivering verifiable credentials at scale.
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                            {[
                                { icon: Twitter, href: "#" },
                                { icon: Github, href: "#" },
                                { icon: Linkedin, href: "#" }
                            ].map((Social, i) => (
                                <a key={i} href={Social.href} className="h-8 w-8 flex items-center justify-center rounded-md bg-slate-900 border border-slate-800 text-slate-500 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all">
                                    <Social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-1">
                        <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Templates</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">Designer <Badge className="bg-blue-500/10 text-blue-400 border-none text-[10px] px-1 py-0 h-4">BETA</Badge></a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Excel Engine</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Verification</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Developers</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/docs" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                            <li><a href="/docs" className="hover:text-blue-400 transition-colors">Webhooks</a></li>
                            <li><a href="/docs" className="hover:text-blue-400 transition-colors">Status</a></li>
                            <li><a href="https://github.com/chetanngavali/CertiFluxor" target="_blank" className="hover:text-blue-400 transition-colors">Open Source</a></li>
                        </ul>
                    </div>

                    {/* Newsletter / CTA Column (Span 2) */}
                    <div className="lg:col-span-2 bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                        <h4 className="font-bold text-white text-sm mb-2">Stay updated</h4>
                        <p className="text-xs mb-4 text-slate-500">Subscribe for API updates and changelogs.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 placeholder:text-slate-600 h-9"
                            />
                            <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-200 font-bold h-9 px-4">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                    <p className="text-[10px] text-slate-600 font-medium">
                        © 2026 CertiFluxor Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-[10px] font-medium text-slate-600">
                        <a href="/terms" className="hover:text-white transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
