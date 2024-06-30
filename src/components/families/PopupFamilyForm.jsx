import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import "leaflet/dist/leaflet.css";
import { LoaderCircle, LocateFixed } from "lucide-react";
import MapForm from "../map/MapForm";

export default function PopupFamilyForm({ dialogData, isLoading, isOpen, onClose, family, onFamilyDataChange, onFamiliesDataSubmit, handleMapClick }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>{dialogData.title}</DialogTitle>
                    <DialogDescription>
                        {dialogData.description}
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
                            className="col-span-2"
                            name="title"
                            value={family.title}
                            placeholder="Gallano Family"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="address" className="text-right">
                            Address
                        </Label>
                        <Input
                            onChange={onFamilyDataChange}
                            id="address"
                            name="address"
                            className="col-span-2"
                            value={family.address}
                            placeholder="42 Acayan st. East tapinac"
                        />

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coordinates" className="text-right">
                            Coordinates
                        </Label>
                        <Input
                            onChange={onFamilyDataChange}
                            id="coordinates"
                            name="coordinates"
                            className="col-span-2"
                            value={family.coordinates}
                            placeholder="0, 0"
                            disabled
                        />
                        <div>
                            <Popover className="z-50">
                                <PopoverTrigger asChild>
                                <Button>
                                        <LocateFixed />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="z-50">
                                    <div className="flex flex-col items-center gap-2 z-50">
                                        <p className="text-center">
                                            <em>Locate your coordinates here, click the map to change pin location.</em>
                                        </p>
                                        <MapForm className="z-50"
                                            handleMapClick={handleMapClick}
                                            coordinates={family.coordinates == "" ? [0, 0] : family.coordinates.split(", ").map(coordinate => parseFloat(coordinate))} />
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

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
                            value={family.no_of_members}
                            placeholder="10"
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
                            value={family.total_family_income}
                            placeholder="50000 (in pesos)"

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
                            value={family.duration_of_residence}
                            placeholder="300 (in days)"
                        />

                    </div>

                </div>
                <DialogFooter>
                    {isLoading ? <Button disabled>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Saving Changes
                    </Button> : <Button type="submit" onClick={onFamiliesDataSubmit}>Save changes</Button>}

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
