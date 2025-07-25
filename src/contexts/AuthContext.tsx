import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData?: any) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    // Redirect vendor after successful login
    const userRole = data?.user?.user_metadata?.role || data?.user?.user_metadata?.user_type;
    if (data?.user && userRole === 'vendor') {
      window.location.href = 'https://teal-macaron-3c1390.netlify.app/main.html';
    }
    return { data, error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    // Redirect vendor after successful signup
    const userRole = userData?.role || userData?.user_type;
    if (userRole === 'vendor' && data?.user) {
      window.location.href = 'https://teal-macaron-3c1390.netlify.app/main.html';
    }
    // Store emergency contact in Supabase directly
    if (userData?.emergency_contact_number && data?.user) {
      // Insert into emergencynumber (case-sensitive)
      await supabase.from('emergencynumber').insert([
        {
          user_id: data.user.id,
          name: userData.fullName,
          number: userData.emergency_contact_number,
        },
      ]);
      // Also upsert into UserProfile
      await supabase.from('UserProfile').upsert([
        {
          id: data.user.id,
          name: userData.fullName,
          phone: userData.emergency_contact_number,
          email: data.user.email,
        },
      ]);
    }
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/password-reset-sent',
    });
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};