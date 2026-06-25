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
    PenSquare,
    Store,
    HelpCircle,
    Settings,
    LogOut,
    ShieldCheck,
    CheckCircle,
    Tag,
    Mail,
    BarChart3,
    CreditCard,
    ClipboardList,
    FileQuestion,
    User,
} from "lucide-react";

export type MenuItem = {
    name: string;
    icon: any;
    href?: string;
    color: string;
    section?: string;
    children?: MenuItem[];
    adminOnly?: boolean;
};

const traderMenus: MenuItem[] = [
    { section: "Main", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-purple-400" },
    { section: "Main", name: "Accounts", icon: FolderKanban, href: "/accounts", color: "text-blue-400" },
    { section: "Main", name: "Orders", icon: ClipboardList, href: "/orders", color: "text-cyan-400" },
    { section: "Main", name: "Challenges", icon: Trophy, href: "/challenges", color: "text-yellow-400" },
    { section: "Main", name: "Instant Account", icon: Zap, href: "/instant-account", color: "text-purple-400" },

    { section: "Trading", name: "Trade Dashboard", icon: TrendingUp, href: "/trade-dashboard", color: "text-green-400" },
    { section: "Trading", name: "Live Prices", icon: TrendingUp, href: "/live-price", color: "text-sky-400" },

    {
        section: "Money",
        name: "Payouts",
        icon: Wallet,
        color: "text-emerald-400",
        children: [
            { name: "Withdrawal", icon: Wallet, href: "/withdrawal", color: "text-emerald-400" },
            { name: "Certificates", icon: Award, href: "/certificates", color: "text-yellow-400" },
        ],
    },

    { section: "Community", name: "Affiliate", icon: Share2, href: "/affiliate", color: "text-purple-400" },
    { section: "Community", name: "Marketplace", icon: Store, href: "/marketplace", color: "text-emerald-400" },
    { section: "Community", name: "Blog", icon: PenSquare, href: "/blog", color: "text-pink-400" },
    { section: "Community", name: "News", icon: Megaphone, href: "/news", color: "text-blue-400" },

    { section: "Account", name: "Profile", icon: User, href: "/profile", color: "text-gray-300" },
    { section: "Account", name: "Settings", icon: Settings, href: "/settings", color: "text-gray-300" },
    { section: "Account", name: "Support", icon: HelpCircle, href: "/support", color: "text-blue-400" },
    { section: "Account", name: "FAQ", icon: FileQuestion, href: "/faq", color: "text-cyan-400" },
    { section: "Account", name: "Logout", icon: LogOut, href: "/logout", color: "text-red-400" },
];

const adminMenus: MenuItem[] = [
    { section: "Admin", name: "Admin Dashboard", icon: LayoutDashboard, href: "/admin", color: "text-purple-400", adminOnly: true },

    {
        section: "Admin",
        name: "User Management",
        icon: User,
        color: "text-green-400",
        adminOnly: true,
        children: [
            { name: "All Users", icon: User, href: "/admin/users", color: "text-green-400" },
            { name: "KYC Verification", icon: ShieldCheck, href: "/admin/kyc", color: "text-yellow-400" },
        ],
    },
    { section: "Admin", name: "Admin Dashboard", icon: LayoutDashboard, href: "/admin", color: "text-purple-400", adminOnly: true },
    { section: "Admin", name: "Account Approval", icon: CheckCircle, href: "/admin/account-approval", color: "text-blue-400", adminOnly: true },
    { section: "Admin", name: "Payout Approval", icon: Wallet, href: "/admin/payout-approval", color: "text-emerald-400", adminOnly: true },
    { section: "Admin", name: "Revenue Reports", icon: BarChart3, href: "/admin/revenue", color: "text-purple-400", adminOnly: true },
    { section: "Admin", name: "Coupons", icon: Tag, href: "/admin/coupons", color: "text-pink-400", adminOnly: true },
    { section: "Admin", name: "Email Templates", icon: Mail, href: "/admin/emails", color: "text-indigo-400", adminOnly: true },
    { section: "Admin", name: "Payment Gateway", icon: CreditCard, href: "/admin/payment", color: "text-cyan-400", adminOnly: true },
    { section: "Admin", name: "Admin Logs", icon: ClipboardList, href: "/admin/logs", color: "text-gray-400", adminOnly: true },
];

export const getMenuItems = (role: string) => {
    if (role === "admin") {
        return [...traderMenus, ...adminMenus];
    }

    return traderMenus;
};