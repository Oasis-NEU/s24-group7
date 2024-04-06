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

function getLoc(index: number) {
  const item = locNames.nodes.find((item) => item.index === index);
  return item ? item.name : "";
}

function StyledText({ text }: { text: string }) {
  const parts = text.split(" ^ ");

  // Apply different styling based on whether the index is even or odd
  const styledParts = parts.map((part, index) => {
    if (index % 2 === 0) {
      // Even indices: Apply one style
      return (
        <div key={index} className="w-full text-lg font-semibold">
          {part}
        </div>
      );
    } else {
      // Odd indices: Apply another style
      return (
        <div key={index} className="italic">
          {part}
        </div>
      );
    }
  });

  // Return the styled text
  return <div className="text-white text-center "> {styledParts} </div>;
}

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    if (origin && destination) {
      setShowPopup(true);
    } else {
      // Alert the user or handle the case where both origin and destination are not selected
      alert("Please select both origin and destination.");
    }
  };

  const handleDropdownTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  
  const handleDropdownTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  

  // Function to handle clicking on the dropdown container
  const handleDropdownClick = (event: React.TouchEvent<HTMLDivElement>) => {
    // Prevent click event propagation
    event.stopPropagation();
  };

  return (
    <main className="flex flex-col justify-center items-center">
      <Link href="/" className="w-auto flex items-center">
        <Image src="/tunulLogo.png" width={150} height={50} alt="tunul logo" />
      </Link>
      <div className="max-w-4xl w-96 space-y-3 -mt-8"
      onTouchStart={handleDropdownTouchStart}
      onTouchMove={handleDropdownTouchMove}>
        <div className="flex flex-col items-left">
          <Label className="mr-4 text-2xl"> Origin </Label>
          <Select
            value={origin}
            onValueChange={
              setOrigin as (value: SetStateAction<string>) => string
            }
            required={true}
          >
            <SelectTrigger className="w-full" id="origin">
              <SelectValue
                placeholder="Select an Origin"
                className="text-base"
                onTouchStart = {(event) => event.stopPropagation()}
              />
            </SelectTrigger>
            <SelectContent style={{ background: "#000000" }}>
              {locations.map((org) => (
                <SelectItem key={org} value={org} className="text-base">
                  {org}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col items-left">
          <Label className="mr-4 text-2xl"> Destination </Label>
          <Select
            value={destination}
            onValueChange={
              setDestination as (value: SetStateAction<string>) => string
            }
            required={true}
          >
            <SelectTrigger className="w-full" id="destination">
              <SelectValue
                placeholder="Select a Destination"
                className="text-base sm:text-sm"
                onTouchStart={(event) => event.stopPropagation()}
              />
            </SelectTrigger>
            <SelectContent style={{ background: "#000000" }}>
              {locations.map((dest) => (
                <SelectItem
                  key={dest}
                  value={dest}
                  className="text-base sm:text-sm"
                  onTouchStart={(event) => event.stopPropagation()}
                >
                  {dest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button
        className="relative flex mt-8 h-16 text-2xl place-items-center w-56 bg-primary"
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
        // Disable the button if either origin or destination is empty
        disabled={!origin || !destination}
      >
      Get Path
      </Button>
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-neutral-900 p-4 rounded-lg">
            <h2 className="text-3xl text-white text-bold flex items-center justify-center w-full font-extrabold mb-3">
              Directions
            </h2>
            <label className="text-white text-lg font-semibold flex items-center justify-center w-full">
              {origin}
            </label>

            <div className="align-center flex flex-col items-center justify-center">
              <StyledText text={dijkstrasLocs(graph, origin, destination)} />

              <div className="flex items-center justify-center w-full mt-3">
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