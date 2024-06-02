import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,

} from "@/components/ui/tooltip"
import {  UserRound } from "lucide-react"
import { Link } from "react-router-dom"
import {
    Home,
    LineChart,
    Map,
    Settings,
    Users2,
} from "lucide-react"



export default function Sidebar({ page }) {
    const desktopDefaultStyle = "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 hover:text-foreground"

    const iconState = {
        dashboard: desktopDefaultStyle,
        map: desktopDefaultStyle,
        families: desktopDefaultStyle,
        members: desktopDefaultStyle,
        analytics: desktopDefaultStyle,
        settings: desktopDefaultStyle
    }

    for (let icon in iconState) {
        if (page == icon) iconState[icon] += " bg-accent text-accent-foreground"
        else iconState[icon] += " text-muted-foreground"
    }


    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <Map className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Community Care</span>
                    </Link>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/dashboard"
                                    className={iconState.dashboard}
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/map"
                                    className={iconState.map}
                                >
                                    <Map className="h-5 w-5" />
                                    <span className="sr-only">Map</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Map</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/families"
                                    className={iconState.families}
                                >
                                    <Users2 className="h-5 w-5" />
                                    <span className="sr-only">Families</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Families</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/members"
                                    className={iconState.members}
                                >
                                    <UserRound className="h-5 w-5" />
                                    <span className="sr-only">Members</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Members</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/analytics"
                                    className={iconState.analytics}
                                >
                                    <LineChart className="h-5 w-5" />
                                    <span className="sr-only">Analytics</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Analytics</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/settings"
                                    className={iconState.settings}
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

        </>)
}