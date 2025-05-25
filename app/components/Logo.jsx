import { Earth } from "lucide-react";

export default function Logo() {
    return (
        <>
            <div className="flex flex-row items-center text-7xl font-bold text-blue-400">
                <h1>BL</h1>
                <Earth size={50} strokeWidth={3} color="#75cf00"/>
                <h1>G</h1>
            </div>
        </>
    )
}