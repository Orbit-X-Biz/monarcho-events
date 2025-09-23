import { STRINGS } from "@/constants/STRINGS";
import { Mail, MapPinned, Phone } from "lucide-react";
import  Image  from "next/image";

//http://localhost:3000/contact-us
export default function ContactUs() {
  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#926B48] text-center my-4 sm:my-8">
          Stay Connected
        </h1>
        <p className="font-[Playfair] font-light italic px-4 text-base text-center">
          Discover our latest events, inspirations, and stories by following us
          across our social platforms , and connect with us to craft your next
          unforgettable celebration.
        </p>
      </div>

      {/* Location details */}
      <div className="px-4 py-8 flex flex-col space-y-4 font-light items-center text-sm">
        <div className="flex flex-row space-x-1">
          <MapPinned />
          <p className=" text-[#926B48]">{STRINGS.address}</p>
        </div>
        <div className="flex flex-row space-x-1">
          <Phone />
          <p className=" text-[#926B48]">
            <a href={`tel:${STRINGS.contactNo}`} className="hover:underline">
              {STRINGS.contactNo}
            </a>
          </p>
        </div>
        <div className="flex flex-row space-x-1">
          <Mail />
          <p className=" text-[#926B48]">
            <a href={`mailto:${STRINGS.email}`} className="hover:underline">
              {STRINGS.email}
            </a>
          </p>
        </div>
      </div>

      {/* Social links */}
      <div className="px-4 py-2 flex flex-col space-y-4 font-light items-center text-sm text-[#926B48]">
        <a href={STRINGS.fbLink} target="_blank" className="flex flex-row space-x-1">
          <Image
            src="/assets/facebook.png"
            alt="Facebook"
            width={25}
            height={25}
          />
          <p>Facebook</p>
        </a>
        <a href={STRINGS.instaLink} target="_blank" className="flex flex-row space-x-1">
          <Image
            src="/assets/instagram.png"
            alt="Instagram"
            width={22}
            height={22}
          />
          <p>Instagram</p>
        </a>
        <a href={STRINGS.tiktokLink} target="_blank" className="flex flex-row space-x-1">
          <Image src="/assets/tiktok.png" alt="TikTok" width={25} height={25} />
          <p>TikTok</p>
        </a>
        <a href={STRINGS.whatsappLink} target="_blank" className="flex flex-row space-x-1">
          <Image
            src="/assets/whatsapp.png"
            alt="Whatsapp"
            width={21}
            height={21}
          />
          <p>+94770028344</p>
        </a>
      </div>
    </>
  );
}
