'use client'
import { useUser } from "@/context/userContext"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { add_post } from "@/services/axiosMethods"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"



export default function AddPost(){
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [error, setError] = useState(null)
    const user = useUser()
    const data = user.user
    if (! data){
        redirect("/login")
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description) {
            setError("You must Enter some of that fields!")
            toast.error("You must Enter some of that fields!")
            return 
        }
        const res = await add_post(title, description)
        if (!res) {
            setError("Error happened! D:")
            toast.error("Error happened! D:")
        } else {
            setError(null)
            toast.success("Post posted successfully!")
        }
    }

    return(
        <>
            <Toaster position="bottom-center" richColors closeButton/>
            <main className="w-[80vw] mx-auto mt-4">
                <div className="w-1/3 mx-auto flex flex-col gap-2">
                    {error && <p>{error}</p>}
                    <Label htmlFor="title">Title:</Label>
                    <Input type="text" name="title" id="title" placeholder="my title there" onChange={(e) => setTitle(e.target.value)}></Input>
                    <Label htmlFor="description">Description:</Label>
                    <Textarea id="description" placeholder="description there" onChange={(e) => setDescription(e.target.value)}></Textarea>
                    <Button onClick={handleSubmit}>Add post</Button>
                </div>
            </main>
        </>
    )
}