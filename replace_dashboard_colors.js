const fs = require('fs');

let content = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');

const replacements = [
    [/text-white/g, "text-foreground"],
    [/text-slate-400/g, "text-muted-foreground"],
    [/text-slate-200/g, "text-foreground"],
    [/text-slate-500/g, "text-muted-foreground/80"],
    [/text-indigo-400/g, "text-primary"],
    [/bg-slate-900\/50/g, "bg-card/50"],
    [/bg-slate-800/g, "bg-popover"],
    [/hover:bg-slate-900\/80/g, "hover:bg-card/80"],
    [/bg-indigo-500\/20/g, "bg-primary/20"],
    [/bg-indigo-500\/40/g, "bg-primary/40"],
    [/border-indigo-500\/50/g, "border-primary/50"],
    [/border-white\/10/g, "border-border/50"],
    [/from-indigo-500\/40/g, "from-primary/40"]
];

for (const [pattern, repl] of replacements) {
    content = content.replace(pattern, repl);
}

fs.writeFileSync('src/app/dashboard/page.tsx', content, 'utf8');
console.log('Dashboard Page colors replaced successfully!');
