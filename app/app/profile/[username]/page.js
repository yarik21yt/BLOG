import { get_profile_other } from "@/services/axiosMethods";
import Image from "next/image"
import { Cake, Info, Mail, Mars, User, Venus } from "lucide-react";
import { notFound, redirect } from "next/navigation";



export default async function ProfilePage({params}) {
    const {username} = params
    const user = await get_profile_other(username)
    if (!user) {
        notFound()
    }
    return (
        <>
            <div className="w-[80vw] mx-auto mt-4 border-2 border-white flex justify-start gap-4 p-4">
                    <div>
                        <Image src={"/test.jpeg"} width={200} height={200} alt="test_imgage"></Image>
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <h1 className="text-3xl font-bold">{user.username}</h1>
                        <div className="h-full">
                            <p className="text-justify">
                                {user.description ? user.description : "There is no description on that profile!"}
                            </p>
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