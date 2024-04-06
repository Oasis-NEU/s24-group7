"use client";

import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWalking } from "@fortawesome/free-solid-svg-icons";

import Image from "next/image";
import Link from "next/link";
import React, { SetStateAction, useState } from "react";
import locNames from "@/lib/nodes.json";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import dijkstrasLocs from "@/lib/dijkstras";
import { time, graph } from "@/lib/dijkstras";

const locations = locNames.nodes.map((item) => item.name);

export function getLoc(index: number) {
  const item = locNames.nodes.find((item) => item.index === index);
  return item ? item.name : "";
}

export function printDijk(origin: number, destination: number) {
  {
    console.log(dijkstrasLocs(graph, origin, destination));
  }
}

export default function Home() {
  const [origin, setOrigin] = useState(0);
  const [destination, setDestination] = useState(0);

  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <Link href="/" className="w-auto flex items-center">
        <Image src="/tunulLogo.png" width={200} height={100} alt="tunul logo" />
      </Link>
      <div className="w-1/4 space-y-3">
        <div className="flex flex-col items-left">
          <Label className="mr-4 text-2xl"> Origin: </Label>
          <Select
            value={origin}
            onValueChange={
              setOrigin as (value: SetStateAction<number>) => number
            }
            required={true}
          >
            <SelectTrigger className="w-full" id="origin">
              <SelectValue
                placeholder="Select an Origin"
                className="text-base sm:text-sm"
              />
            </SelectTrigger>
            <SelectContent style={{ background: "#000000" }}>
              {locations.map((org) => (
                <SelectItem
                  key={org}
                  value={org}
                  className="text-base sm:text-sm"
                >
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-left">
          <Label className="mr-4 text-2xl"> Destination: </Label>
          <Select
            value={destination}
            onValueChange={
              setDestination as (value: SetStateAction<number>) => number
            }
            required={true}
          >
            <SelectTrigger className="w-full" id="destination">
              <SelectValue
                placeholder="Select a Destination"
                className="text-base sm:text-sm"
              />
            </SelectTrigger>
            <SelectContent style={{ background: "#000000" }}>
              {locations.map((dest) => (
                <SelectItem
                  key={dest}
                  value={dest}
                  className="text-base sm:text-sm"
                >
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="relative flex mt-3 h-16 text-2xl place-items-center w-56 bg-primary"
        onClick={handleButtonClick}
        style={{
          backgroundColor: "transparent",
          color: "#ffffff",
          border: "2px solid #ffffff",
          borderRadius: "4px",
          padding: "8px 16px",
          cursor: "pointer",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        Get Path
      </Button>
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-neutral-900 p-4 rounded-lg">
            <h2 className="text-2xl text-white text-bold flex items-center justify-center w-full font-extrabold">
              Directions
            </h2>
            <label className="text-white text-lg font-medium flex items-center justify-center w-full">
              {origin} to {destination}{" "}
            </label>

            <div className="align-center flex flex-col items-center justify-center">
              <p className="text-white text-center -mt-3 -mb-7">
                {dijkstrasLocs(graph, origin, destination)
                  .split("\n")
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </p>
              <div className="flex items-center justify-center w-full">
                <div className="flex flex-row items-center">
                  <FontAwesomeIcon icon={faWalking} size="2x" />
                  <p className="ml-2 text-lg text-white">Time: {time}</p>
                </div>
              </div>
            </div>

            <button
              className="mt-4 bg-primary px-4 py-2 rounded color-primary-500 text-lg font-medium flex items-center justify-center w-full"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
