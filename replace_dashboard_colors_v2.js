const fs = require('fs');

const files = [
    'src/app/dashboard/leads/page.tsx',
    'src/app/dashboard/inbox/page.tsx',
    'src/app/dashboard/knowledge/page.tsx',
    'src/app/page.tsx'
];

const replacements = [
    [/text-white/g, "text-foreground"],
    [/text-slate-400/g, "text-muted-foreground"],
    [/text-slate-200/g, "text-foreground"],
    [/text-slate-300/g, "text-muted-foreground"],
    [/text-slate-500/g, "text-muted-foreground/80"],
    [/text-indigo-400/g, "text-primary"],
    [/text-indigo-300/g, "text-primary/80"],
    [/text-indigo-200/g, "text-primary-foreground"],
    [/bg-slate-950\/50/g, "bg-background/50"],
    [/bg-slate-950\/80/g, "bg-background/80"],
    [/bg-slate-950/g, "bg-background"],
    [/bg-slate-900\/50/g, "bg-card/50"],
    [/bg-slate-900/g, "bg-card"],
    [/bg-slate-800/g, "bg-muted"],
    [/bg-indigo-500\/10/g, "bg-primary/10"],
    [/bg-indigo-500\/20/g, "bg-primary/20"],
    [/bg-indigo-500\/30/g, "bg-primary/30"],
    [/bg-indigo-500/g, "bg-primary"],
    [/bg-indigo-600/g, "bg-primary/90"],
    [/bg-indigo-700/g, "bg-primary/80"],
    [/bg-indigo-900/g, "bg-primary/20"],
    [/border-indigo-500\/20/g, "border-primary/20"],
    [/border-indigo-500\/50/g, "border-primary/50"],
    [/border-indigo-500/g, "border-primary"],
    [/border-white\/10/g, "border-border/50"],
    [/border-white\/5/g, "border-border/30"],
    [/border-white\/20/g, "border-border/50"],
    [/border-slate-800/g, "border-border/50"],
    [/border-slate-700/g, "border-border"],
    [/border-\[#1A1A1A\]/g, "border-border"],
    [/ring-indigo-500/g, "ring-primary"],
    [/shadow-indigo-500\/5/g, "shadow-primary/5"],
    [/shadow-indigo-500\/20/g, "shadow-primary/20"],
    [/shadow-\[0_0_20px_rgba\(79,70,229,0\.15\)\]/g, "shadow-[0_0_20px_rgba(209,188,255,0.15)]"],
    [/shadow-\[0_0_15px_rgba\(79,70,229,0\.3\)\]/g, "shadow-[0_0_15px_rgba(209,188,255,0.3)]"],
    [/from-indigo-900\/10/g, "from-primary/10"],
    [/hover:bg-slate-800/g, "hover:bg-muted"],
    [/hover:bg-slate-900\/80/g, "hover:bg-card/80"],
    [/bg-white\/5/g, "bg-muted"],
    [/hover:bg-white\/5/g, "hover:bg-muted"],
    [/hover:text-white/g, "hover:text-foreground"],
];

for (const file of files) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        for (const [pattern, repl] of replacements) {
            content = content.replace(pattern, repl);
        }
        // One specific fix for primary buttons that might end up with text-foreground instead of text-primary-foreground
        content = content.replace(/bg-primary\/90 text-foreground/g, 'bg-primary/90 text-primary-foreground');
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Replaced colors in ${file}`);
    }
}
