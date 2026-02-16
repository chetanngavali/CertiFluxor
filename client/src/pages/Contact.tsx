import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Mail, MessageSquare, Phone } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-xl tracking-tight uppercase">
                        FluxCert
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/pricing">
                            <Button variant="ghost" className="text-sm font-medium text-slate-600">Pricing</Button>
                        </Link>
                        <Link href="/auth?mode=login">
                            <Button variant="ghost" className="text-sm font-medium text-slate-600">Log in</Button>
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="grid md:grid-cols-2 min-h-[calc(100vh-64px)]">
                {/* Left: Contact Form */}
                <div className="flex items-center justify-center p-8 md:p-16 border-r border-slate-100">
                    <div className="max-w-md w-full">
                        <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Let's talk scale.</h1>
                        <p className="text-slate-500 mb-8 font-medium">Our team is ready to help you issue millions of credentials.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                                    <input type="text" id="firstName" className="w-full rounded-lg border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
                                    <input type="text" id="lastName" className="w-full rounded-lg border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Work Email</label>
                                <input type="email" id="email" className="w-full rounded-lg border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@company.com" />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-1">Company / Institution</label>
                                <input type="text" id="company" className="w-full rounded-lg border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Acme University" />
                            </div>

                            <div>
                                <label htmlFor="volume" className="block text-sm font-bold text-slate-700 mb-1">Anticipated Monthly Volume</label>
                                <select id="volume" className="w-full rounded-lg border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white">
                                    <option value="">Select volume...</option>
                                    <option value="1-100">1 - 100</option>
                                    <option value="100-1000">100 - 1,000</option>
                                    <option value="1000-10000">1,000 - 10,000</option>
                                    <option value="10000+">10,000+</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1">How can we help?</label>
                                <textarea id="message" rows={4} className="w-full rounded-lg border-slate-200 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                            </div>

                            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-slate-900/10">
                                Send Inquiry
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Right: Info */}
                <div className="bg-slate-50 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20"></div>

                    <div className="max-w-sm mx-auto relative z-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">Need immediate assistance?</h2>

                        <div className="space-y-8">
                            <div className="flex gap-4 items-start group">
                                <div className="h-10 w-10 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-0.5">Sales & Partnerships</h3>
                                    <a href="mailto:sales@fluxcert.com" className="text-slate-500 text-sm hover:text-blue-600 font-medium transition-colors">sales@fluxcert.com</a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start group">
                                <div className="h-10 w-10 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <MessageSquare className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-0.5">Technical Support</h3>
                                    <a href="mailto:support@fluxcert.com" className="text-slate-500 text-sm hover:text-green-600 font-medium transition-colors">support@fluxcert.com</a>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start group">
                                <div className="h-10 w-10 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Phone className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-0.5">Call Us</h3>
                                    <p className="text-slate-500 text-sm font-medium">+1 (888) 123-4567</p>
                                    <p className="text-xs text-slate-400 font-medium mt-1">Mon-Fri, 9am - 6pm EST</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-blue-600 rounded-2xl text-white shadow-xl shadow-blue-900/10">
                            <h4 className="font-bold text-lg mb-2">Developers?</h4>
                            <p className="text-blue-100 text-sm mb-4 font-medium leading-relaxed">Skip the sales talk. Create a free account and start issuing via API immediately.</p>
                            <Link href="/auth?mode=register">
                                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-bold h-10 rounded-lg text-sm">Create Developer Account</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
