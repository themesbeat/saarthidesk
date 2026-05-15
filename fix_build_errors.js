const fs = require('fs');

function replaceFileContent(file, replacements) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        for (const [pattern, repl] of replacements) {
            content = content.replace(pattern, repl);
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}

// 1. src/app/dashboard/inbox/page.tsx
replaceFileContent('src/app/dashboard/inbox/page.tsx', [
    [/import \{ Tabs, TabsContent, TabsList, TabsTrigger \} from "\@\/components\/ui\/tabs";/, 'import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";'],
    [/import \{\s*Search, Filter, MoreVertical, Phone, Video,\s*Info, Paperclip, Smile, Send, Bot, Check, CheckCheck,\s*Camera, Mail, MessageCircle, Globe\s*\} from "lucide-react";/, 'import {\n  Search, Filter, MoreVertical, Phone,\n  Paperclip, Smile, Send, Bot, CheckCheck,\n  Camera, MessageCircle, Globe\n} from "lucide-react";'],
    [/It's perfectly suited/g, "It&apos;s perfectly suited"],
]);

// 2. src/app/dashboard/knowledge/page.tsx
replaceFileContent('src/app/dashboard/knowledge/page.tsx', [
    [/import \{ FileText, UploadCloud, Link as LinkIcon, Plus, Trash2, Search, Book, CheckCircle2 \} from "lucide-react";/, 'import { FileText, UploadCloud, Link as LinkIcon, Trash2, Search, Book, CheckCircle2 } from "lucide-react";'],
]);

// 3. src/app/dashboard/leads/page.tsx
replaceFileContent('src/app/dashboard/leads/page.tsx', [
    [/import \{ Avatar, AvatarFallback, AvatarImage \} from "\@\/components\/ui\/avatar";/, 'import { Avatar, AvatarFallback } from "@/components/ui/avatar";'],
    [/function LeadCard\(\{ name, source, value, daysAgo, tags, needsFollowUp = false \}: any\) \{/, 'function LeadCard({ name, source, value, daysAgo, tags, needsFollowUp = false }: { name: string, source: string, value: string, daysAgo: string, tags: string[], needsFollowUp?: boolean }) {']
]);

// 4. src/app/dashboard/page.tsx
replaceFileContent('src/app/dashboard/page.tsx', [
    [/It's/g, "It&apos;s"],
    [/Here's/g, "Here&apos;s"],
    [/here's/g, "here&apos;s"],
    [/"Automate WhatsApp, Instagram, and Website chat."/g, "&quot;Automate WhatsApp, Instagram, and Website chat.&quot;"],
    [/"/g, (match, offset, string) => {
        // Only replace quotes that are inside JSX text. A naive approach is to replace specific known strings.
        return match;
    }]
]);

// Let's do more targeted string replacements for dashboard/page.tsx
let dashboardPageContent = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');
dashboardPageContent = dashboardPageContent.replace(/"Automate/g, "&quot;Automate");
dashboardPageContent = dashboardPageContent.replace(/chat."/g, "chat.&quot;");
dashboardPageContent = dashboardPageContent.replace(/What's/g, "What&apos;s");
dashboardPageContent = dashboardPageContent.replace(/Let's/g, "Let&apos;s");
fs.writeFileSync('src/app/dashboard/page.tsx', dashboardPageContent, 'utf8');


// 5. src/app/page.tsx
let pageContent = fs.readFileSync('src/app/page.tsx', 'utf8');
pageContent = pageContent.replace(/It's/g, "It&apos;s");
pageContent = pageContent.replace(/it's/g, "it&apos;s");
pageContent = pageContent.replace(/We've/g, "We&apos;ve");
pageContent = pageContent.replace(/we've/g, "we&apos;ve");
pageContent = pageContent.replace(/They've/g, "They&apos;ve");
pageContent = pageContent.replace(/they've/g, "they&apos;ve");
pageContent = pageContent.replace(/You're/g, "You&apos;re");
pageContent = pageContent.replace(/you're/g, "you&apos;re");
pageContent = pageContent.replace(/Here's/g, "Here&apos;s");
pageContent = pageContent.replace(/Don't/g, "Don&apos;t");
pageContent = pageContent.replace(/don't/g, "don&apos;t");
pageContent = pageContent.replace(/What's/g, "What&apos;s");
pageContent = pageContent.replace(/Let's/g, "Let&apos;s");

pageContent = pageContent.replace(/"We saw a 40% increase/g, "&quot;We saw a 40% increase");
pageContent = pageContent.replace(/without hiring more staff."/g, "without hiring more staff.&quot;");
pageContent = pageContent.replace(/"SaarthiDesk completely changed/g, "&quot;SaarthiDesk completely changed");
pageContent = pageContent.replace(/highly recommended!"/g, "highly recommended!&quot;");
pageContent = pageContent.replace(/"The AI is incredibly smart/g, "&quot;The AI is incredibly smart");
pageContent = pageContent.replace(/almost immediately."/g, "almost immediately.&quot;");

fs.writeFileSync('src/app/page.tsx', pageContent, 'utf8');
console.log("Updated page.tsx");
