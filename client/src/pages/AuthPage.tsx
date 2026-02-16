
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Github, ShieldCheck, Menu, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LogoIcon } from "@/components/ui/logo";

const authSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

import { useAuth } from "@/hooks/use-auth";

// ... (keep props and types)

export default function AuthPage() {
    const [location, setLocation] = useLocation();
    const { toast } = useToast();
    const { loginMutation, registerMutation, user } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            setLocation("/dashboard");
        }
    }, [user, setLocation]);

    // URL search params to determine tab
    const params = new URLSearchParams(window.location.search);
    const initialMode = params.get("mode") === "register" ? "register" : "login";
    const [activeTab, setActiveTab] = useState(initialMode);

    useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("mode", activeTab);
        window.history.pushState({}, "", url.toString());
    }, [activeTab]);

    const loginForm = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "" },
    });

    const registerForm = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "" },
    });

    const onLogin = async (data: AuthFormValues) => {
        try {
            await loginMutation.mutateAsync(data);
            // Redirect handled by useEffect [user] dependency or here
        } catch (err) {
            // Error handled by mutation onError
        }
    };

    const onRegister = async (data: AuthFormValues) => {
        try {
            await registerMutation.mutateAsync(data);
            // Redirect handled by useEffect [user] dependency
        } catch (err) {
            // Error handled by mutation onError
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-primary selection:text-white">
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
                    <Link href="/#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Platform</Link>
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

            <div className="flex-grow flex items-center justify-center p-6 pt-32 pb-24 relative overflow-hidden">
                {/* Background Orbs */}
                <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
                </div>

                <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="mb-8 flex flex-col items-center">
                        <div className="bg-white p-3 rounded-2xl shadow-xl shadow-slate-200/50 mb-4 scale-110">
                            <LogoIcon className="h-10 w-10" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase text-slate-900">CertiFluxor</h1>
                        <p className="text-slate-500 text-center font-medium">Enterprise Certificate Infrastructure</p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-slate-200/50 h-12 mb-6">
                            <TabsTrigger value="login" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
                            <TabsTrigger value="register" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
                                <CardHeader className="pt-8 px-8 pb-4">
                                    <CardTitle className="text-2xl text-slate-900">Welcome Back</CardTitle>
                                    <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 space-y-4">
                                    <Form {...loginForm}>
                                        <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                                            <FormField
                                                control={loginForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Username</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="johndoe" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-primary/20" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={loginForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-primary/20" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" disabled={loginMutation.isPending} className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20 bg-slate-900 hover:bg-slate-800 text-white">
                                                {loginMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
                                            </Button>
                                        </form>
                                    </Form>

                                    <div className="relative py-4">
                                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-muted-foreground font-medium">Or continue with</span></div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 pb-4">
                                        <Button variant="outline" className="h-12 rounded-xl border-slate-200 gap-3 font-medium text-slate-700 hover:bg-slate-50">
                                            <Github className="h-5 w-5" />
                                            GitHub Account
                                        </Button>
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-slate-50 p-6 flex flex-col gap-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium justify-center">
                                        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                        Encrypted session & secure verification
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="register">
                            <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
                                <CardHeader className="pt-8 px-8 pb-4">
                                    <CardTitle className="text-2xl text-slate-900">Create Account</CardTitle>
                                    <CardDescription>Get started with CertiFluxor today for free.</CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 space-y-4">
                                    <Form {...registerForm}>
                                        <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                                            <FormField
                                                control={registerForm.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Username</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Choose username" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-primary/20" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={registerForm.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Password</FormLabel>
                                                        <FormControl>
                                                            <Input type="password" placeholder="Min 6 characters" className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-primary/20" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit" disabled={registerMutation.isPending} className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20 bg-slate-900 hover:bg-slate-800 text-white">
                                                {registerMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
                                            </Button>
                                        </form>
                                    </Form>
                                    <p className="text-xs text-center text-muted-foreground px-4 leading-relaxed pb-4">
                                        By clicking "Create Account", you agree to our <span className="underline hover:text-primary cursor-pointer">Terms of Service</span> and <span className="underline hover:text-primary cursor-pointer">Privacy Policy</span>.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

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
