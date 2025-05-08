"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { X, Check, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface LoginCardProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void
}

interface ValidationState {
  valid: boolean
  message: string
  dirty: boolean
}

export function LoginCard({ isOpen, onClose, onLogin }: LoginCardProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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
  
  const emailDebounceTimer = useRef<NodeJS.Timeout | null>(null)
  const passwordDebounceTimer = useRef<NodeJS.Timeout | null>(null)
  
  // Email validation
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
  
  // Password validation
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
    
    return { valid: true, message: "", dirty: true }
  }
  
  // Debounced email validation
  useEffect(() => {
    if (emailDebounceTimer.current) {
      clearTimeout(emailDebounceTimer.current)
    }
    
    if (emailValidation.dirty) {
      emailDebounceTimer.current = setTimeout(() => {
        setEmailValidation(validateEmail(email))
      }, 300)
    }
    
    return () => {
      if (emailDebounceTimer.current) {
        clearTimeout(emailDebounceTimer.current)
      }
    }
  }, [email])
  
  // Debounced password validation
  useEffect(() => {
    if (passwordDebounceTimer.current) {
      clearTimeout(passwordDebounceTimer.current)
    }
    
    if (passwordValidation.dirty) {
      passwordDebounceTimer.current = setTimeout(() => {
        setPasswordValidation(validatePassword(password))
      }, 300)
    }
    
    return () => {
      if (passwordDebounceTimer.current) {
        clearTimeout(passwordDebounceTimer.current)
      }
    }
  }, [password])
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (!emailValidation.dirty) {
      setEmailValidation({ ...emailValidation, dirty: true })
    }
  }
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (!passwordValidation.dirty) {
      setPasswordValidation({ ...passwordValidation, dirty: true })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate both fields before submission
    const emailResult = validateEmail(email)
    const passwordResult = validatePassword(password)
    
    setEmailValidation(emailResult)
    setPasswordValidation(passwordResult)
    
    // Only proceed if both validations pass
    if (!emailResult.valid || !passwordResult.valid) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Call the login function passed from parent
      await onLogin(email, password)
      
      // Reset form
      setEmail("")
      setPassword("")
      setEmailValidation({ valid: false, message: "", dirty: false })
      setPasswordValidation({ valid: false, message: "", dirty: false })
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2" 
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit} noValidate>
          <CardContent className="space-y-4">
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
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailValidation(validateEmail(email))}
                  placeholder="Enter your email"
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
                        Valid
                      </span>
                    ) : passwordValidation.message}
                  </span>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={() => setPasswordValidation(validatePassword(password))}
                  placeholder="Enter your password"
                  className={cn(
                    passwordValidation.dirty && (
                      passwordValidation.valid 
                        ? "border-green-500 focus-visible:ring-green-500" 
                        : "border-destructive focus-visible:ring-destructive"
                    )
                  )}
                  aria-invalid={passwordValidation.dirty && !passwordValidation.valid}
                  aria-describedby="password-error"
                  autoComplete="current-password"
                />
                {passwordValidation.dirty && !passwordValidation.valid && (
                  <AlertCircle className="h-4 w-4 absolute right-3 top-3 text-destructive" />
                )}
                {passwordValidation.dirty && passwordValidation.valid && (
                  <Check className="h-4 w-4 absolute right-3 top-3 text-green-500" />
                )}
              </div>
              {passwordValidation.dirty && !passwordValidation.valid && (
                <p id="password-error" className="text-xs text-destructive mt-1">
                  {passwordValidation.message}
                </p>
              )}

            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full mt-2"
              disabled={isSubmitting || !emailValidation.valid || !passwordValidation.valid}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/create-account")}
            >
              Create Account
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}