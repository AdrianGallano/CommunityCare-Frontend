import { Image } from "lucide-react"
import { Link } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"


export default function Dashboard() {


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="dashboard" />

        </div >
    )
}
