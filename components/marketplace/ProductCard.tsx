import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";

export type MarketplaceProduct = {
    id: number;
    name: string;
    description: string;
    price: number;
    category?: string;
};

type Props = {
    product: MarketplaceProduct;
};

export default function ProductCard({ product }: Props) {
    return (
        <div className="group rounded-3xl border border-white/10 bg-zinc-950/70 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:bg-violet-500/5">
            <div className="mb-5 flex items-center justify-between">
                <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    {product.category || "Add-on"}
                </div>

                <Star className="h-5 w-5 text-violet-400" />
            </div>

            <h3 className="text-xl font-bold text-white">{product.name}</h3>

            <p className="mt-3 min-h-[72px] text-sm leading-6 text-zinc-500">
                {product.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm text-zinc-500">Price</p>
                <p className="mt-1 text-3xl font-bold text-white">
                    ${product.price.toLocaleString()}
                </p>
            </div>

            <Button className="mt-6 w-full rounded-xl bg-violet-600 hover:bg-violet-700">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Buy Now
            </Button>
        </div>
    );
}