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


export default function Families() {
    const [families, setFamilies] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const AsyncFetch = async () => {
            setLoading(true)
            const data = await dataFetch("/families?page_size=10", "GET")
            setFamilies(data.results)
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

    const tableRows = families.map((family) => {
        return (
            <TableRow name={family.id} key={family.id} onClick={handleClick}>
                <TableCell className="font-medium">
                    {family.title}
                </TableCell>
                <TableCell>
                    {family.total_family_income}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {family.no_of_members}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {family.location.address}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {family.location.coordinates}
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
            <Sidebar page="families" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header page="families" />
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
                                        Add Family
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <Card x-chunk="dashboard-06-chunk-0">
                                <CardHeader>
                                    <CardTitle>Families</CardTitle>
                                    <CardDescription>
                                        Manage families and view their informations.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Family Name</TableHead>
                                                <TableHead>Household Income</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    No. of Family Members
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Address
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Coordinates
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
                                        Showing <strong>{pageInfo.previous ? pageInfo.previous : 1}-{pageInfo.count}</strong> of <strong>{pageInfo.count}</strong> Familiies
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


