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
import PopupFamilyForm from "./PopupFamilyForm"
import { Toaster, toast } from "sonner"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Families() {
    const [families, setFamilies] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [familyData, setFamilyData] = useState({
        title: "",
        no_of_members: "",
        duration_of_residence: "",
        total_family_income: "",
        address: "",
        coordinates: "14.834221447411265, 120.28504192829134",
    })

    const [dialogData, setDialogData] = useState(null)
    const [submitEventMethod, setSubmitEventMethod] = useState(null)
    const [isDeleteDialogOpen, setDeleteIsDialogOpen] = useState(null)

    /* Component Creation */
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
                {family.address}
            </TableCell>
            <TableCell className="font-medium">
                {family.coordinates}
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

    /* End Component Creation */


    /* Effects */

    useEffect(() => {
        asyncFetchFamilies();
    }, [])

    /* End Effects */

    /* Events */

    function onFamilyDataChange(e) {
        setFamilyData((prevFamilyData) => {
            const { name, value } = e.target
            return { ...prevFamilyData, [name]: value }
        })
    }

    async function onFamiliesDataSubmit() {
        setLoading(true)
        try {
            if (submitEventMethod == "POST") {
                await asyncCreateFamily()
                toggleToast("Family record has been created")
            } else {
                toggleToast("Family record has been updated")
                await asyncUpdateFamily()
            }

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
            onClosePopup()
            asyncFetchFamilies()
        }
    }

    function onClosePopup() {
        setIsPopupOpen(false)
    }

    async function onFamiliesDataDelete() {
        setLoading(true)
        try {
            await asyncDeletefamily()
            toggleToast("Family record has been deleted")
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
            closeDeletePopup()
            asyncFetchFamilies()
        }
    }

    /* End Events */

    /* Handlers */

    async function editButtonHandler(familyId) {
        setSubmitEventMethod("PUT")
        await asyncFetchFamily(familyId)
        setDialogData({
            title: "Update Family",
            description: "Make modifications to the families record here. Click save when you're done."
        })
        setIsPopupOpen(true)
    }

    async function openDeletePopup(familyId) {
        await asyncFetchFamily(familyId)
        setDeleteIsDialogOpen(true)
    }

    async function closeDeletePopup(familyId) {
        setDeleteIsDialogOpen(false)
    }

    function addButtonHandler() {
        setSubmitEventMethod("POST")
        setFamilyData({
            id: "",
            title: "",
            no_of_members: "",
            duration_of_residence: "",
            total_family_income: "",
            address: "",
            coordinates: "14.834221447411265, 120.28504192829134",
        })

        setDialogData({
            title: "Add Family",
            description: "Make additions to the families record here. Click save when you're done."
        })

        setIsPopupOpen(true)
    }

    function toggleToast(title) {
        toast(title, {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
                label: "Close",
                onClick: () => console.log("Closed"),
            },
        })
    }


    function handleMapClick(newCoordinates) {
        setFamilyData((prevFamilyData) => {
            return { ...prevFamilyData, coordinates: newCoordinates }
        })
    }

    /* End Handlers */


    /* Fetching */
    const asyncFetchFamilies = async () => {
        setLoading(true)
        try {
            const data = await dataFetch("/families?page_size=10", "GET")
            setFamilies(data.results)
            setPageInfo({
                "count": data.count,
                "previous": data.previous,
                "next": data.next
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    async function asyncFetchFamily(familyId) {
        setLoading(true)
        try {
            const data = await dataFetch(`/families/${familyId}`, "GET");
            setFamilyData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    async function asyncUpdateFamily() {
        setLoading(true)
        try {
            const data = await dataFetch(`/families/${familyData.id}`, "PUT", familyData);
            setFamilyData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    async function asyncDeletefamily() {
        setLoading(true)
        try {
            await dataFetch(`/families/${familyData.id}`, "DELETE");
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    async function asyncCreateFamily() {
        setLoading(true)
        try {
            await dataFetch("/families", "POST", familyData);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    /* End Fetching */

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Toaster />

            <Sidebar page="families" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeletePopup} >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this
                                family and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onFamiliesDataDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                {isPopupOpen &&
                    <PopupFamilyForm
                        dialogData={dialogData}
                        isLoading={loading}
                        isOpen={isPopupOpen}
                        onClose={onClosePopup}
                        family={familyData}
                        onFamilyDataChange={onFamilyDataChange}
                        onFamiliesDataSubmit={onFamiliesDataSubmit}
                        handleMapClick={handleMapClick}
                    />}
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


