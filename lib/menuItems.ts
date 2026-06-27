import {
    LayoutDashboard,
    FolderKanban,
    Trophy,
    Zap,
    TrendingUp,
    Wallet,
    Award,
    Share2,
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
    Megaphone,
} from "lucide-react";

export type MenuItem = {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    color: string;
    section?: string;
    children?: MenuItem[];
    adminOnly?: boolean;
};

const iconColor = "text-violet-400";

const traderMenus: MenuItem[] = [
    { section: "Main", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: iconColor },
    { section: "Main", name: "Accounts", icon: FolderKanban, href: "/accounts", color: iconColor },
    { section: "Main", name: "Orders", icon: ClipboardList, href: "/orders", color: iconColor },

    { section: "Funding", name: "Challenges", icon: Trophy, href: "/challenges", color: iconColor },
    { section: "Funding", name: "Instant Account", icon: Zap, href: "/instant-account", color: iconColor },

    { section: "Finance", name: "Payouts", icon: Wallet, href: "/payouts", color: iconColor },
    { section: "Finance", name: "Certificates", icon: Award, href: "/certificates", color: iconColor },

    { section: "Tools", name: "Trade Dashboard", icon: TrendingUp, href: "/trade-dashboard", color: iconColor },
    { section: "Tools", name: "Live Prices", icon: TrendingUp, href: "/live-price", color: iconColor },

    { section: "Community", name: "Affiliate", icon: Share2, href: "/affiliate", color: iconColor },
    { section: "Community", name: "Marketplace", icon: Store, href: "/marketplace", color: iconColor },
    { section: "Community", name: "Blog", icon: PenSquare, href: "/blog", color: iconColor },

    { section: "Account", name: "Profile", icon: User, href: "/profile", color: iconColor },
    { section: "Account", name: "Settings", icon: Settings, href: "/settings", color: iconColor },
    { section: "Account", name: "Support", icon: HelpCircle, href: "/support", color: iconColor },
    { section: "Account", name: "FAQ", icon: FileQuestion, href: "/faq", color: iconColor },
    { section: "Account", name: "Logout", icon: LogOut, href: "/logout", color: "text-red-400" },
];

const adminMenus: MenuItem[] = [
    { section: "Admin Panel", name: "Admin Dashboard", icon: LayoutDashboard, href: "/admin", color: iconColor, adminOnly: true },
    { section: "Admin Panel", name: "Users", icon: User, href: "/admin/users", color: iconColor, adminOnly: true },
    { section: "Admin Panel", name: "KYC Verification", icon: ShieldCheck, href: "/admin/kyc", color: iconColor, adminOnly: true },

    { section: "Operations", name: "All Accounts", icon: FolderKanban, href: "/admin/accounts", color: iconColor, adminOnly: true },
    { section: "Operations", name: "All Orders", icon: ClipboardList, href: "/admin/orders", color: iconColor, adminOnly: true },
    { section: "Operations", name: "Account Approval", icon: CheckCircle, href: "/admin/account-approval", color: iconColor, adminOnly: true },

    { section: "Finance", name: "Payout Management", icon: Wallet, href: "/admin/payouts", color: iconColor, adminOnly: true },
    { section: "Finance", name: "Certificates", icon: Award, href: "/admin/certificates", color: iconColor, adminOnly: true },
    { section: "Finance", name: "Revenue Reports", icon: BarChart3, href: "/admin/revenue", color: iconColor, adminOnly: true },

    { section: "Management", name: "Coupons", icon: Tag, href: "/admin/coupons", color: iconColor, adminOnly: true },
    { section: "Management", name: "Email Templates", icon: Mail, href: "/admin/emails", color: iconColor, adminOnly: true },
    { section: "Management", name: "Payment Gateway", icon: CreditCard, href: "/admin/payment", color: iconColor, adminOnly: true },
    { section: "Management", name: "News Management", icon: Megaphone, href: "/admin/news", color: iconColor, adminOnly: true },
    { section: "Management", name: "Admin Logs", icon: ClipboardList, href: "/admin/logs", color: iconColor, adminOnly: true },

    { section: "Account", name: "Profile", icon: User, href: "/profile", color: iconColor },
    { section: "Account", name: "Settings", icon: Settings, href: "/settings", color: iconColor },
    { section: "Account", name: "Logout", icon: LogOut, href: "/logout", color: "text-red-400" },
];

export const getMenuItems = (role: string) => {
    if (role === "admin") {
        return adminMenus;
    }

    return traderMenus;
};