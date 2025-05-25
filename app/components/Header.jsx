import Logo from "./Logo";
import NavigationPanel from "./Navigaton";
import ProfileBar from "./ProfileBar";

export default function Header() {
    return (
        <>  
            <div className="flex flex-row justify-between w-[80vw] mx-auto border-2 border-white bg-black text-white">
                <Logo/>
                <NavigationPanel/>
                <ProfileBar/>
            </div>
        </>
    )
}