"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BarChart3,
  CheckCircle,
  Clock3,
  CreditCard,
  FileText,
  FolderKanban,
  Gift,
  Globe2,
  LayoutDashboard,
  LineChart,
  LockKeyhole,
  LogOut,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

type Program = {
  name: string;
  label: string;
  capital: string;
  price: string;
  target: string;
  dailyLoss: string;
  maxLoss: string;
  days: string;
  period: string;
  refund: string;
  reward: string;
  popular?: boolean;
  icon: LucideIcon;
};

type MenuItem = {
  name: string;
  icon: LucideIcon;
};

const stats = [
  { label: "Traders Worldwide", value: "50,000+", icon: Users },
  { label: "Total Payouts", value: "$10M+", icon: Wallet },
  { label: "Countries", value: "180+", icon: Globe2 },
  { label: "Secure Payouts", value: "99.9%", icon: ShieldCheck },
];

const programs: Program[] = [
  {
    name: "Free Trial",
    label: "Practice first",
    capital: "$10,000",
    price: "$0",
    target: "No target",
    dailyLoss: "5%",
    maxLoss: "10%",
    days: "0 days",
    period: "14 Days",
    refund: "No",
    reward: "Practice",
    icon: Gift,
  },
  {
    name: "Step 1",
    label: "Fast challenge",
    capital: "$50,000",
    price: "$249",
    target: "10%",
    dailyLoss: "5%",
    maxLoss: "10%",
    days: "4 days",
    period: "Unlimited",
    refund: "Yes",
    reward: "Up to 90%",
    icon: Zap,
  },
  {
    name: "Step 2",
    label: "Most popular",
    capital: "$100,000",
    price: "$499",
    target: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    days: "4 days",
    period: "Unlimited",
    refund: "Yes",
    reward: "Up to 90%",
    popular: true,
    icon: Trophy,
  },
  {
    name: "Instant",
    label: "No challenge",
    capital: "$25,000",
    price: "$349",
    target: "No target",
    dailyLoss: "4%",
    maxLoss: "8%",
    days: "0 days",
    period: "Unlimited",
    refund: "No",
    reward: "Up to 80%",
    icon: CreditCard,
  },
  {
    name: "Noor Funding",
    label: "Premium account",
    capital: "$200,000",
    price: "$864",
    target: "10% / 5%",
    dailyLoss: "5%",
    maxLoss: "10%",
    days: "4 days",
    period: "Unlimited",
    refund: "Yes",
    reward: "100% up to 90%",
    icon: Sparkles,
  },
];

const menuItems: MenuItem[] = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Accounts", icon: FolderKanban },
  { name: "Certificate", icon: Award },
  { name: "Payouts", icon: Wallet },
  { name: "Orders", icon: FileText },
  { name: "Profile", icon: User },
  { name: "Settings", icon: Settings },
  { name: "Logout", icon: LogOut },
];

const accounts = [
  {
    id: "NOOR-125623",
    plan: "$50,000 Challenge",
    balance: "$50,000.00",
    equity: "$52,684.21",
    status: "Active",
  },
  {
    id: "NOOR-956412",
    plan: "$25,000 Challenge",
    balance: "$25,000.00",
    equity: "$25,842.31",
    status: "Active",
  },
  {
    id: "JOHAN-984512",
    plan: "$10,000 Challenge",
    balance: "$10,000.00",
    equity: "$10,256.12",
    status: "Active",
  },
];

const rules = [
  {
    title: "Fair Trading Rules",
    text: "Clear rules, transparent limits, and no confusing hidden conditions.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Payout System",
    text: "Request rewards from your dashboard with a smooth approval process.",
    icon: Clock3,
  },
  {
    title: "Modern Trader Dashboard",
    text: "Track accounts, certificates, payouts, orders, and profile in one place.",
    icon: BarChart3,
  },
];

const faqs = [
  {
    q: "Can I start with a free trial?",
    a: "Yes. Free Trial lets traders test the dashboard and trading rules before buying a challenge.",
  },
  {
    q: "How long is the trading period?",
    a: "Most paid programs come with unlimited trading period so traders do not need to rush.",
  },
  {
    q: "How much reward can traders receive?",
    a: "Rewards can go up to 90%, depending on the selected program and account stage.",
  },
];

