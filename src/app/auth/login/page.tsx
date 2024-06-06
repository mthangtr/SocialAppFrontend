"use client";
import { Input } from "@/components/ui/inputShadcn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setIsButtonDisabled(true); // Disable the button

        if (!formData.email || !formData.password) {
            toast.warn("Please fill in all fields");
            setTimeout(() => {
                setIsButtonDisabled(false);
                setIsSubmitting(false);
            }, 1000);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/auth/login", formData);

            if (response.status === 400) {
                toast.error(response.data.error);
                setIsButtonDisabled(false); // Enable the button if there's an error
                setIsSubmitting(false); // Enable the button if there's an error
                return;
            }

            const user = response.data;
            const sessionToken = user.authentication.sessionToken;

            if (sessionToken) {
                localStorage.setItem("sessionToken", sessionToken);
                localStorage.setItem("user", JSON.stringify(user));
                router.push("/home/newsfeed");
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

    return (
        <section className="">
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
            />
            <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="bg-gray-100-100 w-full rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="select-none w-full border bg-gray-100 rounded-lg px-4 py-2 dark:bg-[hsl(0,0%,20%)]"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Input
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
                                    className="w-full text-white bg-primary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </button>) : (
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        disabled={isButtonDisabled}
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
