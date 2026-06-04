export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-5 border-b">
            <h1 className="text-2xl font-bold">My Prop Firm</h1>

            <div className="flex gap-4">
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>
        </nav>
    );
}