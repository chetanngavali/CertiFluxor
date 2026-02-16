
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, ArrowLeft, Loader2, Github, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const authSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

export default function AuthPage() {
    const [location, setLocation] = useLocation();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // URL search params to determine tab
    const params = new URLSearchParams(window.location.search);
    const initialMode = params.get("mode") === "register" ? "register" : "login";
    const [activeTab, setActiveTab] = useState(initialMode);

    const loginForm = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "" },
    });

    const registerForm = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema),
        defaultValues: { username: "", password: "" },
    });

    const onLogin = async (data: AuthFormValues) => {
        setIsLoading(true);
        try {
            // Mock login for now since we're just building UI
            // In real implementation this calls fetch("/api/login")
            await new Promise(r => setTimeout(r, 1000));
            toast({
                title: "Welcome back!",
                description: "Successfully logged in to your dashboard.",
            });
            setLocation("/");
        } catch (err) {
            toast({
                title: "Authentication Failed",
                description: "Invalid username or password.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onRegister = async (data: AuthFormValues) => {
        setIsLoading(true);
        try {
            // Mock register
            await new Promise(r => setTimeout(r, 1200));
            toast({
                title: "Account Created",
                description: "Welcome to FluxCert! Let's build some certificates.",
            });
            setLocation("/");
        } catch (err) {
            toast({
                title: "Registration Failed",
                description: "Could not create account. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="mb-8 flex flex-col items-center">
                    <Link href="/landing" className="mb-6 self-start group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <div className="bg-primary p-3 rounded-2xl shadow-xl shadow-primary/20 mb-4 scale-110">
                        <Award className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase">FluxCert</h1>
                    <p className="text-muted-foreground text-center font-medium">Enterprise Certificate Infrastructure</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-slate-200/50 h-12 mb-6">
                        <TabsTrigger value="login" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
                        <TabsTrigger value="register" className="rounded-xl font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden">
                            <CardHeader className="pt-8 px-8 pb-4">
                                <CardTitle className="text-2xl">Welcome Back</CardTitle>
                                <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 space-y-4">
                                <Form {...loginForm}>
                                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                                        <FormField
                                            control={loginForm.control}
                                            name="username"
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="johndoe" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-primary/20" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-primary/20" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20">
                                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
                                        </Button>
                                    </form>
                                </Form>

                                <div className="relative py-4">
                                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-muted-foreground font-medium">Or continue with</span></div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 pb-4">
                                    <Button variant="outline" className="h-12 rounded-xl border-slate-200 gap-3 font-medium">
                                        <Github className="h-5 w-5" />
                                        GitHub Account
                                    </Button>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-slate-50/50 p-6 flex flex-col gap-4 border-t border-slate-100">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium justify-center">
                                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                                    Encrypted session & secure verification
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="register">
                        <Card className="rounded-[2rem] border-none shadow-2xl shadow-slate-200/50 overflow-hidden">
                            <CardHeader className="pt-8 px-8 pb-4">
                                <CardTitle className="text-2xl">Create Account</CardTitle>
                                <CardDescription>Get started with FluxCert today for free.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 space-y-4">
                                <Form {...registerForm}>
                                    <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                                        <FormField
                                            control={registerForm.control}
                                            name="username"
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Choose username" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-primary/20" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={registerForm.control}
                                            name="password"
                                            render={({ field }: { field: any }) => (
                                                <FormItem>
                                                    <FormLabel className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Min 6 characters" className="h-12 rounded-xl bg-slate-50/50 border-slate-200 focus:ring-primary/20" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl font-semibold shadow-lg shadow-primary/20">
                                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
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
    );
}
