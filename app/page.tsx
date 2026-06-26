"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  Check,
  CheckCircle,
  ChevronDown,
  Clock3,
  FileText,
  FolderKanban,
  Gift,
  Globe2,
  Home,
  LayoutDashboard,
  LineChart,
  LogOut,
  Percent,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

const trustCards = [
  { title: "Up to $200,000", sub: "Funding", icon: Wallet },
  { title: "90%", sub: "Profit Split", icon: Percent },
  { title: "24 Hour", sub: "Payouts", icon: Clock3 },
  { title: "No Minimum", sub: "Trading Days", icon: Trophy },
  { title: "Global", sub: "Community", icon: Globe2 },
];

const challengeCards = [
  { amount: "$10,000", price: "$89", popular: false },
  { amount: "$25,000", price: "$199", popular: false },
  { amount: "$50,000", price: "$299", popular: true },
  { amount: "$100,000", price: "$549", popular: false },
  { amount: "$200,000", price: "$999", popular: false },
];

const dashboardMenu = [
  { name: "Home", icon: Home },
  { name: "My Accounts", icon: FolderKanban },
  { name: "Challenges", icon: Trophy },
  { name: "Payouts", icon: Wallet },
  { name: "Trading", icon: LineChart },
  { name: "Performance", icon: BarChart3 },
  { name: "Certificates", icon: Award },
  { name: "Resources", icon: FileText },
];

const rules = [
  ["Profit Target", "10%", "5%", "-"],
  ["Daily Loss", "5%", "5%", "5%"],
  ["Max Loss", "10%", "10%", "10%"],
  ["Trading Days", "4 Days", "4 Days", "-"],
  ["Profit Split", "-", "-", "Up to 90%"],
  ["News Trading", "Allowed", "Allowed", "Allowed"],
  ["Overnight / Weekend", "Allowed", "Allowed", "Allowed"],
];

const faqs = [
  {
    q: "How does the challenge work?",
    a: "Choose an account size, follow the trading rules, reach the profit target, then move toward funded status.",
  },
  {
    q: "What platforms can I use?",
    a: "You can use supported trading platforms such as MT5, depending on your account setup.",
  },
  {
    q: "How long does the payout take?",
    a: "Payouts are reviewed quickly and designed for fast processing once all rules are met.",
  },
  {
    q: "Can I trade news?",
    a: "News trading is allowed based on the program rules shown in the trading rules section.",
  },
  {
    q: "Is there a time limit?",
    a: "Most plans are built with flexible trading periods so traders do not need to rush.",
  },
];

function MiniDashboardCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0D14]/95 p-4 shadow-2xl shadow-purple-950/40">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          Welcome back, Omar Ariffin
        </h3>
        <span className="text-[10px] text-purple-300">View All</span>
      </div>

      <p className="mb-2 text-[11px] text-slate-400">Account Overview</p>

      <div className="grid grid-cols-4 gap-2">
        {[
          ["Balance", "$25,000.00"],
          ["Equity", "$25,752.21"],
          ["Profit", "$752.21"],
          ["Drawdown", "2.21%"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-white/5 bg-white/[0.04] p-3"
          >
            <p className="text-[10px] text-slate-500">{label}</p>
            <p className="mt-1 text-xs font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3">
          <p className="mb-3 text-xs font-semibold text-white">My Accounts</p>

          {[
            ["NOOR-123456", "$50,000", "Active"],
            ["NOOR-654321", "$100,000", "Active"],
          ].map(([id, amount, status]) => (
            <div
              key={id}
              className="mb-2 flex items-center justify-between text-[11px]"
            >
              <span className="text-slate-300">{id}</span>
              <span className="text-white">{amount}</span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                {status}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.04] p-3">
          <p className="mb-3 text-xs font-semibold text-white">
            Recent Payout
          </p>
          <p className="text-lg font-black text-white">$1,250.00</p>
          <p className="text-[10px] text-emerald-400">Processed</p>
          <p className="mt-1 text-[10px] text-slate-500">26 Jun 2026</p>
        </div>
      </div>
    </div>
  );
}

function ChallengeCard({
  amount,
  price,
  popular,
}: {
  amount: string;
  price: string;
  popular: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border p-5 ${popular
          ? "border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20"
          : "border-white/10 bg-white/[0.04]"
        }`}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-500 px-4 py-1 text-[10px] font-bold text-white">
          MOST POPULAR
        </div>
      )}

      <h3 className="text-2xl font-black text-white">{amount}</h3>
      <p className="mt-1 text-xs text-slate-400">Challenge</p>
      <p className="mt-2 text-xl font-bold text-white">{price}</p>

      <div className="my-4 h-px bg-white/10" />

      <div className="space-y-2 text-[11px]">
        {[
          ["Profit Target", "10%"],
          ["Daily Loss", "5%"],
          ["Max Loss", "10%"],
          ["Profit Split", "Up to 90%"],
          ["Trading Days", "4 Days"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1 text-slate-400">
              <Check size={12} className="text-purple-300" />
              {label}
            </span>
            <span className="font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>

      <Link
        href="/register"
        className="mt-5 flex h-10 items-center justify-center rounded-xl bg-purple-600 text-xs font-bold text-white transition hover:bg-purple-500"
      >
        Start Challenge
      </Link>

      <p className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-400">
        <CheckCircle size={12} className="text-emerald-400" />
        Refundable Fee
      </p>
    </div>
  );
}

function PlatformPreview() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <h3 className="text-lg font-bold text-white">
            Live Trading Environment
          </h3>

          <div className="mt-5 space-y-3 text-sm text-slate-300">
            {[
              "Real Market Conditions",
              "Real-time Data",
              "MT5 Platform",
              "Advanced Analytics",
            ].map((item) => (
              <p key={item} className="flex items-center gap-2">
                <Check size={15} className="text-purple-300" />
                {item}
              </p>
            ))}
          </div>

          <Link
            href="/register"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/10 px-4 text-xs font-bold text-purple-200"
          >
            See Platform
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative h-52 overflow-hidden rounded-xl border border-white/10 bg-[#090B12]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <svg viewBox="0 0 420 210" className="relative h-full w-full">
              <path
                d="M15 165 C55 120 82 140 115 104 C150 66 178 92 210 72 C252 45 278 90 318 62 C355 38 382 54 405 28"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M15 165 C55 120 82 140 115 104 C150 66 178 92 210 72 C252 45 278 90 318 62 C355 38 382 54 405 28 L405 210 L15 210 Z"
                fill="rgba(139,92,246,0.16)"
              />
            </svg>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#090B12] p-4">
            <div className="mb-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Market Watch</span>
              <span className="text-emerald-400">Live</span>
            </div>

            {[
              ["XAUUSD", "Buy", "+$675.00"],
              ["EURUSD", "Sell", "+$445.00"],
              ["GBPUSD", "Buy", "+$160.00"],
              ["US30", "Buy", "+$200.00"],
            ].map(([symbol, type, profit]) => (
              <div
                key={symbol}
                className="mb-3 grid grid-cols-3 rounded-lg bg-white/[0.03] px-3 py-2 text-xs"
              >
                <span className="text-white">{symbol}</span>
                <span className="text-purple-300">{type}</span>
                <span className="text-right text-emerald-400">{profit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RulesTable() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="mb-4 text-lg font-bold text-white">Trading Rules</h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              <th className="py-3 font-medium">Rule</th>
              <th className="py-3 font-medium">Phase 1</th>
              <th className="py-3 font-medium">Phase 2</th>
              <th className="py-3 font-medium">Funded</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((row) => (
              <tr key={row[0]} className="border-b border-white/5">
                {row.map((cell) => (
                  <td key={cell} className="py-3 text-slate-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FAQBox() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <h3 className="mb-4 text-lg font-bold text-white">
        Frequently Asked Questions
      </h3>

      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <button
              key={faq.q}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3 text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-white">
                  {faq.q}
                </span>
                <Plus
                  size={14}
                  className={`text-purple-300 transition ${isOpen ? "rotate-45" : ""
                    }`}
                />
              </div>

              {isOpen && (
                <p className="mt-3 text-xs leading-5 text-slate-400">
                  {faq.a}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DashboardLayoutPreview() {
  return (
    <div className="rounded-3xl border border-white/15 bg-[#080A10] p-5 shadow-2xl shadow-black/50">
      <div className="grid gap-5 lg:grid-cols-[1fr_190px]">
        <div>
          <h3 className="text-xl font-semibold text-white">
            Welcome back, Omar Ariffin
          </h3>

          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {[
              ["Total Payouts", "$2,450.00"],
              ["Funded Accounts", "2"],
              ["Active Challenges", "1"],
              ["Accounts Pass", "3"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/5 bg-white/[0.04] p-4"
              >
                <p className="text-[11px] text-slate-500">{label}</p>
                <p className="mt-2 text-xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
            <p className="text-xs text-purple-300">Special Offer</p>
            <h4 className="mt-2 text-2xl font-black text-white">
              20% OFF ALL CHALLENGES
            </h4>
            <p className="mt-1 text-sm text-slate-300">
              Limited time only. Use code: NOOR20
            </p>
            <button className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white">
              Claim Now
            </button>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">My Accounts</h4>
              <span className="text-xs text-purple-300">View All</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-xs">
                <thead className="text-slate-500">
                  <tr>
                    <th className="py-3">Account</th>
                    <th className="py-3">Balance</th>
                    <th className="py-3">Equity</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["NOOR-123456", "$25,000.00", "$25,752.21", "Active", "Instant"],
                    ["NOOR-654321", "$50,000.00", "$49,120.50", "Active", "Instant"],
                    ["NOOR-789012", "$100,000.00", "$102,430.10", "Passed", "Instant"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-white/5">
                      <td className="py-3 text-white">{row[0]}</td>
                      <td className="py-3 text-slate-300">{row[1]}</td>
                      <td className="py-3 text-slate-300">{row[2]}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-emerald-400">
                          {row[3]}
                        </span>
                      </td>
                      <td className="py-3 text-slate-300">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="mb-6 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
              <Sparkles size={15} />
            </div>
            <p className="text-xs font-bold text-white">NOOR FUNDING</p>
          </div>

          <select className="mb-5 h-10 w-full rounded-xl border border-white/10 bg-black px-3 text-xs text-white">
            <option>NOOR-123456</option>
          </select>

          <div className="space-y-2">
            {dashboardMenu.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs ${index === 0
                      ? "bg-purple-600 text-white"
                      : "text-slate-300 hover:bg-white/5"
                    }`}
                >
                  <Icon size={15} />
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className="mt-10 border-t border-white/10 pt-4">
            <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-slate-300">
              <Settings size={15} />
              Settings
            </div>
            <div className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-slate-300">
              <LogOut size={15} />
              Logout
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05060A] text-white">
      <section className="relative px-4 pb-12 pt-5 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[110px]" />
        <div className="absolute right-10 top-80 h-[320px] w-[320px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-t-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-violet-700 px-5 py-2 text-center text-xs font-bold text-white">
            🚀 20% OFF ALL CHALLENGES — LIMITED TIME ONLY!
          </div>

          <nav className="flex items-center justify-between border-x border-white/10 bg-black/50 px-6 py-5 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                <Sparkles size={16} />
              </div>
              <span className="text-sm font-black tracking-wide">
                NOOR FUNDING
              </span>
            </div>

            <div className="hidden items-center gap-8 text-xs text-slate-300 lg:flex">
              <a href="#challenges">Challenges</a>
              <a href="#platform">How It Works</a>
              <a href="#rules">About Us</a>
              <a href="#faq">FAQ</a>
              <a href="#footer">Resources</a>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-xs text-slate-300">
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white"
              >
                Get Started
              </Link>
            </div>
          </nav>

          <div className="grid gap-8 rounded-b-2xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl lg:grid-cols-[0.85fr_1.15fr] lg:p-8">
            <div className="flex flex-col justify-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-purple-300">
                The modern prop firm
              </p>

              <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl">
                Trade. Prove.
                <br />
                Get Funded.
              </h1>

              <p className="mt-6 max-w-lg text-sm leading-6 text-slate-300">
                Join thousands of traders worldwide and get funded up to
                $200,000. Keep up to 90% of the profits.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="rounded-xl bg-purple-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-purple-600/30"
                >
                  Start Challenge
                </Link>
                <Link
                  href="#challenges"
                  className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-white"
                >
                  Free Trial
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span>Excellent</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500"
                    >
                      <Star size={12} className="fill-white text-white" />
                    </span>
                  ))}
                </div>
                <span>4.8 out of 5</span>
                <span className="text-emerald-400">★ Trustpilot</span>
              </div>
            </div>

            <MiniDashboardCard />
          </div>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-2 lg:grid-cols-5">
          {trustCards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-black/20 p-5 text-center"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-purple-400/40 bg-purple-500/10 text-purple-300">
                  <Icon size={22} />
                </div>
                <p className="text-sm font-black text-white">{item.title}</p>
                <p className="mt-1 text-xs text-slate-400">{item.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="challenges" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-white">
              Choose Your Challenge
            </h2>

            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300">
              Compare All
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {challengeCards.map((card) => (
              <ChallengeCard
                key={card.amount}
                amount={card.amount}
                price={card.price}
                popular={card.popular}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="platform" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <PlatformPreview />
        </div>
      </section>

      <section id="rules" className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_0.75fr]">
          <RulesTable />
          <div id="faq">
            <FAQBox />
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DashboardLayoutPreview />
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-700/80 to-violet-600/70 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">
              Ready to become a funded trader?
            </h2>
            <p className="mt-2 text-sm text-purple-100">
              Join Noor Funding and take your trading to the next level.
            </p>
          </div>

          <Link
            href="/register"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-sm font-black text-purple-700"
          >
            Start Your Challenge Now
            <ArrowRight className="ml-2" size={17} />
          </Link>
        </div>
      </section>

      <footer
        id="footer"
        className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid max-w-7xl gap-8 text-sm md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-300" />
              <span className="font-black text-white">NOOR FUNDING</span>
            </div>
            <p className="text-slate-400">
              Empowering traders worldwide. Trade. Prove. Get Funded.
            </p>
          </div>

          {[
            ["Company", "About Us", "Careers", "Affiliate"],
            ["Resources", "Blog", "Trading Rules", "Payouts"],
            ["Legal", "Terms of Use", "Privacy Policy", "Refund Policy"],
          ].map((col) => (
            <div key={col[0]}>
              <h4 className="mb-3 font-bold text-white">{col[0]}</h4>
              <div className="space-y-2 text-slate-400">
                {col.slice(1).map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}