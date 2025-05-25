import Image from "next/image"
import Link from "next/link";
import Post from "@/components/Post"
import { get_posts } from "@/services/axiosMethods";

export default async function Posts(){
    const posts = await get_posts()
    return (
        <>
            <main className="w-[80vw] mx-auto mt-4 grid grid-cols-2 gap-4 pb-30">
                {posts.map((post, index) => (
                    <Post post={post} index={index} key={index}/>
                ))}
            </main>
        </>
    )
}