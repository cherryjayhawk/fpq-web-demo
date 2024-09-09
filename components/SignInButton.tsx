'use client'
import { LogIn } from "lucide-react"
import { signIn } from "next-auth/react"

function SignInButton() {
  return (
    <div className='flex justify-center items-center cursor-pointer gap-2 mt-2 mb-6' onClick={() => signIn()}>
        <LogIn size={22} />
        <p className="text-sm">Sign In as Administrator</p>
    </div>
  )
}

export default SignInButton