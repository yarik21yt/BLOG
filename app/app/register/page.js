"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { get_profile, login, register } from "@/services/axiosMethods"
import { useState } from "react"
import { useUser } from "@/context/userContext"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"




export default function RegisterPage() {
    /* email, username, password, gender, birthday */
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [gender, setGender] = useState(null)
    const [birthday, setBirthday] = useState(null)
    const [error, setError] = useState(null)
    const {setUser} = useUser()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await register(email, username, password, gender, birthday)
        console.log(data)
        if (!data) {
            setError("Authorication error! Check email or password")
            toast.error("Authorication error! Check email or password")
        }
        if (data) {
            setError("Registration Successfully! :D")
            toast.success("Registration Successfully! :D")
        }
        
    }
    /*console.log(email, username, password, gender, birthday)*/
    return (
        <>
            <Toaster position="bottom-center" richColors closeButton/>
            <main className="w-[80vw] mx-auto mt-4">
                <div className="w-1/3 mx-auto flex flex-col gap-2">
                    {error && <p>{error}</p>}
                    <Label htmlFor="email">enter email: </Label>
                    <Input type="email" name="email" id="email" placeholder="example@test.com" onChange={(e)=>setEmail(e.target.value)}/>
                    <Label htmlFor="username">enter username: </Label>
                    <Input type="text" name="username" id="username" placeholder="abobus228" onChange={(e)=>setUsername(e.target.value)}/>
                    <Label htmlFor="password">enter password: </Label>
                    <Input type="password" name="password" id="password" placeholder="****" onChange={(e)=>setPassword(e.target.value)}/>
                    <RadioGroup defaultValue="male-option" onValueChange={setGender}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male-option" />
                            <Label htmlFor="male-option">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female-option" />
                            <Label htmlFor="female-option">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="others" id="others-option" />
                            <Label htmlFor="others-option">Other</Label>
                        </div>
                    </RadioGroup>
                    <Label htmlFor="birthday">enter birthday: </Label>
                    <Input type="date" name="birthday" id="birthday" onChange={(e)=>setBirthday(e.target.value)}/>
                    <Button onClick={handleSubmit}>Register</Button>
                </div>
            </main>
        </>
    )
}