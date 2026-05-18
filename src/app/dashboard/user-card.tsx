"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Loader2 } from "lucide-react";

interface UserCardProps {
  name: string;
  email: string;
  image?: string;
  initials: string;
}

export default function UserCard({ name, email, image, initials }: UserCardProps) {
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    } catch (err) {
      console.error("[Logout] Error:", err);
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-muted p-3 rounded-xl border border-border/50 group relative">
      <div className="relative shrink-0">
        <Avatar className="w-10 h-10 border border-border/50">
          <AvatarImage src={image || undefined} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{email}</p>
      </div>
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        title="Sign out"
        className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-rose-400 hover:bg-rose-500/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loggingOut ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <LogOut className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
