import type { ReactNode } from 'react';
import illustration from '/home/yossef/.gemini/antigravity/brain/db77c152-0613-45a0-9281-21655c273d37/auth_illustration_1770889762659.png';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#E6E6FA] items-center justify-center p-12 relative overflow-hidden">
                <div className="relative z-10 w-full max-w-lg">
                    <img
                        src={illustration}
                        alt="Learning Platform Illustration"
                        className="w-full h-auto object-contain"
                    />
                    <div className="mt-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">LearnSphere</h2>
                        <p className="text-gray-600">Unlock Your Potential, Learn Anything, Anytime, Anywhere.</p>

                        {/* Dots indicator simulation */}
                        <div className="flex justify-center gap-2 mt-6">
                            <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                            <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                            <div className="w-6 h-2 rounded-full bg-purple-600"></div>
                            <div className="w-2 h-2 rounded-full bg-purple-300"></div>
                        </div>
                    </div>
                </div>

                {/* Decorative background circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300/20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 lg:hidden mb-2">LearnSphere</h2>
                        <h1 className="text-2xl font-bold text-slate-800 hidden lg:block mb-2">{title}</h1>
                        {subtitle && <p className="text-gray-500">{subtitle}</p>}
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
