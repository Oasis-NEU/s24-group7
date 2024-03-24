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

import dijkstras from "@/lib/dijkstras";

const locations = locNames.nodes.map((item) => item.name);

export function getLoc(index: number) {
  const item = locNames.nodes.find((item) => item.index === index);
  return item ? item.name : "";
}

export function printDijk(origin: number, destination: number) {
  <div className="text-xl white-400">"{dijkstras(origin, destination)}</div>;
}

export default function Home() {
  const [origin, setOrigin] = useState(0);
  const [destination, setDestination] = useState(0);

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
            onValueChange={setOrigin as (value: SetStateAction<number>) => void}
            required={true}
          >
            <SelectTrigger className="w-full" id="origin">
              <SelectValue
                placeholder="Select an Origin"
                className="text-base sm:text-sm"
              />
            </SelectTrigger>
            <SelectContent>
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
              setDestination as (value: SetStateAction<number>) => void
            }
            required={true}
          >
            <SelectTrigger className="w-full" id="destination">
              <SelectValue
                placeholder="Select a Destination"
                className="text-base sm:text-sm"
              />
            </SelectTrigger>
            <SelectContent>
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
        onClick={() => printDijk(origin, destination)}
      >
        Get Path
      </Button>
    </main>
  );
}
