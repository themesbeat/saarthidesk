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
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>

                        <p className="text-center mt-8 text-sm text-muted-foreground">
                            Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
