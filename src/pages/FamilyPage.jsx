/* Components */
import Sidebar from "../components/sidebar/Sidebar"
import RecordTable from "../components/recordtable/RecordTable"
import PopupFamilyForm from "../components/families/PopupFamilyForm"
import LoadingPopUp from "../components/loading/LoadingPopUp"
import TableFamilyRows from "../components/families/TableFamilyRows"
import AlertPopup from "../components/alertpopup/AlertPopup"


/* Utils */
import dataFetch from "../services/api"

/* React  */
import { useState, useEffect } from "react"

/* Shadcn Components */
import { Toaster } from "sonner"
import { toggleToast } from "../components/toaster/ToggleToaster"



export default function FamilyPage() {
    /* Data */
    const [families, setFamilies] = useState([])
    const [pageInfo, setPageInfo] = useState({})
    const [familyData, setFamilyData] = useState({
        title: "",
        no_of_members: "",
        duration_of_residence: "",
        total_family_income: "",
        address: "",
        coordinates: "",
    })
    
    const [dialogData, setDialogData] = useState(null)
    
    /* Loadings */
    const [loadingFetchFamilies, setLoadingFetchFamilies] = useState(false)
    const [singleFetchLoading, setSingleFetchLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    
    const [submitEventMethod, setSubmitEventMethod] = useState(null)

    /* CRUD */
    const [isFamilyFormPopupOpen, setisFamilyFormPopupOpen] = useState(false)
    const [isDeleteDialogOpen, setDeleteIsDialogOpen] = useState(false)
    /* Pagination */
    const [currentNumberOfRows, setCurrentNumberOfRows] = useState("10")

    /* Component Creation */
    const columns = ["Family Name",
        "Household Income", "No. of Family Members",
        "Coordinates", "Address", "Actions"]
    /* End Component Creation */

    /* Effects */
    useEffect(() => {
        asyncFetchFamilies();
    }, [currentNumberOfRows])

    /* End Effects */

    /* Events */

    function onFamilyDataChange(e) {
        setFamilyData((prevFamilyData) => {
            const { name, value } = e.target
            return { ...prevFamilyData, [name]: value }
        })
    }

    async function onFamiliesDataSubmit() {
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
            onCloseOfFamilyFormPopup()
            asyncFetchFamilies()
        }
    }

    function onCloseOfFamilyFormPopup() {
        setisFamilyFormPopupOpen(false)
    }

    async function onFamiliesDataDelete() {
        try {
            await asyncDeletefamily()
            toggleToast("Family record has been deleted")
        } catch (e) {
            console.log(e)
        } finally {
            closeDeletePopup()
            asyncFetchFamilies()
        }
    }

    /* End Events */

    /* Actions */

    async function editButtonHandler(familyId) {
        setSubmitEventMethod("PUT")
        await asyncFetchFamily(familyId)
        setDialogData({
            title: "Update Family",
            description: "Make modifications to the families record here. Click save when you're done."
        })
        setisFamilyFormPopupOpen(true)
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

        for (let key in familyData) {
            familyData[key] = ""
        }

        setDialogData({
            title: "Add Family",
            description: "Make additions to the families record here. Click save when you're done."
        })

        setisFamilyFormPopupOpen(true)
    }

    function handleMapClick(newCoordinates) {
        setFamilyData((prevFamilyData) => {
            return { ...prevFamilyData, coordinates: newCoordinates }
        })
    }

    function handleRowsPopoverChange(value){
        setCurrentNumberOfRows(value)
    }
    
    /* End Actions */


    /* Fetching */
    async function asyncCreateFamily() {
        setSubmitLoading(true)
        try {
            await dataFetch("api/families", "POST", familyData);
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitLoading(false)
        }
    }

    const asyncFetchFamilies = async () => {
        setLoadingFetchFamilies(true)
        try {
            const data = await dataFetch(`api/families?page_size=${currentNumberOfRows}`, "GET")
            setFamilies(data.results)
            setPageInfo({
                "count": data.count,
                "previous": data.previous,
                "next": data.next
            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingFetchFamilies(false)
        }
    }

    async function asyncFetchFamily(familyId) {
        setSingleFetchLoading(true)
        try {
            const data = await dataFetch(`api/families/${familyId}`, "GET");
            setFamilyData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setSingleFetchLoading(false)
        }
    }

    async function asyncUpdateFamily() {
        setSubmitLoading(true)
        try {
            const data = await dataFetch(`api/families/${familyData.id}`, "PUT", familyData);
            setFamilyData(data)
        } catch (e) {
            console.log(e)
        } finally {
            setSubmitLoading(false)
        }
    }

    async function asyncDeletefamily() {
        setSingleFetchLoading(true)
        try {
            await dataFetch(`api/families/${familyData.id}`, "DELETE");
        } catch (e) {
            console.log(e)
        } finally {
            setSingleFetchLoading(false)
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
                    <AlertPopup
                        isDeleteDialogOpen={isDeleteDialogOpen}
                        closeDeletePopup={closeDeletePopup}
                        onFamiliesDataDelete={onFamiliesDataDelete}
                        description="This action cannot be undone. This will permanently delete this
                        family and remove your data from our servers."
                    />
                    {isFamilyFormPopupOpen &&
                        <PopupFamilyForm
                            dialogData={dialogData}
                            isLoading={submitLoading}
                            isOpen={isFamilyFormPopupOpen}
                            onClose={onCloseOfFamilyFormPopup}
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
                        asyncFetchFamilies={asyncFetchFamilies}
                        pageInfo={pageInfo}
                        loading={loadingFetchFamilies}
                        onAddButtonHandler={addButtonHandler}
                        handleRowsPopoverChange={handleRowsPopoverChange}
                        currentNumberOfRows={currentNumberOfRows}
                    />
                </div>
            </div>
        </>
    )
}
