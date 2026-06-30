export type Program = {
    name: string;
    badge: string;
    price: string;
    status: string;
    highlight: string;
    specs: {
        label: string;
        value: string;
    }[];
};

export const freeTrial: Program = {
    name: "Free Trial",
    badge: "Practice Only",
    price: "Free",
    status: "Not Eligible for Payout",
    highlight: "Test Noor Funding rules with a demo account before buying.",
    specs: [
        { label: "Account Size", value: "$5K Demo" },
        { label: "Platform", value: "MT5" },
        { label: "Profit Target", value: "8%" },
        { label: "Daily Drawdown", value: "5%" },
        { label: "Max Drawdown", value: "10%" },
        { label: "Minimum Trading Days", value: "None" },
        { label: "Maximum Trading Days", value: "Unlimited" },
        { label: "Profit Split", value: "Not Eligible" },
        { label: "Payout", value: "No Payout" },
        { label: "EA Allowed", value: "Allowed" },
        { label: "News Trading", value: "Allowed" },
        { label: "Weekend Holding", value: "Allowed" },
        { label: "Leverage", value: "1:100" },
        { label: "Inactivity Rule", value: "30 days no trade = account breach" },
    ],
};

export const challengePrograms: Program[] = [
    {
        name: "1-Step Challenge",
        badge: "Fast Track",
        price: "From $59",
        status: "Active",
        highlight: "One phase evaluation for traders who want faster funding.",
        specs: [
            { label: "Account Size", value: "$5K / $10K / $25K / $50K / $100K / $200K" },
            { label: "Platform", value: "MT5" },
            { label: "Profit Target", value: "10%" },
            { label: "Daily Drawdown", value: "5%" },
            { label: "Max Drawdown", value: "10%" },
            { label: "Minimum Trading Days", value: "3 Days" },
            { label: "Maximum Trading Days", value: "Unlimited" },
            { label: "Profit Split", value: "Up to 90%" },
            { label: "Refund", value: "Eligible after first payout" },
            { label: "EA Allowed", value: "Allowed" },
            { label: "News Trading", value: "Allowed" },
            { label: "Weekend Holding", value: "Allowed" },
            { label: "Copy Trading", value: "Allowed with own accounts" },
            { label: "Leverage", value: "1:100" },
            { label: "Inactivity Rule", value: "30 days no trade = account breach" },
        ],
    },
    {
        name: "2-Step Challenge",
        badge: "Most Popular",
        price: "From $39",
        status: "Active",
        highlight: "Two phase evaluation with balanced risk and targets.",
        specs: [
            { label: "Account Size", value: "$5K / $10K / $25K / $50K / $100K / $200K" },
            { label: "Platform", value: "MT5" },
            { label: "Profit Target", value: "8% Phase 1 / 5% Phase 2" },
            { label: "Daily Drawdown", value: "5%" },
            { label: "Max Drawdown", value: "10%" },
            { label: "Minimum Trading Days", value: "3 Days" },
            { label: "Maximum Trading Days", value: "Unlimited" },
            { label: "Profit Split", value: "Up to 90%" },
            { label: "Refund", value: "Eligible after first payout" },
            { label: "EA Allowed", value: "Allowed" },
            { label: "News Trading", value: "Allowed" },
            { label: "Weekend Holding", value: "Allowed" },
            { label: "Copy Trading", value: "Allowed with own accounts" },
            { label: "Leverage", value: "1:100" },
            { label: "Inactivity Rule", value: "30 days no trade = account breach" },
        ],
    },
];

export const instantFunding: Program = {
    name: "Instant Funding",
    badge: "No Challenge",
    price: "From $99",
    status: "Active",
    highlight: "Skip evaluation and start trading funded account faster.",
    specs: [
        { label: "Account Size", value: "$5K / $10K / $25K / $50K" },
        { label: "Platform", value: "MT5" },
        { label: "Profit Target", value: "No Challenge Target" },
        { label: "Daily Drawdown", value: "5%" },
        { label: "Max Drawdown", value: "10%" },
        { label: "Minimum Trading Days", value: "None" },
        { label: "Maximum Trading Days", value: "Unlimited" },
        { label: "Profit Split", value: "Up to 80%" },
        { label: "Refund", value: "No Refund" },
        { label: "EA Allowed", value: "Allowed" },
        { label: "News Trading", value: "Allowed" },
        { label: "Weekend Holding", value: "Allowed" },
        { label: "Copy Trading", value: "Allowed with own accounts" },
        { label: "Leverage", value: "1:100" },
        { label: "Inactivity Rule", value: "30 days no trade = account breach" },
    ],
};

export const noorFunding: Program = {
    name: "Noor Funding",
    badge: "Premium",
    price: "Coming Soon",
    status: "Coming Soon",
    highlight: "Premium funded model for serious traders.",
    specs: [
        { label: "Account Size", value: "Coming Soon" },
        { label: "Platform", value: "MT5" },
        { label: "Profit Target", value: "Coming Soon" },
        { label: "Daily Drawdown", value: "Coming Soon" },
        { label: "Max Drawdown", value: "Coming Soon" },
        { label: "Minimum Trading Days", value: "Coming Soon" },
        { label: "Maximum Trading Days", value: "Coming Soon" },
        { label: "Profit Split", value: "Up to 95%" },
        { label: "Refund", value: "Coming Soon" },
        { label: "EA Allowed", value: "Allowed" },
        { label: "News Trading", value: "Allowed" },
        { label: "Weekend Holding", value: "Allowed" },
        { label: "Copy Trading", value: "Allowed with own accounts" },
        { label: "Leverage", value: "1:100" },
        { label: "Inactivity Rule", value: "30 days no trade = account breach" },
    ],
};