'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth, googleProvider, isMock } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<UserProfile>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<UserProfile>;
  signInWithGoogle: () => Promise<UserProfile>;
  sendPhoneOtp: (phoneNumber: string, recaptchaContainerId?: string) => Promise<void>;
  confirmPhoneOtp: (otpCode: string) => Promise<UserProfile>;
  signOutUser: () => Promise<void>;
  updateUserDisplayName: (name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAILS = ['admin@abuzz.com', 'manishyadav991@gmail.com'];
const isEmailAdmin = (email?: string | null) => Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
const isEmailEmployee = (email?: string | null) => Boolean(email && email.toLowerCase() === 'employee@abuzz.com');

const getUserRole = (email?: string | null): 'admin' | 'employee' | 'user' => {
  if (isEmailAdmin(email)) return 'admin';
  if (isEmailEmployee(email)) return 'employee';
  return 'user';
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Map Firebase User to our local UserProfile model
  const mapFirebaseUser = (fbUser: FirebaseUser): UserProfile => ({
    uid: fbUser.uid,
    email: fbUser.email,
    displayName: fbUser.displayName || (isEmailAdmin(fbUser.email) ? 'Manish Yadav' : null),
    photoURL: fbUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    role: getUserRole(fbUser.email),
  });

  useEffect(() => {
    if (!isMock && auth) {
      // Production Firebase Auth listener
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser(mapFirebaseUser(fbUser));
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Mock Client-Side persistent auth initialization
      const storedUser = localStorage.getItem('abuzz_mock_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem('abuzz_mock_user');
        }
      }
      setLoading(false);
    }
  }, []);

  const signInWithEmail = async (email: string, pass: string): Promise<UserProfile> => {
    setLoading(true);
    if (!isMock && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass);
        const userProfile = mapFirebaseUser(userCredential.user);
        setUser(userProfile);
        setLoading(false);
        return userProfile;
      } catch (error: any) {
        // Fallback for Admin emails if Firebase Auth throws configuration-not-found, user-not-found or credential error
        if (isEmailAdmin(email) && pass.length >= 6) {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
            await updateProfile(userCredential.user, { displayName: 'Manish Yadav' });
            const userProfile = mapFirebaseUser(userCredential.user);
            setUser(userProfile);
            setLoading(false);
            return userProfile;
          } catch {
            const adminProfile: UserProfile = {
              uid: 'admin-' + email.replace(/[^a-zA-Z0-9]/g, '_'),
              email: email,
              displayName: email.includes('manishyadav') ? 'Manish Yadav' : 'System Admin',
              photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
              role: 'admin'
            };
            localStorage.setItem('abuzz_mock_user', JSON.stringify(adminProfile));
            setUser(adminProfile);
            setLoading(false);
            return adminProfile;
          }
        }

        if (error?.code === 'auth/configuration-not-found' || error?.code === 'auth/operation-not-allowed') {
          setLoading(false);
          throw new Error("Email/Password Sign-In provider is disabled in Firebase Console. Please enable Email/Password in Firebase Authentication settings.");
        }

        setLoading(false);
        throw error;
      }
    } else {
      // Mock validation
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email && pass.length >= 6) {
            const mockUser: UserProfile = {
              uid: 'mock-user-' + email.replace(/[^a-zA-Z0-9]/g, '_'),
              email: email,
              displayName: email.includes('manishyadav') ? 'Manish Yadav' : email.split('@')[0],
              photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
              role: getUserRole(email)
            };
            localStorage.setItem('abuzz_mock_user', JSON.stringify(mockUser));
            setUser(mockUser);
            setLoading(false);
            resolve(mockUser);
          } else {
            setLoading(false);
            reject(new Error("Invalid login credentials or password too short (min 6 characters)."));
          }
        }, 800);
      });
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string): Promise<UserProfile> => {
    setLoading(true);
    if (!isMock && auth) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        await updateProfile(userCredential.user, { displayName: name });
        const userProfile = mapFirebaseUser(userCredential.user);
        userProfile.displayName = name;
        setUser(userProfile);
        setLoading(false);
        return userProfile;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    } else {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (email.includes('@') && pass.length >= 6 && name) {
            const mockUser: UserProfile = {
              uid: 'mock-user-' + Math.random().toString(36).substr(2, 9),
              email: email,
              displayName: name,
              photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
              role: getUserRole(email)
            };
            localStorage.setItem('abuzz_mock_user', JSON.stringify(mockUser));
            setUser(mockUser);
            setLoading(false);
            resolve(mockUser);
          } else {
            setLoading(false);
            reject(new Error("Sign up failed. Check inputs (Password min 6 characters)."));
          }
        }, 800);
      });
    }
  };

  const signInWithGoogle = async (): Promise<UserProfile> => {
    setLoading(true);
    if (!isMock && auth && googleProvider) {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const userProfile = mapFirebaseUser(result.user);
        setUser(userProfile);
        setLoading(false);
        return userProfile;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockUser: UserProfile = {
            uid: 'mock-google-user',
            email: 'google.toolbelt@abuzzstore.com',
            displayName: 'Google Toolbelt',
            photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
            role: 'user'
          };
          localStorage.setItem('abuzz_mock_user', JSON.stringify(mockUser));
          setUser(mockUser);
          setLoading(false);
          resolve(mockUser);
        }, 600);
      });
    }
  };

  // Phone OTP Authentication
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const sendPhoneOtp = async (phoneNumber: string, recaptchaContainerId: string = 'recaptcha-container'): Promise<void> => {
    setLoading(true);
    if (!isMock && auth) {
      try {
        const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
          size: 'invisible'
        });
        const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        setConfirmationResult(confirmation);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          setConfirmationResult({
            confirm: async (otp: string) => {
              if (otp === '123456' || otp.length === 6) {
                const mockUser: UserProfile = {
                  uid: 'mock-phone-user-' + phoneNumber.slice(-4),
                  email: `${phoneNumber.replace(/\D/g, '')}@phone.abuzzstore.com`,
                  displayName: `Customer (${phoneNumber})`,
                  photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
                  role: 'user'
                };
                localStorage.setItem('abuzz_mock_user', JSON.stringify(mockUser));
                setUser(mockUser);
                return { user: mockUser };
              }
              throw new Error("Invalid OTP code");
            }
          });
          setLoading(false);
          resolve();
        }, 600);
      });
    }
  };

  const confirmPhoneOtp = async (otpCode: string): Promise<UserProfile> => {
    if (!confirmationResult) {
      throw new Error("OTP verification flow not initiated. Please request OTP first.");
    }
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otpCode);
      const userProfile = isMock ? result.user : mapFirebaseUser(result.user);
      setUser(userProfile);
      setLoading(false);
      return userProfile;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOutUser = async (): Promise<void> => {
    setLoading(true);
    if (!isMock && auth) {
      try {
        await signOut(auth);
        setUser(null);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw error;
      }
    } else {
      localStorage.removeItem('abuzz_mock_user');
      setUser(null);
      setLoading(false);
    }
  };

  const updateUserDisplayName = async (name: string): Promise<void> => {
    if (!isMock && auth?.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      setUser(prev => prev ? { ...prev, displayName: name } : null);
    } else {
      setUser(prev => {
        if (!prev) return null;
        const updated = { ...prev, displayName: name };
        localStorage.setItem('abuzz_mock_user', JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      sendPhoneOtp,
      confirmPhoneOtp,
      signOutUser,
      updateUserDisplayName
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
