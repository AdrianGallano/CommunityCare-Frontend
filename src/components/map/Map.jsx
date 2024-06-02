import PinIcon from "../../assets/pin.png"
import { Icon } from "leaflet";
import Sidebar from "../sidebar/Sidebar"
import React, { useMemo, useState, useRef, useEffect } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
    MapContainer,
    TileLayer,
    Marker,
    LayersControl,
    ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dataFetch from "../../services/api";
import Header from "../header/Header";

export default function Map() {
    const [families, setFamilies] = useState({})
    const mapRef = useRef();
    const { BaseLayer } = LayersControl;
    const icon = useMemo(
        () =>
            new Icon({
                iconUrl: PinIcon,
                iconSize: [24, 24],
            })
    );

    useEffect(() => {
        const AsyncFetch = async () => {
            const data = await dataFetch("/families?page_size=100000", "GET")
            setFamilies(data.results)
        }
        AsyncFetch()
    }, [])

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar page="map" />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header page="map" />
                <main className="h-screen w-full z-0 relative">
                    <div className="h-full flex justify-center">
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

                            <MarkerClusterGroup chunkedLoading>
                                <Marker
                                    key={1}
                                    position={[14.831583808890002, 120.28337295677551]}
                                    icon={icon}
                                >
                                </Marker>
                            </MarkerClusterGroup>

                        </MapContainer>
                    </div>
                </main >
            </div>
        </div>
    )
}