function ProgramCard({ program }: { program: Program }) {
  const Icon = program.icon;

  return (
    <div
      className={`relative rounded-3xl border p-6 transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${program.popular
          ? "border-purple-400/70 bg-purple-500/10 shadow-purple-500/20"
          : "border-white/10 bg-white/[0.04] shadow-black/20"
        }`}
    >
      {program.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-purple-300/40 bg-purple-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-purple-500/30">
          MOST POPULAR
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
          <Icon size={24} />
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          {program.label}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white">{program.name}</h3>
      <p className="mt-2 text-4xl font-black tracking-tight text-white">
        {program.capital}
      </p>
      <p className="mt-1 text-sm text-slate-400">
        One-time fee{" "}
        <span className="font-bold text-purple-300">{program.price}</span>
      </p>

      <div className="my-6 h-px bg-white/10" />

      <div className="space-y-3 text-sm">
        {[
          ["Profit Target", program.target],
          ["Max Daily Loss", program.dailyLoss],
          ["Max Loss", program.maxLoss],
          ["Min Trading Days", program.days],
          ["Trading Period", program.period],
          ["Refund", program.refund],
          ["Rewards", program.reward],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <span className="text-slate-400">{label}</span>
            <span className="font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>

      <Link
        href="/register"
        className={`mt-7 flex h-12 items-center justify-center rounded-2xl text-sm font-bold transition ${program.popular
            ? "bg-purple-500 text-white hover:bg-purple-400"
            : "bg-white text-slate-950 hover:bg-purple-100"
          }`}
      >
        Start Challenge
        <ArrowRight className="ml-2" size={17} />
      </Link>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl shadow-purple-950/30 backdrop-blur-xl lg:p-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-black/50 p-4">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500 text-sm font-black text-white">
              NF
            </div>
            <div>
              <p className="text-sm font-bold text-white">NOOR FUNDING</p>
              <p className="text-xs text-slate-400">Trader Dashboard</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
              All Accounts
            </button>
            <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
              This Month
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] text-center transition hover:border-purple-400/50 hover:bg-purple-500/10"
              >
                <Icon className="text-purple-300" size={21} />
                <span className="text-[11px] font-medium text-slate-300">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">My Accounts</p>
                <p className="text-xs text-slate-400">
                  Challenge and funded account overview
                </p>
              </div>
              <BadgeCheck className="text-emerald-300" size={20} />
            </div>

            <div className="space-y-3">
              {accounts.map((account) => (
                <div
                  key={account.id}
                  className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs md:grid-cols-5"
                >
                  <div>
                    <p className="text-slate-500">Account</p>
                    <p className="font-bold text-white">{account.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Plan</p>
                    <p className="font-semibold text-slate-200">
                      {account.plan}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Balance</p>
                    <p className="font-semibold text-slate-200">
                      {account.balance}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500">Equity</p>
                    <p className="font-semibold text-emerald-300">
                      {account.equity}
                    </p>
                  </div>
                  <div className="flex items-end">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 font-bold text-emerald-300">
                      {account.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Equity Growth</p>
                <p className="text-xs text-slate-400">Live performance view</p>
              </div>
              <LineChart className="text-purple-300" size={22} />
            </div>

            <div className="relative h-44 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:38px_38px]" />

              <svg
                viewBox="0 0 420 180"
                className="relative z-10 h-full w-full"
                fill="none"
              >
                <path
                  d="M10 140 C55 120 70 145 105 112 C140 78 165 110 198 88 C230 66 255 80 285 55 C318 28 352 46 410 18"
                  stroke="url(#lineGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M10 140 C55 120 70 145 105 112 C140 78 165 110 198 88 C230 66 255 80 285 55 C318 28 352 46 410 18 L410 180 L10 180 Z"
                  fill="url(#areaGradient)"
                />
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="10"
                    y1="140"
                    x2="410"
                    y2="18"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#38BDF8" />
                  </linearGradient>
                  <linearGradient
                    id="areaGradient"
                    x1="210"
                    y1="18"
                    x2="210"
                    y2="180"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#A855F7" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#A855F7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs text-slate-400">Profit</p>
                <p className="text-lg font-black text-emerald-300">
                  +$2,684.21
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <p className="text-xs text-slate-400">Payout Status</p>
                <p className="text-lg font-black text-purple-300">Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24">
        <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute right-0 top-48 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                <Sparkles size={16} />
                Trade. Prove. Get Funded.
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                Trade Up To{" "}
                <span className="bg-gradient-to-r from-purple-300 via-purple-500 to-sky-300 bg-clip-text text-transparent">
                  $200,000
                </span>{" "}
                Funded Capital
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Join Noor Funding and access modern prop firm challenges,
                instant accounts, fast payouts, fair rules, and a clean trader
                dashboard built for serious traders.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="fill-yellow-300 text-yellow-300"
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-slate-200">
                    4.8/5 Trustpilot
                  </span>
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                  24h payout processing
                </div>
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-purple-500 px-7 text-sm font-black text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-1 hover:bg-purple-400"
                >
                  Start Challenge
                  <ArrowRight className="ml-2" size={18} />
                </Link>

                <Link
                  href="/login"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Instant Account
                  <Zap className="ml-2" size={18} />
                </Link>
              </div>
            </div>

            <DashboardPreview />
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
                    <Icon size={22} />
                  </div>
                  <p className="text-3xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-purple-200">
              Choose Your Program
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Pick the account that matches your trading style
            </h2>
            <p className="mt-5 text-slate-400">
              Start free, pass a challenge, or go instant. Every card is built
              clean so traders can compare rules fast.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {programs.map((program) => (
              <ProgramCard key={program.name} program={program} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                Why Noor Funding
              </div>

              <h2 className="text-4xl font-black tracking-tight text-white">
                Built for traders who want clean rules and fast action.
              </h2>

              <p className="mt-5 text-slate-400">
                The dashboard, account table, menu icons, and funding cards are
                arranged to feel modern, simple, and professional.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Modern black and purple trader experience",
                  "Account overview matches dashboard structure",
                  "Clear pricing cards for all 5 programs",
                  "Line chart preview, not candlestick inside card",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-300" size={19} />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {rules.map((rule) => {
                const Icon = rule.icon;

                return (
                  <div
                    key={rule.title}
                    className="rounded-3xl border border-white/10 bg-black/30 p-5"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {rule.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {rule.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-slate-400">
              Simple answers before traders start their challenge.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <h3 className="text-lg font-bold text-white">{faq.q}</h3>
                <p className="mt-3 leading-7 text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-purple-400/20 bg-gradient-to-r from-purple-600/20 via-slate-900 to-blue-600/20 p-8 text-center shadow-2xl shadow-purple-950/30 lg:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-purple-500 text-white shadow-lg shadow-purple-500/30">
            <LockKeyhole size={30} />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Ready to become a funded trader?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-300">
            Start your challenge today and manage everything from one clean Noor
            Funding dashboard.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-7 text-sm font-black text-slate-950 transition hover:-translate-y-1 hover:bg-purple-100"
            >
              Start Challenge
              <ArrowRight className="ml-2" size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-white/15"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}