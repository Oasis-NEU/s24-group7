"use client";

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

import dijkstras, { graph } from "@/lib/dijkstras";

const locations = locNames.nodes.map((item) => item.name);

export function getLoc(index: number) {
  const item = locNames.nodes.find((item) => item.index === index);
  return item ? item.name : "";
}

export function printDijk(origin: number, destination: number) {
  {
    console.log(dijkstras(graph, origin, destination));
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
        <Image src="/tunulLogo.png" width={120} height={120} alt="tunul logo" />
      </Link>
      <div className="w-1/4 space-y-3">
        <div className="flex items-center justify-left">
          <Label className="mr-4">Origin: </Label>
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
            <SelectContent style={{ background: '#000000' }}>
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

        <div className="flex items-center justify-left">
          <Label className="mr-4">Destination: </Label>
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
            <SelectContent style={{ background: '#000000' }}>
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
      >
        Get Path
      </Button>
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl text-black">Popup Text Box</h2>
            <p className="text-black">
              {dijkstras(graph, origin, destination)}
            </p>
            <button
              className="mt-4 bg-primary text-black px-4 py-2 rounded"
              onClick={() => setShowPopup(false)}
            ></button>
          </div>
        </div>
      )}
    </main>
  );
}
