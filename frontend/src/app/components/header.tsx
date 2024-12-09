"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Grid, User } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';

const Header = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();

        if (data?.name) {
          setName(data.name);
        }
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      setShowSignIn(false);
      router.refresh();
    }
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    const response = await fetch("http://localhost:8000/api/users/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          user_id: session?.user.id,
          email: email,
      }),
    });

    if (error) {
      console.error('Error signing up:', error.message);
    } else if (data.user) {
      alert('Check your email for the confirmation link!');
      setShowSignIn(false);
      setIsSignUp(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  // Add click handler for the dropdown container
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
  };

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent backdrop-blur-sm" />
      
      <div className="container mx-auto relative">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/50 to-blue-500/50 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-200"></div>
              <span className="relative text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                MemoryMosaic
              </span>
            </div>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link 
              href="/events" 
              className="flex items-center space-x-2 text-gray-300/90 hover:text-purple-400 transition-colors duration-200 group"
            >
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-sm relative">
                Events
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200" />
              </span>
            </Link>

            <Link 
              href="/my-mosaics" 
              className="flex items-center space-x-2 text-gray-300/90 hover:text-purple-400 transition-colors duration-200 group"
            >
              <Grid className="w-4 h-4 group-hover:animate-pulse" />
              <span className="text-sm relative">
                My Mosaics
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200" />
              </span>
            </Link>

            <div className="relative group">
              <button 
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-black/20 border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-200 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSignIn(!showSignIn);
                }}
              >
                <User className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">
                  {session ? (name || session.user.email) : 'Sign In'}
                </span>
              </button>
              
              {showSignIn && !session && (
                <div 
                  className="absolute right-0 mt-2 w-64 p-4 bg-black/40 border border-gray-800/50 rounded-lg backdrop-blur-md z-50"
                  onClick={handleDropdownClick}
                >
                  <div className="space-y-3">
                    {isSignUp && (
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-black/30 border border-gray-700/50 rounded-md text-gray-300"
                      />
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-black/30 border border-gray-700/50 rounded-md text-gray-300"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-black/30 border border-gray-700/50 rounded-md text-gray-300"
                    />
                    <div className="flex gap-2">
                      {isSignUp ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSignUp();
                          }}
                          className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-md"
                        >
                          Sign Up
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSignIn();
                          }}
                          className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-md"
                        >
                          Sign In
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSignUp(!isSignUp);
                        }}
                        className="flex-1 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded-md"
                      >
                        {isSignUp ? 'Back to Sign In' : 'Create Account'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {session && (
                <div 
                  className="absolute right-0 mt-2 w-48 py-2 bg-black/40 border border-gray-800/50 rounded-lg backdrop-blur-md 
                    opacity-0 invisible 
                    group-hover:opacity-100 group-hover:visible
                    transition-all duration-300 ease-in-out
                    group-hover:translate-y-0 translate-y-[-10px]"
                >
                  <div className="absolute h-2 -top-2 left-0 right-0" />
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5 rounded-lg" />
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 relative z-10"
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500/10 hover:text-purple-400 relative z-10"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-800/50 my-1"></div>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 relative z-10"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent">
        <div className="h-full w-1/2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Header;

