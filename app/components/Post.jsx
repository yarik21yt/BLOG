"use client"
import Image from "next/image"
import Link from "next/link";
import {Button} from "@/components/ui/button"
import { ThumbsUp } from "lucide-react";
import { addLike , removeLike} from "@/services/axiosMethods";
export default function Post({post, index}){
    const handleLike = async () => {
        const response = await addLike(post.id.toString());
        if (response) {
            // Update the post likes count or handle the response as needed
            console.log("Post liked successfully");
        } else {
            const removeResponse = await removeLike(post.id.toString());
            if (removeResponse) {
                // Update the post likes count or handle the response as needed
                console.log("Like removed successfully");
            } else {
                console.error("Failed to remove like");
            }
        }
    };
    return(
        <>
            <div key={index} className="w-full border-2 border-white flex justify-start gap-4 p-4">
                    <div>
                        <Image src={"/test.jpeg"} width={300} height={300} alt="test_imgage"></Image>
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <div className="w-full flex justify-between text-gray-400">
                            <span>{post.created}</span>
                            <Link href={`/profile/${post.author}`}><span>{post.author}</span></Link>
                        </div>
                        <div className="h-full">
                            <p className="text-justify">{post.description}</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <Link href={`/posts/${post.id}`} className="text-blue-400 hover:text-green-400">Read more...</Link>
                            <Button className="text-black border-2 border-blue-700 rounded-none bg-blue-400 hover:bg-blue-300" onClick={handleLike}><ThumbsUp/>{post.likes}</Button>
                        </div>
                    </div>
                </div>

        </>
    )
}