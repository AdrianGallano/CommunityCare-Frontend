import { Image } from "lucide-react"
import Sidebar from "../sidebar/Sidebar"
import { useState, useEffect } from "react"
import dataFetch from "../../services/api"
import {
    File,
    ListFilter,
    MoreHorizontal,
    PlusCircle,
    LoaderCircle
} from "lucide-react"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Header from "../header/Header"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Members() {
    const [members, setMembers] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const AsyncFetch = async () => {
            setLoading(true)
            const data = await dataFetch("/members?page_size=10", "GET")
            setMembers(data.results)
            setPageInfo({
                "count": data.count,
                "previous": data.previous,
                "next": data.next
            })
            setLoading(false)
        }
        AsyncFetch()
    }, [])

    function handleClick(e) {
        console.log(e.currentTarget.getAttribute("name"))
    }

    const tableRows = members.map((member) => {
        return (
            <TableRow name={member.id} key={member.id} onClick={handleClick}>
                <TableCell className="font-medium">
                    {member.name}
                </TableCell>
                <TableCell>
                    {member.age}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.contact_no}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.income}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.gender}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.birthdate}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.birth_place}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        )
    })


    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="members" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header page="members" />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs defaultValue="all">
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Button size="sm" className="h-8 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Add Member
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Members</CardTitle>
                                    <CardDescription>
                                        Manage members and view their informations.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Age</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Contact No.
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Income
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Gender
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Date of Birth
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Place of Birth
                                                </TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {loading
                                                ? <TableRow>
                                                    <TableCell > </TableCell>
                                                    <TableCell > </TableCell>
                                                    <TableCell > </TableCell>
                                                    <TableCell>
                                                        <LoaderCircle className=" h-12 w-12 animate-spin" />
                                                    </TableCell>
                                                </TableRow>
                                                : tableRows}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                                <CardFooter>
                                    <div className="text-xs text-muted-foreground">
                                        Showing <strong>{pageInfo.previous ? pageInfo.previous : 1}-{pageInfo.count}</strong> of <strong>{pageInfo.count}</strong> Members
                                    </div>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}


