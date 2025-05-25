'use client'
import { Input } from "@/components/ui/input"
import { Label }  from "@/components/ui/label"
import {Button} from "@/components/ui/button"
import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { addComment } from "@/services/axiosMethods"

export default function AddComment({id}){
    const [comment, setComment] = useState(null)

    const handleComment = async(e) => {
        e.preventDefault()
        if (!comment) {
            toast.error("Comment was empty! Enter something!")
            return
        }
        const post_id = id
        const result = await addComment(post_id, comment)
        if (!result) {
            toast.error("Server error! Please, try again!")
            return
        }
        toast.success("Comment successfully posted!")
    }



    return(
        <>
            <Toaster position="bottom-center" richColors closeButton/>
            <div className="w-[80vw] mx-auto mt-4 border-2 border-white flex flex-col justify-start gap-4 p-4">
                <h1>Add comment: </h1>
                <Input type="text" name="comment" id="comment" placeholder="comment here" onChange={(e) => setComment(e.target.value)}/>
                <Button className="text-black border-2 border-green-700 rounded-none bg-green-400 hover:bg-green-300 w-100" onClick={handleComment}>Add comment</Button>
            </div>
        </>
    )
}