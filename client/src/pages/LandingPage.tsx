
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Award,
    ShieldCheck,
    Zap,
    Layers,
    ArrowRight,
    CheckCircle2,
    FileSpreadsheet,
    Cpu
} from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 glass-panel border-b border-border/40 px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
                        <Award className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-foreground uppercase">FluxCert</span>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Platform</a>
                    <a href="#api" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">API Docs</a>
                    <a href="#integrations" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Integrations</a>
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/auth?mode=login">
                        <Button variant="ghost" className="text-sm font-semibold">Login</Button>
                    </Link>
                    <Link href="/auth?mode=register">
                        <Button className="text-sm font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">Get Started</Button>
                    </Link>
                </div>
            </header>

            <main className="flex-grow pt-16">
                {/* Hero Section */}
                <section className="relative overflow-hidden py-24 px-6">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px]" />
                    </div>

                    <div className="max-w-7xl mx-auto text-center">
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full animate-in fade-in slide-in-from-bottom-3 duration-700">
                            <Zap className="h-3.5 w-3.5 mr-2 fill-primary" />
                            Excel-to-Certificate Automation API
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000 leading-[1.1]">
                            Automate Your <span className="text-primary italic">Credential</span> Issuance at Scale
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance animate-in fade-in slide-in-from-bottom-5 duration-1000">
                            Transform Excel/CSV records into production-ready certificates. Deploy via REST API or our visual designer in minutes.
                        </p>
                        <div className="flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/auth?mode=register">
                                    <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-2xl group shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                                        Open Designer Studio
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold rounded-2xl bg-white/50 backdrop-blur-sm border-2 hover:bg-white/80 active:scale-95 transition-all">
                                    View API Docs
                                </Button>
                            </div>
                            <p className="text-xs font-medium text-muted-foreground/60 tracking-wide uppercase">
                                Free for developers • No credit card required
                            </p>
                        </div>

                        {/* Mockup Preview */}
                        <div className="mt-20 relative animate-in fade-in zoom-in-95 duration-1000 delay-300">
                            <div className="absolute inset-0 bg-primary/5 rounded-[2rem] -rotate-2 -z-10 scale-105 blur-2xl" />
                            <div className="glass-panel rounded-[2rem] p-4 p-x-0 border-white/40 shadow-2xl overflow-hidden aspect-[16/9] max-w-5xl mx-auto ring-1 ring-border/10">
                                <div className="bg-slate-900 w-full h-full rounded-[1.5rem] flex items-center justify-center relative">
                                    <div className="absolute top-4 left-6 flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
                                    </div>
                                    <div className="text-white/10 font-black text-6xl uppercase tracking-[0.2em] select-none text-center">Visual Editor</div>
                                    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                                        <div className="w-full max-w-3xl aspect-[1.414/1] bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center p-8 border-[12px] border-slate-100 group hover:border-primary/20 transition-colors duration-500">
                                            <Award className="h-12 w-12 text-primary mb-6 opacity-80" />
                                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-[0.2em] mb-2">Certificate of Completion</h3>
                                            <div className="w-16 h-1 bg-primary mb-8 rounded-full" />
                                            <p className="text-slate-400 italic mb-2 text-xs uppercase font-bold tracking-widest">This is to certify that</p>
                                            <p className="text-3xl font-serif text-slate-900 mb-8 border-b-2 border-slate-100 pb-2 px-12">
                                                {"{{Name}}"}
                                            </p>
                                            <p className="text-slate-500 text-sm max-w-sm text-center font-medium leading-relaxed">
                                                has successfully completed the <span className="text-slate-800 font-bold">{"{{Course}}"}</span> course on <span className="text-slate-800">{"{{Date}}"}</span>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-24 px-6 bg-slate-50/50 border-y border-border/40">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Built for <span className="text-primary italic underline decoration-primary/20 underline-offset-8 transition-all hover:decoration-primary/50">Enterprise</span> Scale</h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Powerful infrastructure designed to bridge the gap between static data and meaningful credentials.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <FileSpreadsheet className="h-6 w-6 text-primary" />,
                                    title: "Smart Excel Ingestion",
                                    label: "For Admins",
                                    desc: "Intelligent auto-header detection and dynamic field mapping. Upload your CSV and start issuing instantly."
                                },
                                {
                                    icon: <Layers className="h-6 w-6 text-primary" />,
                                    title: "Visual Template Studio",
                                    label: "For Designers",
                                    desc: "Robust drag-and-drop editor with dynamic text bindings, rich media support, and automated QR signatures."
                                },
                                {
                                    icon: <Cpu className="h-6 w-6 text-primary" />,
                                    title: "API & LMS Integrations",
                                    label: "For Developers",
                                    desc: "Production-ready REST API with granular API keys and webhooks to connect your LMS or Event platform."
                                }
                            ].map((f, i) => (
                                <Card key={i} className="rounded-[2rem] border border-border/40 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden group hover:-translate-y-1">
                                    <CardContent className="p-10 flex flex-col h-full">
                                        <Badge variant="secondary" className="w-fit mb-6 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 border-primary/10">
                                            {f.label}
                                        </Badge>
                                        <div className="bg-primary/5 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                                            {f.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 tracking-tight">{f.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed text-[15px]">{f.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 px-6 relative overflow-hidden backdrop-blur-3xl">
                    <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3.5rem] p-12 md:p-24 text-center relative border border-white/5 shadow-3xl">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />

                        <div className="relative z-10">
                            <Badge variant="outline" className="mb-8 border-white/20 text-white/60 px-4 py-1.5 bg-white/5 rounded-full backdrop-blur-sm uppercase tracking-widest text-[10px] font-bold">
                                Enterprise Readiness
                            </Badge>
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Ready to automate your <span className="text-primary italic">graduates</span>?</h2>
                            <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-medium">Issue 10,000+ certificates per month with confidence. Professional, secure, and fully automated.</p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                                <Link href="/auth?mode=register">
                                    <Button size="lg" className="h-16 px-12 text-xl font-extrabold rounded-2xl shadow-2xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95">
                                        Get Started for Free
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold rounded-2xl text-white border-white/10 hover:bg-white/5 transition-all active:scale-95">
                                    Talk to Sales
                                </Button>
                            </div>

                            <div className="mt-20 border-t border-white/5 pt-16">
                                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em] mb-10">Trusted by modern institutions</p>
                                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
                                    <div className="text-white font-black text-2xl tracking-tighter group cursor-default">
                                        <span className="text-primary">UNI</span>VERSITY
                                    </div>
                                    <div className="text-white font-black text-2xl tracking-tighter group cursor-default">
                                        BOOT<span className="text-primary">CAMP</span>.IO
                                    </div>
                                    <div className="text-white font-black text-2xl tracking-tighter group cursor-default">
                                        LMS<span className="text-primary">FLOW</span>
                                    </div>
                                    <div className="text-white font-black text-2xl tracking-tighter group cursor-default">
                                        TECH<span className="text-primary">CORP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-background border-t border-border/40 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-8">
                            <Award className="h-6 w-6 text-primary shadow-sm" />
                            <span className="text-2xl font-black tracking-tighter uppercase">FluxCert</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-medium">
                            The infrastructure layer for high-fidelity verifiable credentials. Bridging Excel data to professional certification via REST API.
                        </p>
                        <div className="flex items-center gap-5">
                            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm">
                                <Zap className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm">
                                <Cpu className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-foreground/80">Platform</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-semibold">
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">Templates</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1 text-primary/80 flex items-center gap-2">Designer Studio <Badge className="text-[8px] h-4 px-1 bg-primary/10 text-primary border-none">Beta</Badge></a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">Excel Automation</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">Security Vault</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-foreground/80">Developers</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-semibold">
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">API Reference</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">SDKs & Libraries</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1 flex items-center gap-2">Integration Guides <CheckCircle2 className="h-3 w-3 text-green-500" /></a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">System Status</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest mb-8 text-foreground/80">Company</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground font-semibold">
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">About FluxCert</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">B2B Solutions</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">Trust Center</a></li>
                            <li><a href="#" className="hover:text-primary transition-all hover:pl-1">Contact Sales</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">© 2026 FluxCert Inc. Production-ready Certificate Infrastructure.</p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-xs font-black text-muted-foreground hover:text-primary transition-all uppercase tracking-tighter">Twitter</a>
                        <a href="#" className="text-xs font-black text-muted-foreground hover:text-primary transition-all uppercase tracking-tighter">LinkedIn</a>
                        <a href="#" className="text-xs font-black text-muted-foreground hover:text-primary transition-all uppercase tracking-tighter">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
