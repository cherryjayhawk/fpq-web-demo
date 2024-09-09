'use client'
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

function SignOutButton() {
  return (
    <div className='flex justify-center items-center cursor-pointer gap-2 py-1 px-2 rounded-md border-[1px] border-transparent hover:bg-slate-100 hover:border-rose-200 duration-100' onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
        <LogOut size={16} />
        <p className="font-semibold">Keluar</p>
    </div>
  )
}

export default SignOutButton