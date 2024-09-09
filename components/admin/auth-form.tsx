"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const email = React.useRef('')
  const password = React.useRef('')

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: '/dashboard/invoices'
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="email_anda@contoh.com"
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={e => email.current = e.target.value}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="********"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
              onChange={e => password.current = e.target.value}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <PulseLoader color="white" />
            ) : 'Masuk'
            }
            
          </Button>
        </div>
      </form>
    </div>
  )
}
