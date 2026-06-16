import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Trophy,
    Wallet,
    Settings,
    HelpCircle,
    FileQuestion,
    TrendingUp,
    Zap,
    ShieldCheck,
    CheckCircle,
    Gift,
    Tag,
    Mail,
    BarChart3,
    CreditCard,
    AlertTriangle,
    ClipboardList
} from "lucide-react";

export type MenuItem = {
    name: string;
    icon: any;
    href?: string;
    color: string;
    children?: MenuItem[];
    adminOnly?: boolean;
};

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
    { name: "Admin Logs", icon: ClipboardList, href: "/admin/logs", color: "text-gray-500", adminOnly: true },
];

// ============ TRADER MENUS ============
const traderMenus: MenuItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-blue-500" },
    { name: "Users", icon: Users, href: "/users", color: "text-green-500" },  // ← TAMBAH USERS
    { name: "Accounts", icon: FolderKanban, href: "/accounts", color: "text-orange-500" },
    { name: "Challenges", icon: Trophy, href: "/challenges", color: "text-yellow-500" },
    { name: "Instant Account", icon: Zap, href: "/instant-account", color: "text-purple-500" },
    { name: "Trade Dashboard", icon: TrendingUp, href: "/trade-dashboard", color: "text-orange-500" },
    { name: "Live Price", icon: TrendingUp, href: "/live-price", color: "text-sky-500" },
    { name: "Payouts", icon: Wallet, href: "/payouts", color: "text-emerald-500" },
    { name: "FAQ", icon: FileQuestion, href: "/faq", color: "text-cyan-500" },
    { name: "Support", icon: HelpCircle, href: "/support", color: "text-blue-400" },
    { name: "Settings", icon: Settings, href: "/settings", color: "text-gray-400" },
    { name: "Withdrawal", icon: Wallet, href: "/withdrawal", color: "text-emerald-500" },
];

// ============ GET MENU BY ROLE ============
export const getMenuItems = (role: string) => {
    // Force admin menu for test@gmail.com
    if (role === 'admin' || role === 'trader') {
        return [...traderMenus, ...adminMenus];
    }
    return traderMenus;
};