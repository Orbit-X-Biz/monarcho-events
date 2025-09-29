/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Booking {
  id: string;
  name: string;
  email: string;
  contactNo: string;
  eventType: string;
  dateOfEvent: string;
  scenery: string;
  noOfGuests: number;
  style: string;
  services: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export default function BookingDashboard() {
  const tableHeaders = [
    "Name",
    "Event Type",
    "Contact No",
    "Email",
    "Tentative Date",
    "Date Registered",
    "Location",
    "Status",
    "Actions",
  ];

  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  const auth_user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("auth_user") || "null")
      : null;

  useEffect(() => {
    if (!token) {
      router.replace("/admin/login"); // redirect if not logged in
    }
  }, [token]);

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `/api/admin/viewBookings?page=${currentPage}&limit=${rowsPerPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to fetch bookings");
      }
      const data = await res.json();
      setBookings(data.data.bookings);
      setTotalPages(data.data.pagination.totalPages);
    } catch (err: any) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, rowsPerPage]);

  const filteredBookings = bookings.filter((b) => {
    const search = filterText.toLowerCase();
    return (
      b.name.toLowerCase().includes(search) ||
      b.email.toLowerCase().includes(search) ||
      b.contactNo.toLowerCase().includes(search) ||
      b.eventType.toLowerCase().includes(search)
    );
  });

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);

  return (
    <>
      {/* Blank div for navbar */}
      <div className="h-20 sm:h-24"></div>

      <div className="font-[Poppins] px-10 py-2">
        <div className="flex flex-row justify-between items-center w-full my-5">
          <p className="font-medium text-[#926B48] text-2xl">
            Welcome Back, {auth_user?.name || "Admin"}
          </p>
          <Button
            onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("auth_user");
              router.push("/admin/login");
            }}
            className="bg-red-600 text-white cursor-pointer"
          >
            Logout
          </Button>
        </div>

        {/* Filter */}
        <div className="flex flex-row mt-2">
          <Input
            placeholder="Filter bookings..."
            className="border border-[#926B48] w-1/5 !text-xs text-zinc-600 font-medium"
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="mt-2 rounded-[6px] border-[1px] border-zinc-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 border-b-[1px] border-zinc-200 text-zinc-500 font-normal"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-black font-semibold"
                  >
                    Loading bookings...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-red-500 font-semibold"
                  >
                    {error}
                  </td>
                </tr>
              ) : paginatedBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-4 text-zinc-500 font-semibold"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 text-zinc-950">{row.name}</td>
                    <td className="px-4 py-3 text-zinc-950">{row.eventType}</td>
                    <td className="px-4 py-3 text-zinc-950">{row.contactNo}</td>
                    <td className="px-4 py-3 text-zinc-950">{row.email}</td>
                    <td className="px-4 py-3 text-zinc-950">
                      {new Date(row.dateOfEvent).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-zinc-950">
                      {new Date(row.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-zinc-950">{row.scenery}</td>
                    <td className="px-4 py-3 text-zinc-950 font-medium">
                      {row.status === "TODO" ? (
                        <span className="px-6 py-1 rounded-none text-sm font-medium bg-gray-300 text-black">
                          Todo
                        </span>
                      ) : row.status === "DONE" ? (
                        <span className="px-6 py-1 rounded-none text-sm font-medium bg-[#38A169] text-black">
                          Done
                        </span>
                      ) : row.status === "ONGOING" ? (
                        <span className="px-3 py-1 rounded-none text-sm font-medium bg-[#3182CE] text-black">
                          Ongoing
                        </span>
                      ) : (
                        row.status
                      )}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="bg-white border-0 w-4/5 font-[Poppins]">
                          <AlertDialogTitle className="text-2xl text-[#926B48] font-medium mb-4 text-center">
                            Event Details
                          </AlertDialogTitle>

                          <div className="text-xs space-y-3 font-light">
                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-4">
                              <p>
                                <span className="font-medium">Name:</span> {row.name}
                              </p>
                              <p>
                                <span className="font-medium">Email:</span> {row.email}
                              </p>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-2 gap-2">
                              <p>
                                <span className="font-medium">Contact No:</span> {row.contactNo}
                              </p>
                              <p>
                                <span className="font-medium">Type:</span> {row.eventType}
                              </p>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-2 gap-2">
                              <p>
                                <span className="font-medium">Tentative Date:</span>{" "}
                                {new Date(row.dateOfEvent).toLocaleDateString()}
                              </p>
                              <p>
                                <span className="font-medium">Scenery:</span> {row.scenery}
                              </p>
                            </div>

                            {/* Row 4 */}
                            <div className="grid grid-cols-2 gap-2">
                              <p>
                                <span className="font-medium">No. of Guests:</span> {row.noOfGuests}
                              </p>
                              <p>
                                <span className="font-medium">Style:</span> {row.style}
                              </p>
                            </div>

                            {/* Registered Date */}
                            <div>
                              <p>
                                <span className="font-medium">Date Registered:</span>{" "}
                                {new Date(row.createdAt).toLocaleDateString()}
                              </p>
                            </div>

                            {/* Services */}
                            <div>
                              <p className="font-medium">
                                Selected Services:
                              </p>
                              <div>
                                <ul className="pl-6 text-black">
                                  {row.services.map(
                                    (service: string, index: number) => (
                                      <li key={index}>{service}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>

                            {/* Notes */}
                            <div>
                              <p className="font-medium">Notes:</p>
                              <div className="pl-4 text-black whitespace-pre-wrap">
                                {row.notes || "No notes provided."}
                              </div>
                            </div>

                            {/* Status Dropdown */}
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Status:</p>
                              <select
                                className="border border-zinc-500 text-[#71717A] px-2 py-1 rounded w-1/2"
                                value={row.status}
                                onChange={(e) =>
                                  console.log("New Status:", e.target.value)
                                }
                              >
                                <option value="TODO">Todo</option>
                                <option value="ONGOING">Ongoing</option>
                                <option value="DONE">Done</option>
                              </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center gap-4 pt-4">
                              <Button className="bg-green-600 text-white hover:bg-green-700">
                                Update
                              </Button>
                              <AlertDialogCancel asChild>
                                <Button variant="outline">Cancel</Button>
                              </AlertDialogCancel>
                            </div>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-end my-4 px-2">
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${rowsPerPage}`}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger
                  className="w-20 border-[1px] border-zinc-200 cursor-pointer"
                  id="rows-per-page"
                >
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-white !text-xl" side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem
                      className="!text-xl"
                      key={pageSize}
                      value={`${pageSize}`}
                    >
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <ChevronsLeftIcon />
              </Button>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon />
              </Button>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon />
              </Button>
              <Button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
