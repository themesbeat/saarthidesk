import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="pt-20 pb-10 border-t border-border/50 bg-background text-muted-foreground">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/saarthi-desk-logo.png" 
                alt="SaarthiDesk Logo" 
                width={156} 
                height={42} 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-xs leading-relaxed text-foreground0 max-w-xs">
              The AI-first communication platform for the next generation of India&apos;s enterprises.
            </p>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold text-xs mb-4 tracking-[0.1em] uppercase">Product</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link href="/unified-inbox" className="hover:text-foreground transition-colors">Unified Inbox</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">WhatsApp Automation</Link></li>
              <li><Link href="/ai-replies" className="hover:text-foreground transition-colors">AI Replies</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Knowledge Base</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Lead Management</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Analytics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold text-xs mb-4 tracking-[0.1em] uppercase">Solutions</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link href="/solutions/clinics" className="hover:text-foreground transition-colors">For Clinics</Link></li>
              <li><Link href="/solutions/salons" className="hover:text-foreground transition-colors">For Salons</Link></li>
              <li><Link href="/solutions/gyms" className="hover:text-foreground transition-colors">For Gyms</Link></li>
              <li><Link href="/solutions/real-estate" className="hover:text-foreground transition-colors">For Real Estate</Link></li>
              <li><Link href="/solutions/ecommerce" className="hover:text-foreground transition-colors">For Ecommerce</Link></li>
              <li><Link href="/solutions/coaching" className="hover:text-foreground transition-colors">For Coaching</Link></li>
              <li><Link href="/solutions/agencies" className="hover:text-foreground transition-colors">For Agencies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold text-xs mb-4 tracking-[0.1em] uppercase">Resources</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">API Docs</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Templates</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-foreground font-bold text-xs mb-4 tracking-[0.1em] uppercase">Company</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 text-center text-[10px] text-slate-600 font-medium">
          <p>© 2026 SaarthiDesk Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
