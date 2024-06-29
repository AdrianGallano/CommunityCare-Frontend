import React from "react";
import LoadingMap from "./LoadingMap";


export default function Loading() {
    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center">
            <LoadingMap />
            <p className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ">Let me cook...</p>
        </div>)
}

