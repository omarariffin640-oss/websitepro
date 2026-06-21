export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-5 border-b border-gray-800 bg-black">
            <h1 className="text-2xl font-bold text-white">
                NOOR <span className="text-purple-400">FUNDING</span>
            </h1>

            <div className="flex gap-4">
                <a href="/" className="text-gray-300 hover:text-white">Home</a>
                <a href="/login" className="text-gray-300 hover:text-white">Login</a>
                <a href="/register" className="text-purple-400 hover:text-purple-300">Register</a>
            </div>
        </nav>
    );
}