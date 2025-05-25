"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { get_profile, login } from "@/services/axiosMethods"
import { useState } from "react"
import { useUser } from "@/context/userContext"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { redirect } from "next/navigation"


export default function LoginPage() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const {setUser} = useUser()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await login(email, password)
        console.log(data)
        if (!data) {
            setError("Authorication error! Check email or password")
            toast.error("Authorication error! Check email or password")
        }
        if (data) {
            const response = await get_profile()
            console.log(response)
            if (response) {
                setUser(response)
                redirect("/")
            }
        }
        
    }
    return (
        <>
            <Toaster position="bottom-center" richColors closeButton/>
            <main className="w-[80vw] mx-auto mt-4">
                <div className="w-1/3 mx-auto flex flex-col gap-2">
                    {error && <p>{error}</p>}
                    <Label htmlFor="email">enter email: </Label>
                    <Input type="email" name="email" id="email" placeholder="example@test.com" onChange={(e)=>setEmail(e.target.value)}/>
                    <Label htmlFor="password">enter password: </Label>
                    <Input type="password" name="password" id="password" placeholder="****" onChange={(e)=>setPassword(e.target.value)}/>
                    <Button onClick={handleSubmit}>Login</Button>
                </div>
            </main>
        </>
    )
}