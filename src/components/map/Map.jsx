import PinIcon from "../../assets/pin.png";
import { Icon } from "leaflet";
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
    useMap, Popup,
    Tooltip

} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function GoToLocation() {
    const [position, setPosition] = useState(null);


    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 15)
        },
        mouseover() {
        }
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function SearchLocation() {
    const map = useMap();

    useEffect(() => {
        const geocoder = L.Control.Geocoder.nominatim();
        const control = L.Control.geocoder({
            geocoder,
            defaultMarkGeocode: false,
        }).addTo(map);

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

function fetchMarkerData(data, tooltipDataLabel, icon, onMarkerClickEvent = null) {
    /* 
    @data 
    @tooltipDataLabel 
    @icon 
    @onMarkerClickEvent:optional -> markers might not have a click event
    */
    
    return data.map((row) => {
        const familyCoordinates = row.coordinates.split(", ")
        const columns = Object.values(row).slice(1)


        const tooltipData = columns.map((value, index) => {
            return <p key={index} >{tooltipDataLabel[index]} {value}</p>
        })

        return <Marker
            key={row.id}
            position={[familyCoordinates[0], familyCoordinates[1]]}
            icon={icon}
            eventHandlers={onMarkerClickEvent && {
                click() {
                    onMarkerClickEvent()
                }
            }}
        >

            <Tooltip minWidth={90}>
                {tooltipData}
                <p className="text-blue-500">click pin to see more.</p>
            </Tooltip>

        </Marker>
    })
}


export default function Map({ data, openDialogPopup, tooltipDataLabel }) {
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


    const markers = data ? fetchMarkerData(data, tooltipDataLabel, icon, openDialogPopup) : null

    return (
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
                {markers}
            </MarkerClusterGroup>
            <SearchLocation />
            <GoToLocation />
        </MapContainer>
    );
}
