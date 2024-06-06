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

import RecordTable from "../recordtable/RecordTable"

export default function Members() {
    const [members, setMembers] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const columns = ["Name", "Contact No.", "Income", "Age", "Gender", "Actions"]

    useEffect(() => {
        const AsyncFetch = async () => {
            setLoading(true)

            try{
                const data = await dataFetch("/members?page_size=10", "GET")
                setMembers(data.results)
                setPageInfo({
                    "count": data.count,
                    "previous": data.previous,
                    "next": data.next
                })
            }catch(e){
                console.log(e)
            }finally{
                setLoading(false)
            }
        }
        AsyncFetch()
    }, [])


    const tableRows = members.map((member) => {
        return (
            <TableRow name={member.id} key={member.id}>
                <TableCell className="font-medium">
                    {member.name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.contact_no}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.income}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {member.age}
                </TableCell>
                <TableCell className="font-medium">
                    {member.gender}
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

    function addButtonHandler() {
        console.log("CLICK")
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="members" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <RecordTable
                    page="members"
                    pageAdj="Member"
                    columns={columns}
                    tableRows={tableRows}
                    pageInfo={pageInfo}
                    loading={loading}
                    onAddButtonHandler={addButtonHandler}
                />
            </div>
        </div>
    )
}


