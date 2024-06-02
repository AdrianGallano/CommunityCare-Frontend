import { Image } from "lucide-react"
import { Link } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"

export default function Dashboard() {


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="dashboard" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header page="dashboard" />
            </div >
        </div >
    )
}
