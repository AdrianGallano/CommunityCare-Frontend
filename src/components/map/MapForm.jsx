

import { useMemo } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    LayersControl,
    useMapEvents,

} from "react-leaflet";
import PinIcon from "../../assets/pin.png";
import { Icon } from "leaflet";

export default function MapForm({ handleMapClick, coordinates }) {

    /* when component is initialize find your current location */

    const { BaseLayer } = LayersControl;

    const icon = useMemo(
        () =>
            new Icon({
                iconUrl: PinIcon,
                iconSize: [24, 24],
            }),
        []
    );


    function InitializeLocationToCurrentLocation() {
        const map = useMapEvents({
            locationfound(e) {
                const { lat, lng } = e.latlng
                handleMapClick(`${lat}, ${lng}`)
            }
        });

        if (coordinates.every((item) => item === 0)) {
            map.locate({ setView: true, maxZoom: 16 });
        }

        return null;
    }

    function HandleMapEvent() {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng
                handleMapClick(`${lat}, ${lng}`)
            },
        })

        return null
    }

    return (
        <MapContainer
            center={coordinates}
            zoom={15}
            scrollWheelZoom={true}
            zoomControl={false}
            className="h-56 w-56"
        >
            <LayersControl position="topright">
                <BaseLayer checked name="OpenStreetMap View">
                    <TileLayer
                        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    />
                </BaseLayer>
                <BaseLayer name="Hybrid View">
                    <TileLayer
                        url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                        subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    />
                </BaseLayer>
            </LayersControl>
            <HandleMapEvent />
            <Marker
                position={coordinates}
                icon={icon}
            >

            </Marker>
            <InitializeLocationToCurrentLocation />
            {/*             
            <GeocoderControl />
            <LocationMarker /> */}
        </MapContainer>

    )
}

