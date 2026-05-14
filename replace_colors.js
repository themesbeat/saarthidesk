const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const replacements = [
    [/bg-\[\#111111\]/g, "bg-background"],
    [/text-slate-50/g, "text-foreground"],
    [/selection:bg-\[\#9b87f5\]\/30/g, "selection:bg-primary/30"],
    [/bg-\[\#E5D9F2\]/g, "bg-primary"],
    [/text-\[\#4A3B7C\]/g, "text-primary-foreground"],
    [/bg-\[\#D4C4FF\]/g, "bg-primary/90"],
    [/bg-\[\#1A1A1A\]/g, "bg-card/80 backdrop-blur-xl"],
    [/border-white\/10/g, "border-border/50"],
    [/border-white\/5/g, "border-border/50"],
    [/bg-\[\#2A2145\]/g, "bg-primary/20"],
    [/border-\[\#4E3984\]/g, "border-primary/30"],
    [/text-\[\#D4C4FF\]/g, "text-primary"],
    [/bg-\[\#222222\]/g, "bg-muted/80 backdrop-blur-lg"],
    [/bg-\[\#161616\]/g, "bg-background"],
    [/bg-\[\#e6dfff\]/g, "bg-primary"],
    [/text-\[\#332266\]/g, "text-primary-foreground"],
    [/text-\[\#665599\]/g, "text-primary-foreground/80"],
    [/text-\[\#9b87f5\]/g, "text-primary"],
    [/bg-\[\#9b87f5\]/g, "bg-primary"],
    [/bg-\[\#0f0f0f\]/g, "bg-background"],
    [/bg-gradient-to-br from-\[\#332266\] to-\[\#1a4080\]/g, "bg-gradient-to-br from-primary/30 to-secondary/30"],
    [/text-\[\#c3d2f0\]/g, "text-muted-foreground"],
    [/bg-\[\#3366cc\]\/20/g, "bg-secondary/20"],
    [/hover:bg-\[\#3366cc\]\/40/g, "hover:bg-secondary/40"],
    [/shadow-\[0_0_50px_rgba\(51,34,102,0\.5\)\]/g, "shadow-[0_0_50px_rgba(209,188,255,0.15)]"],
    [/shadow-\[0_0_10px_rgba\(155,135,245,0\.3\)\]/g, "shadow-[0_0_10px_rgba(209,188,255,0.3)]"]
];

for (const [pattern, repl] of replacements) {
    content = content.replace(pattern, repl);
}

fs.writeFileSync('src/app/page.tsx', content, 'utf8');
console.log('Colors replaced successfully!');
