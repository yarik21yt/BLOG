"use client"
import { useUser } from "@/context/userContext"
import { Button } from "./ui/button"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from "@/services/axiosMethods";




export default function ProfileBar() {

	const {user, setUser} = useUser()
	const handleLogout = async ()=>{
		await logout()
		setUser(null)
	}


	return (
	  <>
		{user ? <div className="flex flex-row gap-2 items-center mr-2">
		  <Avatar className="border-2 border-green-700">
			<AvatarImage src={user.picture} />

		  	<AvatarFallback>PH</AvatarFallback>
			</Avatar>
			<Link href="/profile"><h1>{user.username}</h1></Link>
			<Button className="text-black border-2 border-gray-700 rounded-none bg-gray-400 hover:bg-gray-300" onClick={handleLogout}>Logout</Button>

		</div>:<div className="flex flex-row gap-2 items-center mr-2">
		  <Link href={"/login"}><Button className="text-black border-2 border-green-700 rounded-none bg-green-400 hover:bg-green-300">Login</Button></Link>
		  <Link href={"/register"}><Button className="text-black border-2 border-blue-700 rounded-none bg-blue-400 hover:bg-blue-300">Register</Button></Link>          
		  </div>}
	  </>
	);
}