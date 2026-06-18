import {
    LayoutDashboard,
    FolderKanban,
    Trophy,
    Zap,
    TrendingUp,
    Wallet,
    Award,
    Share2,
    Megaphone,
    HelpCircle,
    Settings,
    LogOut,
    Users,
    ShieldCheck,
    CheckCircle,
    Tag,
    Mail,
    BarChart3,
    CreditCard,
    ClipboardList,
    FileQuestion
} from "lucide-react";

export type MenuItem = {
    name: string;
    icon: any;
    href?: string;
    color: string;
    children?: MenuItem[];
    adminOnly?: boolean;
};

// ============ TRADER MENUS ============
const traderMenus: MenuItem[] = [
    // Main
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-500" },
    { name: "Accounts", icon: FolderKanban, href: "/accounts", color: "text-orange-500" },
    { name: "Challenges", icon: Trophy, href: "/challenges", color: "text-yellow-500" },
    { name: "Instant Account", icon: Zap, href: "/instant-account", color: "text-purple-500" },
    // Separator
    { name: "separator", icon: null, href: "", color: "" },
    // Trading
    { name: "Trade Dashboard", icon: TrendingUp, href: "/trade-dashboard", color: "text-cyan-500" },
    { name: "Live Prices", icon: TrendingUp, href: "/live-price", color: "text-sky-500" },
    // Separator
    { name: "separator", icon: null, href: "", color: "" },
    // Payouts with children
    {
        name: "Payouts",
        icon: Wallet,
        color: "text-emerald-500",
        children: [
            { name: "Withdrawal", icon: Wallet, href: "/withdrawal", color: "text-emerald-500" },
            { name: "Certificates", icon: Award, href: "/certificates", color: "text-yellow-500" },
        ]
    },
    // Separator
    { name: "separator", icon: null, href: "", color: "" },
    // Community
    { name: "Leaderboard", icon: Trophy, href: "/leaderboard", color: "text-yellow-500" },
    { name: "Affiliate Program", icon: Share2, href: "/affiliate", color: "text-purple-500" },
    // Separator
    { name: "separator", icon: null, href: "", color: "" },
    // Content
    { name: "News", icon: Megaphone, href: "/news", color: "text-blue-500" },
    // Separator
    { name: "separator", icon: null, href: "", color: "" },
    // Support
    { name: "Support", icon: HelpCircle, href: "/support", color: "text-blue-400" },
    { name: "FAQ", icon: FileQuestion, href: "/faq", color: "text-cyan-500" },
    { name: "Settings", icon: Settings, href: "/settings", color: "text-gray-400" },
    { name: "Logout", icon: LogOut, href: "/logout", color: "text-red-400" },
];

// ============ ADMIN MENUS ============
const adminMenus: MenuItem[] = [
    {
        name: "User Management",
        icon: Users,
        color: "text-green-500",
        adminOnly: true,
        children: [
            { name: "All Users", icon: Users, href: "/admin/users", color: "text-green-500" },
            { name: "KYC Verification", icon: ShieldCheck, href: "/admin/kyc", color: "text-yellow-500" },
        ]
    },
    { name: "Account Approval", icon: CheckCircle, href: "/admin/account-approval", color: "text-blue-500", adminOnly: true },
    { name: "Payout Approval", icon: Wallet, href: "/admin/payout-approval", color: "text-emerald-500", adminOnly: true },
    { name: "Revenue Reports", icon: BarChart3, href: "/admin/revenue", color: "text-purple-500", adminOnly: true },
    { name: "Coupons", icon: Tag, href: "/admin/coupons", color: "text-pink-500", adminOnly: true },
    { name: "Email Templates", icon: Mail, href: "/admin/emails", color: "text-indigo-500", adminOnly: true },
    { name: "Payment Gateway", icon: CreditCard, href: "/admin/payment", color: "text-cyan-500", adminOnly: true },
    { name: "News Management", icon: Megaphone, href: "/admin/news", color: "text-blue-500", adminOnly: true },
    { name: "Admin Logs", icon: ClipboardList, href: "/admin/logs", color: "text-gray-500", adminOnly: true },
];

export const getMenuItems = (role: string) => {
    if (role === 'admin') {
        return [...traderMenus, ...adminMenus];
    }
    return traderMenus;
};