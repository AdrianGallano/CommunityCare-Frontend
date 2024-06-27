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

export default function TableFamilyRows({families, editButtonHandler, openDeletePopup}){
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
                {family.coordinates}
            </TableCell>
            <TableCell className="font-medium">
                {family.address}
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
                        <DropdownMenuItem onClick={() => editButtonHandler(family.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeletePopup(family.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )

    return(
        <>
        {tableRows}
        </>
    )
}