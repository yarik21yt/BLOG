import Link from "next/link";

export default function NavigationPanel() {
    return (
        <>
            <div className="flex flex-row items-center font-bold gap-6 text-lg">
                <Link href={"/"} className="text-blue-400 hover:text-green-400">Home</Link>
                <Link href={"/add_post"} className="text-blue-400 hover:text-green-400">Add post</Link>
                <Link href={"/about"} className="text-blue-400 hover:text-green-400">About</Link>
            </div>
        </>
    )
}