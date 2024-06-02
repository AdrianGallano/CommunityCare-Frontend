import { Image } from "lucide-react"
import { Link } from "react-router-dom"
import Sidebar from "../sidebar/Sidebar"
import React, { useMemo, useState, useRef, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    LayersControl,
    ZoomControl,
    Popup,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
    const mapRef = useRef();
    const { BaseLayer } = LayersControl;
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="map" />
            <main className="h-screen w-full z-0 relative">
                <div className="h-full flex justify-center items-center">
                    <MapContainer
                        center={[14.831583808890002, 120.28337295677551]}
                        zoom={10}
                        scrollWheelZoom={true}
                        zoomControl={false}
                        ref={mapRef}
                        className="h-3/4 w-3/4"
                    >
                        <LayersControl>
                            <BaseLayer checked name="OpenStreetMap View">
                                <TileLayer
                                    attribution="Gordon College | CCS"
                                    url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                />
                            </BaseLayer>
                            <BaseLayer name="Hybrid View">
                                <TileLayer
                                    attribution="Gordon College | CCS"
                                    url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                    subdomains={["mt0", "mt1", "mt2", "mt3"]}
                                />
                            </BaseLayer>
                        </LayersControl>

                        <ZoomControl position="bottomright" />



                    </MapContainer>
                </div>
            </main >
        </div>
    )
}
