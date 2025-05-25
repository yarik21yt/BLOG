"use client"
import Image from "next/image"
import { useUser } from "@/context/userContext";
import { Cake, Info, Mail, Mars, User, Venus } from "lucide-react";
import { redirect } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { editDescription, editPicture } from "@/services/axiosMethods";


export default function ProfilePage() {
    const {user} = useUser()
    if (!user){
        redirect("/")
    }
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const handleEditDescription = async() => {
        if (!description) {
            toast.error("You forgot to enter new description!")
            return
        }
        console.log(description)
        const result = await editDescription(description)
        if (!result) {
            toast.error("Description changing isn't done successfully! :-(")
            return 
        } else {
            toast.success("Description changed successfully! :-D")
        }
    }
    const editImage = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)
        }
    }

    const handleEditPicture = async() => {
        if (!image) {
            toast.error("Image doesn't uploaded to our servers! :-( Fail")
            return
        }
        console.log(image)
        const formData = new FormData()
        formData.append("image", image)
        const result = await editPicture(formData)
        if (!result) {
            toast.error("Image (Picture) isn't changing!")
            return 
        } else {
            toast.success("Image changed successfully! :-D")
        }
    }
    return (
        <>
            <Toaster position="bottom-center" richColors closeButton/>
            <div className="w-[80vw] mx-auto mt-4 border-2 border-white flex justify-start gap-4 p-4">
                    <div>
                        {user.picture ? (
                            <Image src={user.picture} width={200} height={200} alt="test_imgage"></Image>
                        ):(
                            <Image src={"/test.jpeg"} width={200} height={200} alt="test_imgage"></Image>
                        )}
                        
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <div className="w-full flex justify-between text-gray-400">
                            <span>{user.email}</span>
                        </div>
                        <div className="h-full flex flex-col justify-between">
                            <p className="text-justify">
                                {user.description ? user.description : "There is no description on that profile!"}
                            </p>
                        
                        <AlertDialog>
                            <AlertDialogTrigger>Edit description</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-black">Editing description</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <Input type="text" name="description" id="description" placeholder="Your description here" value={description} onChange={(e)=>setDescription(e.target.value)}/>

                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleEditDescription}>Confirm</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                            <AlertDialogTrigger>Edit Profile Picture</AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-black">Editing Profile Picture</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <Input type="file" name="image" id="image" onChange={editImage}/>

                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleEditPicture}>Confirm</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </div>

                    </div>
            </div>
            <div className="w-[80vw] mx-auto mt-4 border-2 border-white flex justify-start gap-4 p-4">
                    <div className="w-2/3 flex flex-col gap-5">
                        <h1 className="text-3xl font-bold">User information:</h1>
                        <div className="h-full">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-1">
                                    <User/>{user.username}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Mail/>{user.email}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Cake/>{user.birthday}
                                </div>
                                <div className="flex items-center gap-1">
                                    { user.gender === 'male' ? (
                                        <>
                                            <Mars/>Male
                                        </>
                                    ) : user.gender === 'female' ? (
                                        <>
                                            <Venus/>Female
                                        </>                                        
                                    ) : (
                                        <>
                                            <Info/>Creature
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div className="mb-20"></div>
        </>
    )
}