"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2, Sparkles } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const { error: authError } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/dashboard"
            });
            
            if (authError) {
                setError(authError.message || "Could not create account");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            console.error(err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError("");
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (err) {
            console.error(err);
            setError("Google sign-in failed. Please try again.");
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="w-full max-w-[900px] z-10 flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 text-center lg:text-left">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <Image 
                            src="/saarthi-desk-logo.png" 
                            alt="SaarthiDesk Logo" 
                            width={234} 
                            height={62} 
                            className="h-12 w-auto group-hover:scale-105 transition-transform"
                        />
                    </Link>
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-semibold text-primary mb-6">
                        <Sparkles className="w-3 h-3" />
                        JOIN 500+ SMBs
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                        Start Your 14-Day <span className="text-primary">Free Trial</span>
                    </h1>
                    
                    <p className="text-lg text-muted-foreground mb-8 max-w-md">
                        Get access to all premium features. No credit card required. Setup in less than 2 minutes.
                    </p>

                    <div className="space-y-4">
                        {[
                            'Unlimited AI Employee training',
                            'Unified WhatsApp & Instagram inbox',
                            '24/7 Intelligent customer support',
                            'Lead generation & qualification'
                        ].map(feature => (
                            <div key={feature} className="flex items-center gap-3 text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full max-w-[450px]">
                    <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-3xl p-8 shadow-2xl">

                        {/* Google Sign-In */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={googleLoading || loading}
                            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed mb-6"
                        >
                            {googleLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                            ) : (
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            )}
                            {googleLoading ? "Redirecting to Google…" : "Continue with Google"}
                        </button>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/50"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card/50 px-4 text-muted-foreground">Or sign up with email</span>
                            </div>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-5">
                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="text" 
                                        placeholder="John Doe" 
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-background/50 border border-border/50 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="email" 
                                        placeholder="name@company.com" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background/50 border border-border/50 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input 
                                        type="password" 
                                        placeholder="Min. 8 characters" 
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-background/50 border border-border/50 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading || googleLoading}
                                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>

                        <p className="text-center mt-6 text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
