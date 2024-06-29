/* Components */
import Sidebar from "../components/sidebar/Sidebar"
import RecordTable from "../components/recordtable/RecordTable"
import PopupFamilyForm from "../components/families/PopupFamilyForm"
import LoadingPopUp from "../components/loading/LoadingPopUp"
import TableFamilyRows from "../components/families/TableFamilyRows"

/* Utils */
import dataFetch from "../services/api"

/* React  */
import { useState, useEffect } from "react"

/* Shadcn Components */


import { Toaster } from "sonner"
import { toggleToast } from "../components/toaster/ToggleToaster"
import moment from "moment/moment"



import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Loading from "../components/loading/Loading"


/* 
BRAINSTORM 2
1. We should focus on components instead?
2. Family Fetches are already at their lowest level
3.

*/


/* 
PLAN 2
1. DELETE COMPONENT
2.
3.

*/

export default function FamilyPage() {
    const [families, setFamilies] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [singleFetchLoading, setSingleFetchLoading] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [familyData, setFamilyData] = useState({
        title: "",
        no_of_members: "",
        duration_of_residence: "",
        total_family_income: "",
        address: "",
        coordinates: "",
    })

    const [dialogData, setDialogData] = useState(null)
    const [submitEventMethod, setSubmitEventMethod] = useState(null)
    const [isDeleteDialogOpen, setDeleteIsDialogOpen] = useState(null)

    /* Component Creation */
    const columns = ["Family Name",
        "Household Income", "No. of Family Members",
        "Coordinates", "Address", "Actions"]
    /* End Component Creation */

    /* Effects */
    useEffect(() => {
        asyncFetchFamilies();
    }, [])

    /* End Effects */

    /* Events */

    /* CHECKED ✅ */
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
                await asyncUpdateFamily()
                toggleToast("Family record has been updated")
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
    /* END CHECKED ✅ */

    /* Actions */

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

    async function closeDeletePopup() {
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
            coordinates: "",
        })

        setDialogData({
            title: "Add Family",
            description: "Make additions to the families record here. Click save when you're done."
        })

        setIsPopupOpen(true)
    }




    function handleMapClick(newCoordinates) {
        setFamilyData((prevFamilyData) => {
            return { ...prevFamilyData, coordinates: newCoordinates }
        })
    }

    /* End Actions */


    /* Fetching */
    async function asyncCreateFamily() {
        setLoading(true)
        try {
            await dataFetch("api/families", "POST", familyData);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const asyncFetchFamilies = async () => {
        setLoading(true)
        try {
            const data = await dataFetch("api/families?page_size=10", "GET")
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
        try {
            setSingleFetchLoading(true)
            const data = await dataFetch(`api/families/${familyId}`, "GET");
            setFamilyData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setSingleFetchLoading(false)
        }
    }

    async function asyncUpdateFamily() {
        setLoading(true)
        try {
            const data = await dataFetch(`api/families/${familyData.id}`, "PUT", familyData);
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
            await dataFetch(`api/families/${familyData.id}`, "DELETE");
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    /* End Fetching */

    return (
        <>
            {singleFetchLoading && <LoadingPopUp />}
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
                        tableRows={<TableFamilyRows families={families} editButtonHandler={editButtonHandler} openDeletePopup={openDeletePopup} />}
                        pageInfo={pageInfo}
                        loading={loading}
                        onAddButtonHandler={addButtonHandler}
                    />
                </div>
            </div>
        </>
    )
}


/* 
we need to determine how we'll handle the popups 
we could have alt solutions but it'll be better if we can do it as simple as we can
and it could have a SOLID Principle

*/