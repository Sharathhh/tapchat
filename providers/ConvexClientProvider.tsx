"use client"
import React, { useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Authenticated, AuthLoading, ConvexReactClient } from 'convex/react';
import LoadingLogo from '@/components/shared/LoadingLogo';
import { SignedIn,SignedOut,SignInButton, SignUpButton } from '@clerk/nextjs';
import { SignIn } from '@clerk/clerk-react';
type Props = {
  children: React.ReactNode;
};



const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || '';

const convex = new ConvexReactClient(CONVEX_URL);

const ConvexClientProvider = ({ children }: Props) => {
  return (
    // Ensure ClerkProvider is at the root level
    <ClerkProvider publishableKey='pk_test_c3RyaWtpbmctYmFybmFjbGUtMjcuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      
        <SignedOut>
              <SignIn/>
        </SignedOut>
            <SignedIn>
              {children}
            </SignedIn>
      
        <AuthLoading>
          <LoadingLogo/>
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexClientProvider;
