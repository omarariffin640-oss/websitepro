import ProductCard, { MarketplaceProduct } from "./ProductCard";

type Props = {
    products: MarketplaceProduct[];
};

export default function ProductGrid({ products }: Props) {
    if (products.length === 0) {
        return (
            <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-12 text-center">
                <h3 className="text-2xl font-bold text-white">
                    No Products Available
                </h3>

                <p className="mt-3 text-zinc-500">
                    Marketplace products will appear here once they are available.
                </p>
            </div>
        );
    }

    return (
        <section>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                    Available Products
                </h2>

                <p className="mt-2 text-zinc-500">
                    Purchase upgrades, add-ons and premium services.
                </p>
            </div>

            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}