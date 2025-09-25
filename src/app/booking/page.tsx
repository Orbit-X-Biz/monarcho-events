/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar28 } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypes } from "@/constants/const";
import { useState } from "react";

//http://localhost:3000/booking
export default function BookingPage() {
  const titles = ["Mr", "Miss", "Mrs", "Ms", "Dr", "Prof", "Rev"];
  const venueTypes = [
    "Beachfront",
    "Hilltop/Mountain",
    "Riverside",
    "Garden",
    "Historical & Cultural sites",
    "Yacht",
    "Banquet",
    "Poolside",
    "Resort/Hotels/Boutiques",
    "Skyline Rooftops",
    "Waterfalls",
  ];
  const guestRanges = [
    "0 – 25 guests",
    "25 – 50 guests",
    "50 – 100 guests",
    "100 – 250 guests",
    "250 – 500 guests",
    "500 – 1000 guests",
    "1000+ guests",
  ];
  const themes = ["Boho", "Exotic", "Traditional", "Luxury", "Indian"];

  const services = [
    "Catering",
    "Entertainment",
    "Decor & Styling",
    "Venue Booking",
    "Photography",
    "Transportation",
    "Videography",
    "Other",
  ];
  const [showOther, setShowOther] = useState(false);
  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-[#926B48] text-center my-3 px-4 sm:mt-8 sm:mb-1">
          Every Great Celebration Begins Here
        </h1>
        <p className="font-[Playfair] font-light italic px-4 text-lg text-center">
          Tell us about your special day and we'll take care of the details,
          making your event as unique as your story.
        </p>
      </div>

      {/* Main Content Container */}
      <div className="lg:flex lg:max-w-7xl lg:mx-auto lg:gap-8 lg:px-8 sm:py-4">
        {/* Booking Form */}
        <div className="px-5 lg:px-0 mt-4 flex flex-col space-y-3 mb-5 lg:flex-1">
          {/* Name Field */}
          <div className="flex flex-row">
            {/* Designation Dropdown */}
            <div className="w-1/4">
              <Select>
                <SelectTrigger className="w-11/12 border-[#926B48] !text-[#71717A] text-[10px]">
                  <SelectValue className="" placeholder="Title" />
                </SelectTrigger>
                <SelectContent className="border-[#926B48] !text-[#71717A] bg-white">
                  {titles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Input field */}
            <div className="w-9/12">
              <Input
                type="text"
                placeholder="Full Name *"
                className="w-full border-[#926B48] !text-[#71717A] text-[10px]"
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <Input
              type="email"
              placeholder="Email *"
              className="w-full border-[#926B48] !text-[#71717A] text-[10px]"
            />
          </div>
          {/* Contact No */}
          <div>
            <Input
              type="number"
              placeholder="Contact No *"
              className="w-full border-[#926B48] !text-[#71717A] text-[10px]"
            />
          </div>
          {/* Event Type */}
          <div>
            <Select>
              <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px]">
                <SelectValue placeholder="Event Type *" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#926B48]">
                {eventTypes.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel className="!text-[#71717A]">
                      {group.label}
                    </SelectLabel>
                    {group.options.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Date Picker */}
          <div>
            <Calendar28 />
          </div>
          {/* Preferred Scenery */}
          <div>
            <Select>
              <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px]">
                <SelectValue placeholder="Preferred Scenery *" />
              </SelectTrigger>
              <SelectContent className="border-[#926B48] !text-[#71717A] bg-white text-[10px]">
                {venueTypes.map((venue) => (
                  <SelectItem key={venue} value={venue}>
                    {venue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Guest count */}
          <div>
            <Select>
              <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px]">
                <SelectValue placeholder="No of Guests" />
              </SelectTrigger>
              <SelectContent className="border-[#926B48] !text-[#71717A] bg-white">
                {guestRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Preferred Style */}
          <div>
            <Select>
              <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px]">
                <SelectValue placeholder="Preferred Style" />
              </SelectTrigger>
              <SelectContent className="border-[#926B48] !text-[#71717A] bg-white">
                {themes.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Additional Services */}
          <div>
            <p className="font-light text-xs mb-2">Additional Services</p>
            <div className="grid grid-cols-2 gap-2 pl-2">
              {services.map((service) => (
                <div key={service} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      onCheckedChange={(checked) => {
                        if (service === "Other") {
                          setShowOther(!!checked);
                        }
                      }}
                    />
                    <Label htmlFor={service} className="text-xs font-light">
                      {service}
                    </Label>
                  </div>
                  {service === "Other" && showOther && (
                    <input
                      type="text"
                      placeholder="Please specify"
                      className="mt-1 w-full rounded-md border border-[#926B48] px-2 py-1 text-[10px] !text-[#71717A] focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Additional Notes */}
          <div className="h-28">
            <Textarea
              className="border-[#926B48] !text-[#71717A] text-[10px] h-full"
              placeholder="Additional Notes"
            />
          </div>
          {/* Book now */}
          <div>
            <Button
              variant="outline"
              className="w-full border-[#926B48] font-semibold text-[#926B48] text-xs"
            >
              Book Now
            </Button>
          </div>
        </div>

        {/* Image Banner - Only visible on desktop */}
        <div className="hidden lg:block lg:flex-1 py-3">
          <img
            src="/assets/booking-bg.png"
            alt="Event booking background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}