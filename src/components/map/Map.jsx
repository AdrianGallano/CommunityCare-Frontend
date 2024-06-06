import PinIcon from "../../assets/pin.png";
import { Icon } from "leaflet";
import Sidebar from "../sidebar/Sidebar";
import React, { useMemo, useState, useRef, useEffect } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// Geocoder
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

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
import Header from "../header/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function LocationMarker() {
    const [position, setPosition] = useState(null);

        
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 15)
        },
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function GetCurrentUserLocation() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);
}

function GeocoderControl() {
    const map = useMap();

    useEffect(() => {
        const geocoder = L.Control.Geocoder.nominatim();
        const control = L.Control.geocoder({
            geocoder,
            defaultMarkGeocode: false,
        }).addTo(map);

        control.on('markgeocode', function (e) {
            console.log(e)
        })

        control.on('markgeocode', function (e) {
            const bbox = e.geocode.bbox;
            const poly = L.polygon([
                bbox.getSouthEast(),
                bbox.getNorthEast(),
                bbox.getNorthWest(),
                bbox.getSouthWest(),
            ]).addTo(map);

            map.fitBounds(poly.getBounds());
        });

        return () => {
            map.removeControl(control);
        };
    }, [map]);

    return null
}

export default function Map() {
    const [families, setFamilies] = useState([]);
    const { BaseLayer } = LayersControl;
    const mapRef = useRef(null)

    const icon = useMemo(
        () =>
            new Icon({
                iconUrl: PinIcon,
                iconSize: [24, 24],
            }),
        []
    );


    useEffect(() => {
        const AsyncFetch = async () => {
            const data = await dataFetch("/families?page_size=10000", "GET");
            setFamilies(data.results);
        };
        AsyncFetch();
    }, []);

    const marks = families.map((family) => {
        const familyCoordinates = family.coordinates.split(", ")
        return <Marker
            key={family.id}
            position={[familyCoordinates[0], familyCoordinates[1]]}
            icon={icon}
        >
        </Marker>
    })


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
                                <MapContainer
                                    center={[14.831583808890002, 120.28337295677551]}
                                    zoom={15}
                                    scrollWheelZoom={true}
                                    zoomControl={false}
                                    className="h-3/4 w-full"
                                    ref={mapRef}
                                >
                                    <LayersControl position="bottomright">
                                        <BaseLayer checked name="OpenStreetMap View">
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                            />
                                        </BaseLayer>
                                        <BaseLayer name="Hybrid View">
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                            />
                                        </BaseLayer>
                                        <ZoomControl position="topleft" />
                                    </LayersControl>
                                    <MarkerClusterGroup>
                                        {marks}
                                    </MarkerClusterGroup>

                                    <GeocoderControl />
                                    <LocationMarker />
                                </MapContainer>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
        </div>
    );
}
