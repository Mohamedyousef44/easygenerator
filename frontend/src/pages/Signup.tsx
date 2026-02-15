import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '../schemas/auth';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';

const Signup = () => {
    const [serverError, setServerError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        setIsLoading(true);
        setServerError(null);
        try {
            await api.post('/auth/signup', data);
            navigate('/signin');
        } catch (error: any) {
            setServerError(error.response?.data?.message || 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Join us today and start your journey."
        >
            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        {...register('name')}
                        id="name"
                        type="text"
                        autoComplete="name"
                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Username or email
                    </label>
                    <input
                        {...register('email')}
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="johndoe123"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        {...register('password')}
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        className="appearance-none block w-full px-4 py-3 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {serverError && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">{serverError}</div>}

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-black bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors shadow-sm"
                    >
                        {isLoading ? 'Creating account...' : 'Sign up'}
                    </button>
                </div>

                <div className="text-sm text-center text-black mt-6">
                    Already have an account?{' '}
                    <Link to="/signin" className="font-medium text-black hover:text-indigo-500 underline decoration-indigo-200 underline-offset-2">
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Signup;

