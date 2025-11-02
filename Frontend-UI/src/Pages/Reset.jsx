import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, KeyRound, ArrowRight, ArrowLeft, Check, Eye, EyeOff, MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BURL } from '../App';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const emailForm = useForm();
    const otpForm = useForm();
    const passwordForm = useForm();

    const handleEmailSubmit = async (data) => {
        console.log(data.email);
        
        setEmail(data.email);
        try {
            await axios.post(`${BURL}/api/auth/send-otp`, {
                email: data.email
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            toast.success('Otp send  Success');
            setStep(2);
        } catch (error) {
            console.log(error)
            console.log(error.response?.data.message)
            console.log(data.otp)
        }
    };

    const handleOtpSubmit = async (data) => {
        try {
            await axios.post(`${BURL}/api/auth/verifiy-otp`, {
                email: data.email,
                otp: data.otp
            }, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            })
            toast.success('Otp send  Success');
            setStep(3);
            } catch (error) {
            console.log(error.response?.data.message)
        }
        };

        const handlePasswordSubmit = (data) => {
            setSuccess(true);
        };

        const handleBack = () => {
            setStep(step - 1);
        };

        if (success) {
            return (
                <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
                        <p className="text-gray-600 mb-6">Your password has been changed successfully.</p>
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            Back to Login
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
                    <div onClick={() => navigate('/singin')} className='cursor-pointer absolute top-2 left-5 h-fit px-2 rounded-2xl'  ><MoveLeft /></div>
                    {/* <div className='t h-fit px-2 '></div> */}
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="flex items-center justify-between">
                                <div className={`w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold ${step >= num ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {num}
                                </div>
                                {num < 3 && (
                                    <div className={`w-16 h-1 mx-2 ${step > num ? 'bg-indigo-600' : 'bg-red-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Step 1: Email */}
                    {step === 1 && (
                        <div>
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Forgot Password?</h2>
                            <p className="text-gray-600 text-center mb-6">Enter your email address to receive a verification code</p>

                            <div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        {...emailForm.register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${emailForm.formState.errors.email ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter your email"
                                    />
                                    {emailForm.formState.errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{emailForm.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <button
                                    onClick={emailForm.handleSubmit(handleEmailSubmit)}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    Send OTP <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: OTP */}
                    {step === 2 && (
                        <div>
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <KeyRound className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Enter OTP</h2>
                            <p className="text-gray-600 text-center mb-6">We've sent a 6-digit code to {email}</p>

                            <div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                                    <input
                                        type="text"
                                        {...otpForm.register('otp', {
                                            required: 'OTP is required',
                                            pattern: {
                                                value: /^\d{6}$/,
                                                message: 'OTP must be exactly 6 digits'
                                            }
                                        })}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-center text-2xl tracking-widest ${otpForm.formState.errors.otp ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="000000"
                                        maxLength="6"
                                        onChange={(e) => {
                                            e.target.value = e.target.value.replace(/\D/g, '');
                                        }}
                                    />
                                    {otpForm.formState.errors.otp && (
                                        <p className="mt-1 text-sm text-red-600 text-center">{otpForm.formState.errors.otp.message}</p>
                                    )}
                                </div>

                                <div className="text-center mb-4">
                                    <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700">
                                        Resend OTP
                                    </button>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" /> Back
                                    </button>
                                    <button
                                        onClick={otpForm.handleSubmit(handleOtpSubmit)}
                                        className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Verify <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <div>
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Create New Password</h2>
                            <p className="text-gray-600 text-center mb-6">Your new password must be different from previous passwords</p>

                            <div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            {...passwordForm.register('newPassword', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must be at least 8 characters'
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                                    message: 'Password must contain uppercase, lowercase, and number'
                                                }
                                            })}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${passwordForm.formState.errors.newPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {passwordForm.formState.errors.newPassword && (
                                        <p className="mt-1 text-sm text-red-600">{passwordForm.formState.errors.newPassword.message}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...passwordForm.register('confirmPassword', {
                                                required: 'Please confirm your password',
                                                validate: (value) => {
                                                    const { newPassword } = passwordForm.getValues();
                                                    return value === newPassword || 'Passwords do not match';
                                                }
                                            })}
                                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none ${passwordForm.formState.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {passwordForm.formState.errors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600">{passwordForm.formState.errors.confirmPassword.message}</p>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" /> Back
                                    </button>
                                    <button
                                        onClick={passwordForm.handleSubmit(handlePasswordSubmit)}
                                        className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }