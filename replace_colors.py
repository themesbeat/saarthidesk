import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

replacements = {
    r"bg-\[\#111111\]": "bg-background",
    r"text-slate-50": "text-foreground",
    r"selection:bg-\[\#9b87f5\]/30": "selection:bg-primary/30",
    r"bg-\[\#E5D9F2\]": "bg-primary",
    r"text-\[\#4A3B7C\]": "text-primary-foreground",
    r"bg-\[\#D4C4FF\]": "bg-primary/90",
    r"bg-\[\#1A1A1A\]": "bg-card/80 backdrop-blur-xl",
    r"border-white/10": "border-border/50",
    r"border-white/5": "border-border/50",
    r"bg-\[\#2A2145\]": "bg-primary/20",
    r"border-\[\#4E3984\]": "border-primary/30",
    r"text-\[\#D4C4FF\]": "text-primary",
    r"bg-\[\#222222\]": "bg-muted/80 backdrop-blur-lg",
    r"bg-\[\#161616\]": "bg-background",
    r"bg-\[\#e6dfff\]": "bg-primary",
    r"text-\[\#332266\]": "text-primary-foreground",
    r"text-\[\#665599\]": "text-primary-foreground/80",
    r"text-\[\#9b87f5\]": "text-primary",
    r"bg-\[\#9b87f5\]": "bg-primary",
    r"bg-\[\#0f0f0f\]": "bg-background",
    r"bg-gradient-to-br from-\[\#332266\] to-\[\#1a4080\]": "bg-gradient-to-br from-primary/30 to-secondary/30",
    r"text-\[\#c3d2f0\]": "text-muted-foreground",
    r"bg-\[\#3366cc\]/20": "bg-secondary/20",
    r"hover:bg-\[\#3366cc\]/40": "hover:bg-secondary/40",
    r"shadow-\[0_0_50px_rgba\(51,34,102,0\.5\)\]": "shadow-[0_0_50px_rgba(209,188,255,0.15)]",
    r"shadow-\[0_0_10px_rgba\(155,135,245,0\.3\)\]": "shadow-[0_0_10px_rgba(209,188,255,0.3)]",
}

for pattern, repl in replacements.items():
    content = re.sub(pattern, repl, content)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
