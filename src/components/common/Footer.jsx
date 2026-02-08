import { Heart } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} <span className="font-semibold text-purple-600">TaskFlow</span>. All rights reserved.
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-purple-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-purple-600 transition-colors">Terms of Service</a>
                        <span className="flex items-center gap-1">
                            Made with <Heart className="w-3 h-3 text-red-500 fill-current" />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
