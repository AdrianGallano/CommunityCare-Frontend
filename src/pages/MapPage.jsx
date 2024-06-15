import { React, useState, useEffect } from "react";

/* Utilities */
import dataFetch from "../services/api";

/* Components */
import Map from "../components/map/Map";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

/* Shadcn Components */
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"


export default function MapPage() {
    const [isDialogPopupOpen, setIsDialogPopupOpen] = useState(false)
    const [families, setFamilies] = useState(null)
    const tooltipDataLabel = ["Family name", "No. of members", "Total family income", "Duration of residence", "Address", "Coordinates"]
    
    useEffect(() => {
        const AsyncFetch = async () => {
            const data = await dataFetch("/families?page_size=10000", "GET");
            setFamilies(data.results);
        };
        AsyncFetch();
    }, []);

    function openDialogPopup() {
        setIsDialogPopupOpen(true)
    }

    function closeDialogPopup() {
        setIsDialogPopupOpen(false)
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="map" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header page="map" />
                <main className="h-screen w-full z-0 relative">
                    <Card className="mx-4">
                        <CardHeader>
                            <CardTitle>Map Overview</CardTitle>
                            <CardDescription>
                                Get an overview of your community information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-screen flex justify-center">
                                <Map data={families} openDialogPopup={openDialogPopup} tooltipDataLabel={tooltipDataLabel} />
                            </div>
                        </CardContent>
                    </Card>
                </main>
                <Dialog open={isDialogPopupOpen} onOpenChange={closeDialogPopup}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>More Info Here</DialogTitle>
                            <DialogDescription>
                                Feature to be continued.
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

