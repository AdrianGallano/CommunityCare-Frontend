import { Image } from "lucide-react"
import { Link } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import Header from "../header/Header"
export default function Analytics() {
    return (
        <div>
            <Sidebar page="analytics" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header page="analytics" />
            </div>
        </div>
    )
}
