"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function LivePricePage() {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [price, setPrice] = useState(1.0850);
    const [prices, setPrices] = useState<number[]>([1.0850, 1.0852, 1.0848, 1.0855, 1.0853]);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (!email) {
            router.push("/login");
            return;
        }
        setUserEmail(email);
        setLoading(false);
    }, [router]);

    const startSimulation = () => {
        setIsRunning(true);
        const interval = setInterval(() => {
            const change = (Math.random() - 0.5) * 0.0005;
            setPrice(prev => {
                const newPrice = +(prev + change).toFixed(5);
                setPrices(prevPrices => {
                    const newPrices = [...prevPrices.slice(-20), newPrice];
                    return newPrices;
                });
                return newPrice;
            });
        }, 1000);

        return () => clearInterval(interval);
    };

    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                const change = (Math.random() - 0.5) * 0.0005;
                setPrice(prev => {
                    const newPrice = +(prev + change).toFixed(5);
                    setPrices(prevPrices => [...prevPrices.slice(-20), newPrice]);
                    return newPrice;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isRunning]);

    const chartOptions = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: { show: false },
            animations: { enabled: true }
        },
        stroke: { curve: 'smooth', width: 2, colors: ['#3B82F6'] },
        grid: { borderColor: '#374151' },
        xaxis: { labels: { show: false } },
        yaxis: { labels: { style: { colors: '#9CA3AF' } } },
        tooltip: { theme: 'dark' }
    };

    const chartSeries = [{ name: 'EURUSD', data: prices }];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-darknavy">
                <p className="text-gray-400">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-darknavy">
            <Topbar onMenuClick={() => setSidebarOpen(true)} userEmail={userEmail} avatarUrl={avatarUrl} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="lg:ml-64 pt-16">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-6">Live Price Chart</h1>

                    <Card className="bg-darkcard mb-6">
                        <CardHeader>
                            <CardTitle className="text-white">EURUSD Live Price</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center mb-4">
                                <p className="text-4xl font-bold text-white">${price.toFixed(5)}</p>
                                <p className="text-sm text-gray-400">Last update: {new Date().toLocaleTimeString()}</p>
                            </div>
                            <div style={{ height: '400px' }}>
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

                    <Card className="bg-darkcard">
                        <CardHeader>
                            <CardTitle className="text-white">How to Use</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-gray-300">
                                <li>1. Click "Start Live" to begin price simulation</li>
                                <li>2. Price updates every second (for testing)</li>
                                <li>3. For real MT5 price, connect via WebSocket</li>
                                <li>4. Use Trade Dashboard to add actual trade profits</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}