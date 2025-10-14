
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { email, z } from "zod";
import { toast } from 'sonner'
import { Mail, Lock, User, Phone, MapPin, Eye, EyeOff } from "lucide-react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BURL } from "../App";
// ✅ Define validation schema using Zod

const SignUpSchema = z.object({
    name: z.string().min(3, "Full name must be at least 3 characters."),
    email: z.string().email("Enter a valid email address."),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits.")
        .max(10, "Phone number must be exactly 10 digits.")
        .regex(/^[0-9]+$/, "Phone must contain only digits."),
    address: z.string().min(5, "Address must be at least 5 characters."),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .max(20, "Password too long."),
    confirmPassword: z.string(),
    role: z
        .enum(["", "user", "Owner", "Delivery Boy"])
        .refine((val) => val !== "", {
            message: "Please select a role.",
        }),

    terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms.",
    }),

})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            password: "",
            confirmPassword: "",
            role: "",
            terms: false,
        },
    });

    const selectedRole = watch("role");
    const roles = ["user", "Owner", "Delivery Boy"];



    // fullname, email, password, contactnumber, role
    const onSubmit = async (data) => {


        try {
            await axios.post(
                `${BURL}/api/auth/signup`,
                {
                    fullname: data.name,
                    email: data.email,
                    password: data.password,
                    contactnumber: data.phone,
                    role: data.role,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            toast.success(`Account created successfully for ${data.name}! 🎉`);
        } catch (error) {
            console.log("Request error is:", error);
            console.log("Error response data:", error.response?.data);
            toast.warning(`${error.response?.data.message}`)
            console.log("Error status:", error.response?.status);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center space-y-6 p-8">
                    <h1 className="text-6xl font-bold text-orange-600">FoodieHub</h1>
                    <p className="text-2xl text-gray-700 font-semibold">
                        Delicious meals delivered to your doorstep
                    </p>
                    <p className="text-gray-600 text-lg">
                        Join thousands of food lovers and get access to the best restaurants
                        in your area.
                    </p>
                </div>

                {/* Right Side - Form */}
                <div className="bg-transparent md:bg-white md:shadow-2xl  p-2 md:p-10  ">
                    <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Role Selection */}
                        <div className="flex gap-4 w-full justify-center items-center flex-col">

                            <div className="flex gap-4 ">
                                {roles.map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setValue("role", role)}
                                        className={`px-5 py-0 md:py-2 rounded-lg font-medium text-sm md:text-xl transition-colors duration-200 ${selectedRole === role
                                            ? "bg-orange-500 text-white shadow-md"
                                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    {...register("name")}
                                    placeholder="John Doe"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="john@example.com"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    {...register("phone")}
                                    placeholder="9876543210"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Delivery Address
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    {...register("address")}
                                    placeholder="123 Main Street"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("confirmPassword")}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                {...register("terms")}
                                id="terms"
                                className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                            />
                            <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                                I agree to the{" "}
                                <span className="text-orange-600 font-medium">
                                    Terms of Service
                                </span>{" "}
                                and{" "}
                                <span className="text-orange-600 font-medium">
                                    Privacy Policy
                                </span>
                            </label>
                        </div>
                        {errors.terms && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.terms.message}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-lg"
                        >
                            Create Account
                        </button>

                    </form>
                    {/* Sign In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}

                            <button
                                type="button"
                                onClick={() => navigate('/singin')}
                                className="text-red-500 hover:underline font-medium"
                            >
                                Sign Up

                            </button>
                        </p>
                    </div>

                    {/* Social Sign Up */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="ml-2 text-sm font-medium text-gray-700">Google</span>
                            </button>

                            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                <span className="ml-2 text-sm font-medium text-gray-700">Facebook</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
