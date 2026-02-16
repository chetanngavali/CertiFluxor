import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, X, Shield, Zap, Globe, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-primary selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-xl tracking-tight uppercase">
                        FluxCert
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/auth?mode=login">
                            <Button variant="ghost" className="text-sm font-medium">Log in</Button>
                        </Link>
                        <Link href="/auth?mode=register">
                            <Button className="bg-slate-900 text-white hover:bg-slate-800">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center mb-20">
                    <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-4 py-1 text-sm font-bold uppercase tracking-wider">
                        Pricing
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Simple, transparent pricing <br className="hidden md:block" /> for every scale.
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                        Choose the plan that fits your issuance volume. Change or cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Free Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap className="h-24 w-24 text-slate-900" />
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
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                    <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link href="/auth?mode=register">
                            <Button className="w-full bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 font-bold h-12 rounded-xl">Start Building</Button>
                        </Link>
                    </motion.div>

                    {/* Pro Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden transform md:-translate-y-4"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Globe className="h-24 w-24 text-white" />
                        </div>
                        <Badge className="bg-blue-600 hover:bg-blue-600 text-white border-none mb-6 px-3 py-1 text-xs font-bold uppercase tracking-wider">Most Popular</Badge>
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
                            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-900/20">Get Started</Button>
                        </Link>
                    </motion.div>

                    {/* Enterprise Tier */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Shield className="h-24 w-24 text-slate-900" />
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
                                <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                    <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Check className="h-3 w-3" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Link href="/contact">
                            <Button className="w-full bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 font-bold h-12 rounded-xl">Contact Sales</Button>
                        </Link>
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto mt-24 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        {[
                            { q: "Can I exceed my limit?", a: "Yes, we charge a small overage fee per certificate. You'll never be blocked." },
                            { q: "Is there a setup fee?", a: "No, all plans include free onboarding and migration assistance." },
                            { q: "Do you offer educational discounts?", a: "Yes! Use your .edu email for 50% off the Growth plan." },
                            { q: "Is the API fully featured?", a: "Absolutely. Everything you can do in the UI, you can automate via API." }
                        ].map((faq, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                                <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="bg-white border-t border-slate-100 py-12 mt-24">
                <div className="container mx-auto px-6 text-center text-slate-400 text-sm font-medium">
                    © 2026 FluxCert Inc. Production-ready Infrastructure.
                </div>
            </footer>
        </div>
    );
}
