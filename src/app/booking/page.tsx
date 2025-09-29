/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "sonner";

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

  const servicesList = [
    "Catering",
    "Entertainment",
    "Decor & Styling",
    "Venue Booking",
    "Photography",
    "Transportation",
    "Videography",
    "Other",
  ];

  // Form state
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [eventType, setEventType] = useState("");
  const [dateOfEvent, setDateOfEvent] = useState<Date | undefined>(undefined);
  const [scenery, setScenery] = useState("");
  const [noOfGuests, setNoOfGuests] = useState("");
  const [style, setStyle] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle service checkbox change
  const handleServiceChange = (service: string, checked: boolean) => {
    if (service === "Other") {
      setShowOther(checked);
      if (!checked) {
        setOtherService("");
      }
    }

    if (checked) {
      setSelectedServices([...selectedServices, service]);
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    }
  };

  // Validation function
  const validateForm = (): string | null => {
    if (!fullName.trim()) {
      return "Please enter your full name";
    }

    if (!email.trim()) {
      return "Please enter your email address";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }

    if (!contactNo.trim()) {
      return "Please enter your contact number";
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!phoneRegex.test(contactNo.trim())) {
      return "Please enter a valid contact number (at least 8 digits)";
    }

    if (!eventType) {
      return "Please select an event type";
    }

    if (!scenery) {
      return "Please select your preferred scenery";
    }

    return null;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      toast.error("Validation Error", {
        description: validationError,
      });
      return;
    }

    // Prepare services array
    let finalServices = [...selectedServices];
    if (showOther && otherService.trim()) {
      finalServices = finalServices.filter((s) => s !== "Other");
      finalServices.push(otherService.trim());
    } else {
      finalServices = finalServices.filter((s) => s !== "Other");
    }

    // Prepare booking data
    const bookingData = {
      name: title ? `${title} ${fullName.trim()}` : fullName.trim(),
      email: email.trim(),
      contactNo: contactNo.trim(),
      eventType: eventType,
      dateOfEvent: dateOfEvent?.toISOString() || null,
      scenery: scenery,
      noOfGuests: noOfGuests || null,
      style: style || null,
      services: finalServices.length > 0 ? finalServices : null,
      notes: notes.trim() || null,
    };

    setLoading(true);

    try {
      const response = await fetch("/api/bookings/addBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create booking");
      }

      // Success
      toast.success("Booking Submitted Successfully! 🎉", {
        description:
          "Thank you for choosing Monarcho Events. We'll contact you soon to discuss the details.",
        duration: 5000,
      });

      // Reset form
      setTitle("");
      setFullName("");
      setEmail("");
      setContactNo("");
      setEventType("");
      setDateOfEvent(undefined);
      setScenery("");
      setNoOfGuests("");
      setStyle("");
      setSelectedServices([]);
      setOtherService("");
      setShowOther(false);
      setNotes("");
    } catch (error: any) {
      console.error("Booking submission error:", error);

      // Show specific error messages
      if (error.message.includes("Invalid email")) {
        toast.error("Invalid Email", {
          description: "Please enter a valid email address.",
        });
      } else if (error.message.includes("Invalid contact")) {
        toast.error("Invalid Contact Number", {
          description: "Please enter a valid contact number.",
        });
      } else if (error.message.includes("already exists")) {
        toast.error("Duplicate Booking", {
          description:
            "A booking with this information already exists. Please contact us if you need to make changes.",
        });
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        toast.error("Connection Error", {
          description:
            "Unable to connect to the server. Please check your internet connection and try again.",
        });
      } else {
        toast.error("Booking Failed", {
          description:
            error.message ||
            "An unexpected error occurred. Please try again or contact us directly.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
      <div className="lg:flex lg:max-w-7xl lg:mx-auto lg:gap-8 lg:px-8 py-3">
        {/* Booking Form */}
        <div className="px-5 lg:px-0 mt-4 flex flex-col space-y-3 lg:flex-1">
          {/* Name Field */}
          <div className="flex flex-row">
            {/* Designation Dropdown */}
            <div className="w-1/4">
              <Select value={title} onValueChange={setTitle}>
                <SelectTrigger className="w-11/12 border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm">
                  <SelectValue className="" placeholder="Title" />
                </SelectTrigger>
                <SelectContent className="border-[#926B48] !text-[#71717A] bg-white">
                  {titles.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
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
                className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Email and Contact No Row */}
          <div className="flex flex-col lg:flex-row lg:gap-4 space-y-3 lg:space-y-0">
            {/* Email */}
            <div className="lg:flex-1">
              <Input
                type="email"
                placeholder="Email *"
                className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            {/* Contact No */}
            <div className="lg:flex-1">
              <Input
                type="tel"
                placeholder="Contact No *"
                className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Event Type and Date Row */}
          <div className="flex flex-col lg:flex-row lg:gap-4 space-y-3 lg:space-y-0">
            {/* Event Type */}
            <div className="lg:flex-1">
              <Select
                value={eventType}
                onValueChange={setEventType}
                disabled={loading}
              >
                <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm">
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
            <div className="lg:flex-1">
              <Calendar28 date={dateOfEvent} setDate={setDateOfEvent} />
            </div>
          </div>

          {/* Preferred Scenery and Guest Count Row */}
          <div className="flex flex-col lg:flex-row lg:gap-4 space-y-3 lg:space-y-0">
            {/* Preferred Scenery */}
            <div className="lg:flex-1">
              <Select
                value={scenery}
                onValueChange={setScenery}
                disabled={loading}
              >
                <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm">
                  <SelectValue placeholder="Preferred Scenery *" />
                </SelectTrigger>
                <SelectContent className="border-[#926B48] !text-[#71717A] bg-white text-[10px] sm:text-sm">
                  {venueTypes.map((venue) => (
                    <SelectItem key={venue} value={venue}>
                      {venue}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Guest count */}
            <div className="lg:flex-1">
              <Select
                value={noOfGuests}
                onValueChange={setNoOfGuests}
                disabled={loading}
              >
                <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm">
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
          </div>

          {/* Preferred Style */}
          <div>
            <Select value={style} onValueChange={setStyle} disabled={loading}>
              <SelectTrigger className="w-full border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm">
                <SelectValue placeholder="Preferred Style" />
              </SelectTrigger>
              <SelectContent className="border-[#926B48] !text-[#71717A] bg-white">
                {themes.map((theme) => (
                  <SelectItem key={theme} value={theme}>
                    {theme}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Services */}
          <div>
            <p className="font-light text-xs sm:text-sm mb-2">
              Additional Services
            </p>
            <div className="grid grid-cols-2 gap-2 pl-2 sm:pl-5">
              {servicesList.map((service) => (
                <div key={service} className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={selectedServices.includes(service)}
                      onCheckedChange={(checked) =>
                        handleServiceChange(service, !!checked)
                      }
                      disabled={loading}
                    />
                    <Label
                      htmlFor={service}
                      className="text-xs sm:text-sm font-light"
                    >
                      {service}
                    </Label>
                  </div>
                  {service === "Other" && showOther && (
                    <input
                      type="text"
                      placeholder="Please specify"
                      className="mt-1 w-full rounded-md border border-[#926B48] px-2 py-1 text-[10px] sm:text-sm !text-[#71717A] focus:outline-none"
                      value={otherService}
                      onChange={(e) => setOtherService(e.target.value)}
                      disabled={loading}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="h-28">
            <Textarea
              className="border-[#926B48] !text-[#71717A] text-[10px] sm:text-sm h-full"
              placeholder="Additional Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Book now */}
          <div className="flex lg:justify-end sm:mt-2">
            <Button
              variant="outline"
              className="w-full cursor-pointer lg:w-auto lg:px-8 border-[#926B48] font-semibold text-[#926B48] text-xs sm:text-sm hover:bg-[#926B48] hover:text-white transition-colors"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Book Now"
              )}
            </Button>
          </div>
        </div>

        {/* Image Banner - Only visible on desktop */}
        <div className="hidden lg:block lg:flex-1 py-4">
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