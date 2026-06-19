"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LivePricePage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [symbol, setSymbol] = useState("EURUSD");
    const [price, setPrice] = useState(1.0850);
    const [prices, setPrices] = useState<number[]>([1.0850, 1.0852, 1.0848, 1.0855, 1.0853]);
    const [isRunning, setIsRunning] = useState(false);

    const symbolConfig = {
        EURUSD: { basePrice: 1.0850, volatility: 0.0005, prefix: "$", decimals: 5 },
        GBPUSD: { basePrice: 1.2650, volatility: 0.0005, prefix: "$", decimals: 5 },
        XAUUSD: { basePrice: 2325.50, volatility: 2.5, prefix: "$", decimals: 2 }
    };

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setLoading(false);
    }, [router]);

    const startSimulation = () => {
        setIsRunning(true);
    };

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            const config = symbolConfig[symbol as keyof typeof symbolConfig];
            const change = (Math.random() - 0.5) * config.volatility;
            setPrice(prev => {
                const newPrice = +(prev + change).toFixed(config.decimals);
                setPrices(prevPrices => [...prevPrices.slice(-50), newPrice]);
                return newPrice;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, symbol]);

    const handleSymbolChange = (newSymbol: string) => {
        setSymbol(newSymbol);
        const config = symbolConfig[newSymbol as keyof typeof symbolConfig];
        setPrice(config.basePrice);
        setPrices([config.basePrice]);
        setIsRunning(false);
    };

    const chartOptions = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true }
        },
        stroke: { curve: 'smooth', width: 2, colors: ['#8B5CF6'] }, // Purple
        grid: { borderColor: '#2A2A2A' },
        xaxis: { labels: { show: false } },
        yaxis: {
            labels: {
                style: { colors: '#9CA3AF' },
                formatter: (value: number) => symbol === 'XAUUSD' ? value.toFixed(2) : value.toFixed(5)
            }
        },
        tooltip: { theme: 'dark' }
    };

    const chartSeries = [{ name: symbol, data: prices }];
    const config = symbolConfig[symbol as keyof typeof symbolConfig];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-2">
                <div className="p-3">
                    <h1 className="text-2xl font-bold text-white mb-3">Live Price Chart</h1>

                    <Card className="bg-[#1A1A1A] border-gray-800 mb-4">
                        <CardHeader>
                            <CardTitle className="text-white">Price Chart</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <Label className="text-gray-300">Select Symbol</Label>
                                <select
                                    value={symbol}
                                    onChange={(e) => handleSymbolChange(e.target.value)}
                                    className="w-full mt-1 p-2 rounded-lg bg-black border border-gray-700 text-white"
                                >
                                    <option value="EURUSD">EURUSD - Euro/US Dollar</option>
                                    <option value="GBPUSD">GBPUSD - British Pound/US Dollar</option>
                                    <option value="XAUUSD">XAUUSD - Gold</option>
                                </select>
                            </div>

                            <div className="text-center mb-4">
                                <p className="text-4xl font-bold text-white">
                                    {config.prefix}{price.toFixed(config.decimals)}
                                </p>
                                <p className="text-sm text-gray-400">{symbol} - Last update: {new Date().toLocaleTimeString()}</p>
                            </div>

                            <div style={{ height: '400px' }}>
                                {/* @ts-ignore */}
                                <Chart options={chartOptions} series={chartSeries} type="line" height={350} />
                            </div>

                            <div className="flex justify-center gap-4 mt-4">
                                <Button
                                    onClick={startSimulation}
                                    className="bg-green-500 hover:bg-green-600"
                                    disabled={isRunning}
                                >
                                    Start Live
                                </Button>
                                <Button
                                    onClick={() => setIsRunning(false)}
                                    className="bg-red-500 hover:bg-red-600"
                                    disabled={!isRunning}
                                >
                                    Stop
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1A1A1A] border-gray-800">
                        <CardHeader>
                            <CardTitle className="text-white">How to Use</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-gray-300">
                                <li>1. Select symbol: EURUSD, GBPUSD, or XAUUSD (Gold)</li>
                                <li>2. Click "Start Live" to begin price simulation</li>
                                <li>3. Price updates every second (for testing)</li>
                                <li>4. Use Trade Dashboard to add actual trade profits</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}