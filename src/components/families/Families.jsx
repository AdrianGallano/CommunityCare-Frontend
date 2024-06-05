import Sidebar from "../sidebar/Sidebar"
import { useState, useEffect } from "react"
import dataFetch from "../../services/api"
import RecordTable from "../recordtable/RecordTable"
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
} from "lucide-react"
import FamiliesForm from "./FamilesForm"


export default function Families() {
    const [families, setFamilies] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)


    const columns = ["Family Name", "Household Income", "No. of Family Members", "Address", "Coordinates", "Actions"]
    const tableRows = families.map((family) =>
        <TableRow name={family.id} key={family.id} >
            <TableCell className="font-medium">
                {family.title}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {family.total_family_income}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {family.no_of_members}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {family.location.address}
            </TableCell>
            <TableCell className="font-medium">
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

    function addButtonHandler() {
        setIsPopupOpen(true)
    }

    function onClosePopup() {
        setIsPopupOpen(false)
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="families" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                {isPopupOpen && <FamiliesForm isOpen={isPopupOpen} onClose={onClosePopup} />}
                <RecordTable
                    page="families"
                    pageAdj="Family"
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


