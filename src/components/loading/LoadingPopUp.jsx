import React from "react";
import LoadingMap from "./LoadingMap";

export default function LoadingPopUp() {
    return (
        <div className="fixed z-40 bg-black/80 top-0 left-0 flex flex-col h-screen w-screen justify-center items-center">
            <LoadingMap />
            <p className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold mt-2">Let  me cook...</p>
        </div>)
}