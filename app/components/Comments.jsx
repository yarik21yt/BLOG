import { get_post } from "@/services/axiosMethods"
import Image from "next/image"
import Link from "next/link";
import {Button} from "@/components/ui/button"
import { ThumbsUp } from "lucide-react";

export default function Comments({comment}){
    return(
        <>
            <div className="w-[80vw] mx-auto mt-4 border-2 border-white flex  gap-4 p-4">
                <div className="w-full flex flex-row gap-2">
                    <div>
                        <Image src={"/test.jpeg"} width={60} height={60} alt="test_imgage" className="min-w-[60px] min-h-[60px]"></Image>
                    </div>
                    <div className="w-full flex flex-col">
                        <h1 className="text-3xl font-bold"></h1>
                        <div className="w-full flex justify-between text-gray-400">
                            <div>{comment.username}</div>
                            <div>{comment.created}</div>
                        </div>
                        <div className="h-full">
                            <p className="text-justify">{comment.text}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}