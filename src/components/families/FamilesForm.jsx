import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    LayersControl,
    ZoomControl,
    useMapEvents,
    useMap, Popup

} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dataFetch from "../../services/api";
import { LoaderCircle } from "lucide-react";

export default function FamiliesForm({ isOpen, onClose }) {
    const { BaseLayer } = LayersControl;
    const [familyData, setFamilyData] = useState({
        title:"",
        no_of_members:"",
        duration_of_residence:"",
        total_family_income:"",
        location_id:""

    })
    const [locationData, setLocationData] = useState({
        address:"",
        coordinates:""
    })
    const [isLoading, setIsLoading] = useState(false)

    function onFamilyDataChange(e) {
        setFamilyData((prevFamilyData) => {
            const { name, value } = e.target
            return { ...prevFamilyData, [name]: value }
        })
    }

    function onLocationDataChange(e) {
        setLocationData((prevLocationData) => {
            const { name, value } = e.target
            console.log(locationData)
            return { ...prevLocationData, [name]: value }
        })
    }

    async function onFamilyDataSubmit() {

        setIsLoading(true)
        console.log(locationData)
        const resLocation = await dataFetch("/locations", "POST", locationData);
        familyData["location_id"] = resLocation.id

        await dataFetch("/families", "POST", familyData);
        setIsLoading(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Add Family</DialogTitle>
                    <DialogDescription>
                        Make additions to the families record here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="family-name" className="text-right">
                            Family Name
                        </Label>
                        <Input
                            onChange={onFamilyDataChange}
                            id="family-name"
                            className="col-span-3"
                            name="title"
                            value={familyData.title}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="members-count" className="text-right">
                            No of Members
                        </Label>
                        <Input
                            onChange={onFamilyDataChange}
                            type="number"
                            id="members-count"
                            className="col-span-1"
                            name="no_of_members"
                            value={familyData.no_of_members}
                        />

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="family-income" className="text-right">
                            Family Income
                        </Label>
                        <Input
                            onChange={onFamilyDataChange}
                            type="number"
                            id="family-income"
                            className="col-span-1"
                            name="total_family_income"
                            value={familyData.total_family_income}

                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration-of-residence" className="text-right">
                            Duration of residence
                        </Label>
                        <Input
                            onChange={onFamilyDataChange}
                            type="number"
                            id="duration-of-residence"
                            className="col-span-1"
                            name="duration_of_residence"
                            value={familyData.duration_of_residence}
                        />

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            onChange={onLocationDataChange}
                            id="address"
                            name="address"
                            className="col-span-3"
                            value={locationData.address}

                        />

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coordinates" className="text-right">
                            Coordinates
                        </Label>
                        <Input
                            onChange={onLocationDataChange}
                            id="coordinates"
                            name="coordinates"
                            className="col-span-2"
                            value={locationData.coordinates}
                        />

                    </div>
                </div>
                <DialogFooter>
                    {isLoading ? <Button disabled>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes
                    </Button> : <Button type="submit" onClick={onFamilyDataSubmit}>Save changes</Button>}

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
