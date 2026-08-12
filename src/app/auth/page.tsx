'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Mail, Lock, User, AlertCircle, Chrome, Phone, MessageSquare } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, sendPhoneOtp, confirmPhoneOtp, user } = useAuth();
  
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'phone'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Phone OTP States
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        await signInWithEmail(email, password);
      } else if (authMode === 'register') {
        if (!name) {
          throw new Error("Full name is required to register.");
        }
        await signUpWithEmail(email, password, name);
      }
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please verify inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await sendPhoneOtp(phoneNumber, 'recaptcha-container');
      setOtpSent(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send OTP to mobile number.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      await confirmPhoneOtp(otpCode);
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid OTP verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-300">
      
      <div id="recaptcha-container" />

      {/* Return home button */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/" 
          className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary min-h-[44px] px-3 rounded-full hover:bg-foreground/5 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Store
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-primary flex items-center justify-center">
            <Image 
              src="/abuzz-logo.png" 
              alt="Abuzz Logo" 
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground font-sans">
          {authMode === 'login' ? 'Sign in to your account' : authMode === 'register' ? 'Create a toolbelt account' : 'Phone OTP Authentication'}
        </h2>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {authMode === 'login' ? 'Welcome back! Get ready to build.' : authMode === 'register' ? 'Join the store for quick shipping & persistent checkout.' : 'Verify your mobile number with 6-digit OTP.'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-xl glass">
          
          {/* Tab controller */}
          <div className="flex border-b border-border/40 pb-4 mb-6">
            <button
              onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
              className={`flex-1 text-center py-2 text-xs font-bold border-b-2 transition-all min-h-[44px] ${
                authMode === 'login' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthMode('register'); setErrorMsg(''); }}
              className={`flex-1 text-center py-2 text-xs font-bold border-b-2 transition-all min-h-[44px] ${
                authMode === 'register' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Register
            </button>
            {/* Mobile OTP tab hidden - requires Firebase Blaze billing plan
            <button
              onClick={() => { setAuthMode('phone'); setErrorMsg(''); setOtpSent(false); }}
              className={`flex-1 text-center py-2 text-xs font-bold border-b-2 transition-all min-h-[44px] flex items-center justify-center gap-1 ${
                authMode === 'phone' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Phone className="h-3.5 w-3.5" /> Mobile OTP
            </button>
            */}

          </div>

          {/* Errors display */}
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-500/10 p-3 text-xs text-rose-500 border border-rose-500/20 animate-in shake-1">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Phone OTP Auth View */}
          {authMode === 'phone' ? (
            !otpSent ? (
              <form onSubmit={handleSendPhoneOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Mobile Number (With Country Code)
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground font-mono focus:border-primary focus:outline-none"
                    />
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center h-12 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending OTP...' : 'Send SMS Verification Code'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyPhoneOtp} className="space-y-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> OTP Code Sent to {phoneNumber}
                </div>

                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Enter 6-Digit OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="e.g. 123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-center text-lg font-mono font-black tracking-widest text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-1/3 py-2.5 rounded-xl border border-border text-xs font-bold text-muted-foreground hover:bg-foreground/5"
                  >
                    Resend OTP
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center h-12 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP & Login'}
                  </button>
                </div>
              </form>
            )
          ) : (
            /* Email / Password Credentials Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Registration Display Name */}
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Password field */}
              <div>
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center h-12 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:bg-primary/95 transition-all disabled:opacity-50"
              >
                {loading ? 'Processing...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          {/* Social Auth Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground font-semibold">Or continue with</span>
            </div>
          </div>

          {/* Google Sign-in Action */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 h-12 rounded-xl border border-border bg-background hover:bg-foreground/5 text-xs font-bold text-foreground transition-all cursor-pointer shadow-xs min-h-[44px]"
          >
            <Chrome className="h-4 w-4 text-primary" />
            <span>Sign in with Google Account</span>
          </button>

        </div>
      </div>
    </div>
  );
}
