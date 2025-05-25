import { get_post, getComments } from "@/services/axiosMethods"
import Image from "next/image"
import Link from "next/link";
import {Button} from "@/components/ui/button"
import { ThumbsUp } from "lucide-react";
import Comments from "@/components/Comments";
import AddComment from "@/components/AddComment";


export default async function PostPage({params}) {
    const {id} = params
    const post = await get_post(id)
    if (!post) {
        return (
            <>
                <h1>That post doesn't exist!</h1>
            </>
        )
    }
    const comments = await getComments(id)
    console.log(comments)
    
    return (
        <>
            <div className="w-[80vw] mx-auto mt-4 border-2 border-white flex justify-start gap-4 p-4">
                    <div>
                        <Image src={"/test.jpeg"} width={600} height={600} alt="test_imgage"></Image>
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <div className="w-full flex justify-between text-gray-400">
                            <span>{post.created}</span>
                            <span>{post.author}</span>
                        </div>
                        <div className="h-full">
                            <p className="text-justify">{post.description}</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <Button className="text-black border-2 border-blue-700 rounded-none bg-blue-400 hover:bg-blue-300"><ThumbsUp/>{post.likes}</Button>
                        </div>
                    </div>
            </div>
            <AddComment id={id}/>
            {comments && comments.map((comment, index) => (
                <Comments key={index} comment={comment}/>
            ))}
            <div className="mb-20"></div>
        </>
    )
}