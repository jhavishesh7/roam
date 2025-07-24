import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

type AuthMode = 'signin' | 'signup';
type UserType = 'user' | 'vendor';

interface FormData {
  email: string;
  password: string;
  fullName?: string;
  confirmPassword?: string;
}

export const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [userType, setUserType] = useState<UserType>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>();

  const handleAuth = async (data: FormData) => {
    setLoading(true);
    
    try {
      if (authMode === 'signup') {
        if (data.password !== data.confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        
        const { error } = await signUp(data.email, data.password, {
          full_name: data.fullName,
          user_type: userType,
        });
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created successfully!');
          if (userType === 'user') {
            navigate('/dashboard');
          } else {
            // Redirect to vendor dashboard (external link)
            window.location.href = 'https://vendor.treksphere.com/dashboard';
          }
        }
      } else {
        const { error } = await signIn(data.email, data.password);
        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Welcome back!');
          if (userType === 'user') {
            navigate('/dashboard');
          } else {
            // Redirect to vendor dashboard (external link)
            window.location.href = 'https://vendor.treksphere.com/dashboard';
          }
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (mode: AuthMode) => {
    setAuthMode(mode);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="bg-primary-600 p-3 rounded-xl">
                <Mountain className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">TrekSphere</span>
            </Link>
            <p className="mt-2 text-gray-600">Your trekking companion awaits</p>
          </div>

          <Card className="p-8">
            {/* User Type Tabs */}
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                onClick={() => setUserType('user')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  userType === 'user'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Trekker
              </Button>
              <Button
                variant="ghost"
                onClick={() => setUserType('vendor')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  userType === 'vendor'
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Vendor
              </Button>
            </div>

            {/* Auth Mode Tabs */}
            <div className="flex mb-8">
              <Button
                variant="ghost"
                onClick={() => switchMode('signin')}
                className={`flex-1 pb-2 text-center border-b-2 transition-colors duration-200 ${
                  authMode === 'signin'
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign In
              </Button>
              <Button
                variant="ghost"
                onClick={() => switchMode('signup')}
                className={`flex-1 pb-2 text-center border-b-2 transition-colors duration-200 ${
                  authMode === 'signup'
                    ? 'border-primary-600 text-primary-600 font-medium'
                    : 'border-gray-200 text-gray-600 hover:text-gray-900'
                }`}
              >
                Sign Up
              </Button>
            </div>

            <form onSubmit={handleSubmit(handleAuth)} className="space-y-6">
              {authMode === 'signup' && (
                <Input
                  label="Full Name"
                  type="text"
                  icon={<User className="h-5 w-5" />}
                  placeholder="Enter your full name"
                  {...register('fullName', { 
                    required: 'Full name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' }
                  })}
                  error={errors.fullName?.message}
                />
              )}

              <Input
                label="Email Address"
                type="email"
                icon={<Mail className="h-5 w-5" />}
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email'
                  }
                })}
                error={errors.email?.message}
              />

              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  icon={<Lock className="h-5 w-5" />}
                  placeholder="Enter your password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {authMode === 'signup' && (
                <Input
                  label="Confirm Password"
                  type="password"
                  icon={<Lock className="h-5 w-5" />}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords do not match'
                  })}
                  error={errors.confirmPassword?.message}
                />
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                loading={loading}
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            {authMode === 'signin' && (
              <div className="mt-4 text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-600">
              {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
              <Button
                variant="ghost"
                onClick={() => switchMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
              </Button>
            </div>
          </Card>

          {userType === 'vendor' && (
            <div className="mt-4 p-4 bg-peach-100 rounded-lg border border-peach-200">
              <p className="text-sm text-gray-700 text-center">
                <strong>Vendor Note:</strong> After authentication, you'll be redirected to the vendor dashboard 
                to manage your homestay listings and bookings.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};