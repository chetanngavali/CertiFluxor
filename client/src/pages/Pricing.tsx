import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, Zap, Globe, Shield, Menu, Award, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Pricing() {
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
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="bg-slate-900 p-1.5 rounded-lg shadow-lg">
                            <Award className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">CertiFluxor</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Platform</Link>
                    <Link href="/docs" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Developers</Link>
                    <Link href="/pricing" className="text-sm font-medium text-slate-900 font-bold transition-colors">Pricing</Link>
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
                                        <Link href="/#features" className="text-2xl font-bold text-slate-900 tracking-tight">Platform</Link>
                                        <Link href="/pricing" className="text-2xl font-bold text-slate-900 tracking-tight">Pricing</Link>
                                        <Link href="/docs" className="text-2xl font-bold text-slate-900 tracking-tight">Developers</Link>
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

            <main className="flex-grow pt-32 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-6"
                    >
                        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 px-4 py-1.5 text-sm font-bold uppercase tracking-wider rounded-full">
                            Simple Pricing
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.95]"
                    >
                        Transparent pricing <br className="hidden md:block" /> for every scale.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed"
                    >
                        Start for free, scale as you grow. No hidden fees or long-term contracts.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-32">
                    {/* Free Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Developer</h3>
                            <p className="text-slate-500 mb-6 text-sm font-medium">Perfect for side projects and testing.</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black text-slate-900">$0</span>
                                <span className="text-slate-500 font-medium">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "100 Certificates / mo",
                                    "Basic Templates",
                                    "REST API Access",
                                    "Community Support",
                                    "Standard Branding"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/auth?mode=register">
                                <Button className="w-full bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 font-bold h-12 rounded-xl text-base">Start Building</Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Pro Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-4"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-bl-full -mr-8 -mt-8" />
                        <Badge className="bg-blue-600 hover:bg-blue-500 text-white border-none mb-6 px-3 py-1 text-xs font-bold uppercase tracking-wider relative z-10">Most Popular</Badge>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
                            <p className="text-slate-400 mb-6 text-sm font-medium">For scaling education providers.</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black text-white">$49</span>
                                <span className="text-slate-400 font-medium">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "10,000 Certificates / mo",
                                    "Custom Fonts & Assets",
                                    "Priority API Rate Limits",
                                    "Email Support",
                                    "White-label Verification URL",
                                    "Analytics Dashboard"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                                        <div className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/auth?mode=register">
                                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-900/20 text-base">Get Started</Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Enterprise Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                        <div className="relative z-10">
                            <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise</h3>
                            <p className="text-slate-500 mb-6 text-sm font-medium">For high-volume & compliance needs.</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-black text-slate-900">Custom</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                {[
                                    "Unlimited Issuance",
                                    "SLA (99.99% Uptime)",
                                    "Dedicated Success Manager",
                                    "SSO / SAML Integration",
                                    "On-premise Deployment Option",
                                    "Audit Logs"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                                        <div className="h-5 w-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                            <Check className="h-3 w-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact">
                                <Button className="w-full bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 font-bold h-12 rounded-xl text-base">Contact Sales</Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto mt-24 mb-32">
                    <h3 className="text-3xl font-black text-slate-900 mb-12 text-center tracking-tight">Frequently Asked Questions</h3>
                    <div className="grid md:grid-cols-2 gap-6 text-left">
                        {[
                            { q: "Can I exceed my limit?", a: "Yes, we charge a small overage fee per certificate. You'll never be blocked." },
                            { q: "Is there a setup fee?", a: "No, all plans include free onboarding and migration assistance." },
                            { q: "Do you offer educational discounts?", a: "Yes! Use your .edu email for 50% off the Growth plan." },
                            { q: "Is the API fully featured?", a: "Absolutely. Everything you can do in the UI, you can automate via API." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-bold text-slate-900 mb-2 text-lg">{faq.q}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-12 md:py-16 px-6 border-t border-slate-800 relative overflow-hidden">
                {/* Background Grid Pattern for Footer */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">

                    {/* Brand Column (Span 2) */}
                    <div className="lg:col-span-2 flex flex-col items-start gap-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-1.5 rounded-lg">
                                <Award className="h-5 w-5 text-white" />
                            </div>
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
