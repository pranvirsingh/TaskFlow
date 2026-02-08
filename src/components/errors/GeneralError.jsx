import { useNavigate, useRouteError } from "react-router-dom"
import { AlertTriangle, RefreshCcw, Home } from "lucide-react"

const GeneralError = () => {
    const error = useRouteError()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 text-center">
                <div className="bg-gradient-to-r from-gray-900 to-purple-600 h-32 flex items-center justify-center">
                    <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm shadow-xl">
                        <AlertTriangle className="w-12 h-12 text-white" />
                    </div>
                </div>

                <div className="p-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Something went wrong</h1>
                    <p className="text-gray-500 mb-6">
                        An unexpected error occurred. It's not you, it's us.
                        <br />
                        <span className="text-xs text-gray-400 mt-2 block font-mono bg-gray-100 p-2 rounded">
                            {error?.statusText || error?.message || "Unknown Error"}
                        </span>
                    </p>

                    <div className="space-y-3">
                        <button
                            // onClick={() => window.location.reload()}
                            onClick={() => navigate(-1)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <RefreshCcw className="w-5 h-5" />
                            Try Again
                        </button>

                        {/* <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200"
                        >
                            <Home className="w-5 h-5" />
                            Back to Home
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneralError
