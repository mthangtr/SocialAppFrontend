"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import ModeToggle from "@/components/Buttons/ThemeToggle";
import { useAppDispatch } from "@/lib/hooks";
import { setCredentials } from "@/lib/states/authSlice";
import { Input } from "@/components/ui/inputShadcn";
import { useLoginMutation } from "@/lib/api/auth/authenApi";
import { Spinner } from '@nextui-org/react';

function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: rememberMe,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const searchParams = useSearchParams();
    const query = searchParams.get('loggedOut');

    useEffect(() => {
        if (query === 'true') {
            toast.success("Logged out successfully");
            router.replace("/auth/login", undefined);
        }
    }, [router]);

    useEffect(() => {
        setFormData((prev) => ({ ...prev, rememberMe }));
    }, [rememberMe]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setIsButtonDisabled(true);

        if (!formData.email || !formData.password) {
            toast.warn("Please fill in all fields");
            setTimeout(() => {
                setIsButtonDisabled(false);
                setIsSubmitting(false);
            }, 1000);
            return;
        }

        try {
            const response = await login(formData).unwrap();

            if (response.status === 400) {
                if (!response || !response.authentication) {
                    toast.error("Invalid login response");
                    return;
                }

                if (response.error) {
                    toast.error(response.error);
                    return;
                }

                setIsButtonDisabled(false);
                setIsSubmitting(false);
                return;
            }

            const user = response;
            const sessionToken = user.authentication.sessionToken;

            if (sessionToken) {
                dispatch(setCredentials(user));
                router.push("/home?loggedIn=true");
            } else {
                toast.error("Invalid login response");
                setIsButtonDisabled(false);
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
            setTimeout(() => {
                setIsButtonDisabled(false);
                setIsSubmitting(false);
            }, 1000);
        }
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRememberMe = (e: any) => {
        setRememberMe(!rememberMe);
    }

    return (
        <section className="relative">
            <ToastContainer
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick
                pauseOnHover
            />
            <span className="absolute m-2">
                <ModeToggle />
            </span>
            <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className={` bg-gray-100-100 w-full rounded-lg shadow-lg border md:mt-0 sm:max-w-md xl:p-0`}>
                    {isLoading && (
                        <div className="absolute rounded-md inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <Spinner />
                        </div>
                    )}
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                {isButtonDisabled === false ? (
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                                        placeholder="name@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={true}
                                    />
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                {isButtonDisabled === false ? (
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={true}
                                    />
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Input
                                            onClick={handleRememberMe}
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            {isButtonDisabled === false ?
                                (<button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-300 hover:bg-primary-700 dark:hover:bg-primary-200"
                                >
                                    Sign in
                                </button>) : (
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        disabled={true}
                                    >
                                        Sign in
                                    </button>
                                )}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
