export default function PricingCard({ title, price, features }: any) {
    return (
        <div className="border rounded-xl p-6 w-64 text-center shadow-sm hover:shadow-lg transition">

            <h2 className="text-xl font-bold">{title}</h2>

            <p className="text-3xl font-bold my-4">
                ${price}
            </p>

            <ul className="text-sm space-y-2 mb-4">
                {features.map((item: string, index: number) => (
                    <li key={index}>✔ {item}</li>
                ))}
            </ul>

            <button className="px-4 py-2 border rounded hover:bg-black hover:text-white transition">
                Choose Plan
            </button>
        </div>
    );
}