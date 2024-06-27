
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
    Search,
    Home,
    LineChart,
    Map,
    Package2,
    PanelLeft,
    Settings,
    Users2,
} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header({ page }) {
    const mobileDefaultStyle = "flex items-center gap-4 px-2.5 "
    const navigate = useNavigate()

    const iconState = {
        dashboard: mobileDefaultStyle,
        map: mobileDefaultStyle,
        families: mobileDefaultStyle,
        members: mobileDefaultStyle,
        analytics: mobileDefaultStyle,
        settings: mobileDefaultStyle
    }

    for (let icon in iconState) {
        if (page == icon) iconState[icon] += " text-foreground"
        else iconState[icon] += " text-muted-foreground hover:text-foreground"
    }

    function logout() {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        localStorage.removeItem("username")
        localStorage.removeItem("email")
        localStorage.removeItem("id")
        navigate("/login")
    }

    return (
        <>
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className="sm:hidden">
                            <PanelLeft className="h-5 w-5" />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                to="/dashboard"
                                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                            >
                                <Map className="h-5 w-5 transition-all group-hover:scale-110" />
                                <span className="sr-only">Community Care</span>
                            </Link>
                            <Link
                                to="/dashboard"
                                className={iconState.dashboard}
                            >
                                <Home className="h-5 w-5" />
                                Dashboard
                            </Link>
                            <Link
                                to="/map"
                                className={iconState.map}
                            >
                                <Map className="h-5 w-5" />
                                Map
                            </Link>
                            <Link
                                to="/families"
                                className={iconState.families}
                            >
                                <Users2 className="h-5 w-5" />
                                Families
                            </Link>
                            <Link
                                to="/members"
                                className={iconState.members}
                            >
                                <Users2 className="h-5 w-5" />
                                Members
                            </Link>
                            <Link
                                to="/analytics"
                                className={iconState.analytics}
                            >
                                <LineChart className="h-5 w-5" />
                                Analytics
                            </Link>
                            <Link
                                to="/settings"
                                className={iconState.settings}
                            >
                                <Settings className="h-5 w-5" />
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <Breadcrumb className="hidden sm:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="#">{page[0].toUpperCase() + page.slice(1)}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="overflow-hidden rounded-full"
                        >
                            <User
                                src="/placeholder-user.jpg"
                                width={36}
                                height={36}
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header >
        </>)
}
