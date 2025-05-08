"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/app/firebase"
import { cn } from "@/lib/utils"

interface ValidationState {
  valid: boolean
  message: string
  dirty: boolean
}

export default function CreateAccountPage() {
  const router = useRouter()
  
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [firebaseError, setFirebaseError] = useState("")
  
  // Validation states
  const [emailValidation, setEmailValidation] = useState<ValidationState>({
    valid: false,
    message: "",
    dirty: false
  })
  
  const [passwordValidation, setPasswordValidation] = useState<ValidationState>({
    valid: false,
    message: "",
    dirty: false
  })
  
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<ValidationState>({
    valid: false,
    message: "",
    dirty: false
  })
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasNumber: false,
    hasSpecial: false,
    hasUppercase: false,
    score: 0
  })
  
  // Email validation function
  const validateEmail = (value: string): ValidationState => {
    if (!value) {
      return { valid: false, message: "Email is required", dirty: true }
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value)) {
      return { valid: false, message: "Please enter a valid email address", dirty: true }
    }
    
    return { valid: true, message: "", dirty: true }
  }
  
  // Password validation function
  const validatePassword = (value: string): ValidationState => {
    if (!value) {
      return { valid: false, message: "Password is required", dirty: true }
    }
    
    if (value.length < 8) {
      return { valid: false, message: "Password must be at least 8 characters", dirty: true }
    }
    
    // Check for at least one number
    if (!/\d/.test(value)) {
      return { valid: false, message: "Password must contain at least one number", dirty: true }
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return { valid: false, message: "Password must contain at least one special character", dirty: true }
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(value)) {
      return { valid: false, message: "Password must contain at least one uppercase letter", dirty: true }
    }
    
    return { valid: true, message: "", dirty: true }
  }
  
  // Confirm password validation
  const validateConfirmPassword = (value: string): ValidationState => {
    if (!value) {
      return { valid: false, message: "Please confirm your password", dirty: true }
    }
    
    if (value !== password) {
      return { valid: false, message: "Passwords do not match", dirty: true }
    }
    
    return { valid: true, message: "", dirty: true }
  }
  
  // Update password strength indicators
  useEffect(() => {
    const strength = {
      length: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      score: 0
    }
    
    // Calculate score (0-4)
    strength.score = [
      strength.length,
      strength.hasNumber,
      strength.hasSpecial,
      strength.hasUppercase
    ].filter(Boolean).length
    
    setPasswordStrength(strength)
    
    // Update password validation if dirty
    if (passwordValidation.dirty) {
      setPasswordValidation(validatePassword(password))
    }
    
    // Update confirm password validation if dirty
    if (confirmPasswordValidation.dirty && confirmPassword) {
      setConfirmPasswordValidation(validateConfirmPassword(confirmPassword))
    }
  }, [password, confirmPassword, passwordValidation.dirty, confirmPasswordValidation.dirty])
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const emailResult = validateEmail(email)
    const passwordResult = validatePassword(password)
    const confirmResult = validateConfirmPassword(confirmPassword)
    
    setEmailValidation(emailResult)
    setPasswordValidation(passwordResult)
    setConfirmPasswordValidation(confirmResult)
    
    // Only proceed if all validations pass
    if (!emailResult.valid || !passwordResult.valid || !confirmResult.valid) {
      return
    }
    
    setIsSubmitting(true)
    setFirebaseError("")
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      // Redirect after successful sign up
      router.push("/") // Adjust this to your desired redirect path
    } catch (error: any) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error(`Error (${errorCode}): ${errorMessage}`)
      
      // Set user-friendly error message based on Firebase error code
      if (errorCode === 'auth/email-already-in-use') {
        setFirebaseError('This email is already in use. Please try another email or sign in.')
      } else if (errorCode === 'auth/invalid-email') {
        setFirebaseError('The email address is not valid.')
      } else if (errorCode === 'auth/weak-password') {
        setFirebaseError('The password is too weak. Please choose a stronger password.')
      } else {
        setFirebaseError('An error occurred during account creation. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  // Get strength color
  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-slate-200"
    if (score === 1) return "bg-red-500"
    if (score === 2) return "bg-orange-500"
    if (score === 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>Enter your information to create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
            {firebaseError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{firebaseError}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email</Label>
                {emailValidation.dirty && (
                  <span className={cn(
                    "text-xs",
                    emailValidation.valid ? "text-green-500" : "text-destructive"
                  )}>
                    {emailValidation.valid ? (
                      <span className="flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Valid
                      </span>
                    ) : emailValidation.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (!emailValidation.dirty) {
                      setEmailValidation({ ...emailValidation, dirty: true })
                    }
                  }}
                  onBlur={() => setEmailValidation(validateEmail(email))}
                  placeholder="youremail@example.com"
                  className={cn(
                    emailValidation.dirty && (
                      emailValidation.valid 
                        ? "border-green-500 focus-visible:ring-green-500" 
                        : "border-destructive focus-visible:ring-destructive"
                    )
                  )}
                  aria-invalid={emailValidation.dirty && !emailValidation.valid}
                  aria-describedby="email-error"
                  autoComplete="email"
                />
                {emailValidation.dirty && !emailValidation.valid && (
                  <AlertCircle className="h-4 w-4 absolute right-3 top-3 text-destructive" />
                )}
                {emailValidation.dirty && emailValidation.valid && (
                  <Check className="h-4 w-4 absolute right-3 top-3 text-green-500" />
                )}
              </div>
              {emailValidation.dirty && !emailValidation.valid && (
                <p id="email-error" className="text-xs text-destructive mt-1">
                  {emailValidation.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {passwordValidation.dirty && (
                  <span className={cn(
                    "text-xs",
                    passwordValidation.valid ? "text-green-500" : "text-destructive"
                  )}>
                    {passwordValidation.valid ? (
                      <span className="flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Strong
                      </span>
                    ) : "Not strong enough"}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (!passwordValidation.dirty) {
                      setPasswordValidation({ ...passwordValidation, dirty: true })
                    }
                  }}
                  onBlur={() => setPasswordValidation(validatePassword(password))}
                  placeholder="Create a password"
                  className={cn(
                    passwordValidation.dirty && (
                      passwordValidation.valid 
                        ? "border-green-500 focus-visible:ring-green-500" 
                        : "border-destructive focus-visible:ring-destructive"
                    )
                  )}
                  aria-invalid={passwordValidation.dirty && !passwordValidation.valid}
                  aria-describedby="password-requirements"
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Password strength meter */}
              <div className="space-y-2">
                <div className="flex gap-1 h-1">
                  <div className={cn("flex-1 rounded-l-full", getStrengthColor(passwordStrength.score >= 1 ? 1 : 0))} />
                  <div className={cn("flex-1", getStrengthColor(passwordStrength.score >= 2 ? 2 : 0))} />
                  <div className={cn("flex-1", getStrengthColor(passwordStrength.score >= 3 ? 3 : 0))} />
                  <div className={cn("flex-1 rounded-r-full", getStrengthColor(passwordStrength.score >= 4 ? 4 : 0))} />
                </div>
                <div id="password-requirements" className="text-xs text-muted-foreground space-y-1">
                  <p>Password requirements:</p>
                  <ul className="space-y-1">
                    <li className={cn("flex items-center gap-1", passwordStrength.length ? "text-green-500" : "")}>
                      {passwordStrength.length ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      At least 8 characters
                    </li>
                    <li className={cn("flex items-center gap-1", passwordStrength.hasNumber ? "text-green-500" : "")}>
                      {passwordStrength.hasNumber ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      At least one number
                    </li>
                    <li className={cn("flex items-center gap-1", passwordStrength.hasSpecial ? "text-green-500" : "")}>
                      {passwordStrength.hasSpecial ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      At least one special character
                    </li>
                    <li className={cn("flex items-center gap-1", passwordStrength.hasUppercase ? "text-green-500" : "")}>
                      {passwordStrength.hasUppercase ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      At least one uppercase letter
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                {confirmPasswordValidation.dirty && (
                  <span className={cn(
                    "text-xs",
                    confirmPasswordValidation.valid ? "text-green-500" : "text-destructive"
                  )}>
                    {confirmPasswordValidation.valid ? (
                      <span className="flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Matched
                      </span>
                    ) : confirmPasswordValidation.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    if (!confirmPasswordValidation.dirty) {
                      setConfirmPasswordValidation({ ...confirmPasswordValidation, dirty: true })
                    }
                  }}
                  onBlur={() => setConfirmPasswordValidation(validateConfirmPassword(confirmPassword))}
                  placeholder="Confirm your password"
                  className={cn(
                    confirmPasswordValidation.dirty && (
                      confirmPasswordValidation.valid 
                        ? "border-green-500 focus-visible:ring-green-500" 
                        : "border-destructive focus-visible:ring-destructive"
                    )
                  )}
                  aria-invalid={confirmPasswordValidation.dirty && !confirmPasswordValidation.valid}
                  aria-describedby="confirm-password-error"
                  autoComplete="new-password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {confirmPasswordValidation.dirty && !confirmPasswordValidation.valid && (
                <p id="confirm-password-error" className="text-xs text-destructive mt-1">
                  {confirmPasswordValidation.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full"
              disabled={
                isSubmitting || 
                !emailValidation.valid || 
                !passwordValidation.valid || 
                !confirmPasswordValidation.valid
              }
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Already have an account?{" "}
              <Link href="/" className="text-primary underline underline-offset-4 hover:text-primary/90">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}