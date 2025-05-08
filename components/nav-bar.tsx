"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LoginCard } from "./login-card"
import { auth } from "@/app/firebase"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import NavLinksComponent from "@/components/nav-links-component"

export function NavBar() {
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isLoginCardOpen, setIsLoginCardOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user)
      setIsLoading(false)
    })
    
    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])
  
  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log("User signed out successfully")
      // No need to set isSignedIn here as the auth state listener will handle it
      // Optionally redirect to home or login page
      router.push("/")
    } catch (error: any) {
      console.error("Error signing out:", error.message)
      // Handle any errors here
    }
  }

  const handleAuthAction = () => {
    if (isSignedIn) {
      // Call the logout function instead of just setting state
      handleLogout()
    } else {
      // Open login card for sign in
      setIsLoginCardOpen(true)
    }
  }

  const handleLogin = async (email: string, password: string) => {
    // This is where you would implement your actual authentication logic
    console.log(`Attempting to login with username: ${email}`)
    if (typeof email !== "string" || typeof password !== "string") {
      console.error("Email or password is missing")
      return
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      // No need to set isSignedIn here as the auth state listener will handle it
      setIsLoginCardOpen(false)
      // Redirect after successful sign up
      router.push("/") // Adjust this to your desired redirect path
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`Error (${errorCode}): ${errorMessage}`)
      // Handle error (show error message to user)
    }
  }

  return (
    <nav className="w-full h-16 border-b flex items-center justify-between px-4 md:px-6 relative">
      <div className="flex items-center">
        <Link href="/" className="font-semibold text-lg">
          Talent Vault
        </Link>
      </div>

      <div>
        <NavLinksComponent />
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          onClick={handleAuthAction}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : isSignedIn ? "Sign Out" : "Sign In"}
        </Button>

        <LoginCard isOpen={isLoginCardOpen} onClose={() => setIsLoginCardOpen(false)} onLogin={handleLogin} />
      </div>
    </nav>
  )
}