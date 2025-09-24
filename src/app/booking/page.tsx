import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//http://localhost:3000/booking
export default function BookingPage() {
  const titles = ["Mr", "Miss", "Mrs", "Ms", "Dr", "Prof", "Rev"];

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
          Tell us about your special day and we’ll take care of the details,
          making your event as unique as your story.
        </p>
      </div>

      {/* Booking Form */}
      <div className="px-5 mt-4 flex flex-col">
        {/* Name Field */}
        <div className="flex flex-row">
          {/* Designation Dropdown */}
          <div className="w-1/4">
            <Select>
              <SelectTrigger className="w-11/12 border-[#926B48] !text-[#71717A] text-[10px]">
                <SelectValue className="" placeholder="Title" />
              </SelectTrigger>
              <SelectContent className="border-[#926B48] !text-[#71717A]">
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
              placeholder="Full Name"
              className="w-full border-[#926B48] !text-[#71717A] text-[10px]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
