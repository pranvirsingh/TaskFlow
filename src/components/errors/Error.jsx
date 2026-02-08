import { useNavigate } from "react-router-dom"
import { SearchX, Home, MoveLeft } from "lucide-react"

const Error = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="relative inline-block">
                        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-purple-600">
                            404
                        </h1>
                        <div className="absolute -bottom-4 right-0 bg-white p-3 rounded-full shadow-xl border border-gray-100 rotate-12">
                            <SearchX className="w-10 h-10 text-purple-600" />
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
                    >
                        <MoveLeft className="w-5 h-5" />
                        Go Back
                    </button>

                    {/* <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <Home className="w-5 h-5" />
                        Back to Home
                    </button> */}
                </div>
            </div>
        </div>
    )
}

export default Error
