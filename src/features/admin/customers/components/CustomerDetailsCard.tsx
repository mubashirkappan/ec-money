"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customers } from "@/dummy_db/customers.mock";
import { walletCredits } from "@/dummy_db/walletcredits.mock";
import Image from "next/image";
import defaultProfileImage from "@/assets/images/defaultProfileImage.jpg";

import { SquareArrowOutUpRight, Trash2, SquarePen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

interface CustomerDetailsCardProps {
  customerCode: string;
}

export default function CustomerDetailsCard({
  customerCode,
}: CustomerDetailsCardProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const maxVisiblePages = 4;

  const customer = customers.find(
    (customer) => customer.customerId === customerCode
  );

  if (!customer) {
    return (
      <Card className="h-full w-full">
        <CardContent>
          <p>Customer not found</p>
        </CardContent>
      </Card>
    );
  }

  /*
   * Get wallet credits belonging only to this customer.
   */
  const customerWalletCredits = walletCredits.filter(
    (walletCredit) => walletCredit.customer.id === customer.id
  );

  /*
   * Total number of pages.
   */
  const totalPages = Math.ceil(
    customerWalletCredits.length / itemsPerPage
  );

  /*
   * Make sure the page used for slicing is always valid.
   *
   * If there are no records, use page 1.
   * Otherwise, don't allow currentPage to be greater than totalPages.
   */
  const activePage =
    totalPages === 0
      ? 1
      : Math.min(currentPage, totalPages);

  /*
   * Calculate exactly which records belong to the current page.
   *
   * Page 1 -> index 0 to 4
   * Page 2 -> index 5 to 9
   * Page 3 -> index 10 to 14
   */
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedWalletCredits = customerWalletCredits.slice(
    startIndex,
    endIndex
  );

  /*
   * Maximum 4 page numbers are displayed.
   *
   * Example:
   *
   * 1 2 3 4
   * 5 6 7 8
   * 9 10 11 12
   */
  const startPage =
    Math.floor((activePage - 1) / maxVisiblePages) *
      maxVisiblePages +
    1;

  const endPage = Math.min(
    startPage + maxVisiblePages - 1,
    totalPages
  );

  const visiblePages =
    totalPages > 0
      ? Array.from(
          { length: endPage - startPage + 1 },
          (_, index) => startPage + index
        )
      : [];

  /*
   * Change page.
   */
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  /*
   * Previous page.
   */
  const handlePrevious = () => {
    if (activePage > 1) {
      setCurrentPage(activePage - 1);
    }
  };

  /*
   * Next page.
   */
  const handleNext = () => {
    if (activePage < totalPages) {
      setCurrentPage(activePage + 1);
    }
  };

  return (
    <Card className="h-full w-full">
      <CardContent>
        <div className="divide-y-2">
          <div className="flex justify-between pb-1">
            <p className="text-2xl font-bold">
              {customer.customerId}
            </p>

            <div className="space-x-1">
              <Button className="bg-red-500 hover:bg-red-400">
                <Trash2/>Delete
              </Button>

              <Button><SquarePen/>Edit</Button>
            </div>
          </div>

          <div className="flex items-end gap-4 py-2">
            <div className="relative size-40">
              <Image
                src={customer.profileImg || defaultProfileImage}
                alt="Profile Image"
                fill
                className="rounded-3xl object-cover"
              />
            </div>

            <div className="flex items-end gap-4">
              <p className="text-4xl font-bold">
                {customer.customerName}
              </p>

              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-400"
              >
                Add Credit
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2">
            {/* Informations */}
            <Card className="h-fit">
              <CardContent>
                <div className="space-y-4">
                  {/* Contact Information */}
                  <div>
                    <p className="bg-slate-300 px-1 text-lg font-medium text-slate-500">
                      Contact Information
                    </p>

                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Email
                          </td>
                          <td>{customer.email}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Main Contact
                          </td>
                          <td>{customer.contact1}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Alternate Contact
                          </td>
                          <td>{customer.contact2}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Personal Information */}
                  <div>
                    <p className="bg-slate-300 px-1 text-lg font-medium text-slate-500">
                      Personal Information
                    </p>

                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Date of Birth
                          </td>
                          <td>{customer.dateOfBirth}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Address
                          </td>
                          <td>{customer.personalAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Organization Information */}
                  <div>
                    <p className="bg-slate-300 px-1 text-lg font-medium text-slate-500">
                      Organization Information
                    </p>

                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Organization
                          </td>
                          <td>{customer.orgName}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Address
                          </td>
                          <td>{customer.orgAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Verification/Proof */}
                  <div>
                    <p className="bg-slate-300 px-1 text-lg font-medium text-slate-500">
                      Verification/Proof
                    </p>

                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Proof Type
                          </td>
                          <td>{customer.proofType}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Proof ID
                          </td>
                          <td>{customer.proofID}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Attachment
                          </td>

                          <td>
                            <Button
                              variant="link"
                              className="p-0 text-blue-500"
                            >
                              View Attachment
                              <SquareArrowOutUpRight />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Account Information */}
                  <div>
                    <p className="bg-slate-300 px-1 text-lg font-medium text-slate-500">
                      Account Information
                    </p>

                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Added At
                          </td>
                          <td>{customer.addedAt}</td>
                        </tr>

                        <tr>
                          <td className="w-50 px-1 text-slate-600">
                            Status
                          </td>

                          <td>
                            <span
                              className={cn(
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                customer.isActive
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              )}
                            >
                              {customer.isActive
                                ? "Active"
                                : "In Active"}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardContent>
                <div>
                  <Table>
                    <TableHeader className="bg-indigo-300">
                      <TableRow>
                        <TableHead>Amount</TableHead>
                        <TableHead>Added At</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {customerWalletCredits.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="py-12 text-center text-sm text-muted-foreground"
                          >
                            No wallet credits found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        paginatedWalletCredits.map(
                          (walletCredit) => (
                            <TableRow key={walletCredit.id}>
                              <TableCell className="font-semibold">
                                {walletCredit.amount}
                              </TableCell>

                              <TableCell>
                                <div className="grid">
                                  <span className="text-sm font-medium">
                                    {walletCredit.date}
                                  </span>

                                  <span className="text-xs text-slate-500">
                                    {walletCredit.time}
                                  </span>
                                </div>
                              </TableCell>

                              <TableCell>
                                <span
                                  className={cn(
                                    "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                    walletCredit.status ===
                                      "Pending"
                                      ? "bg-yellow-50 text-yellow-700"
                                      : walletCredit.status ===
                                        "Completed"
                                      ? "bg-emerald-50 text-emerald-700"
                                      : "bg-slate-100 text-slate-500"
                                  )}
                                >
                                  {walletCredit.status}
                                </span>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6">
                    <Pagination>
                      <PaginationContent>
                        {/* Previous */}
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(event) => {
                              event.preventDefault();
                              handlePrevious();
                            }}
                            className={cn(
                              activePage === 1 &&
                                "pointer-events-none opacity-50"
                            )}
                          />
                        </PaginationItem>

                        {/* Page Numbers */}
                        {visiblePages.map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={activePage === page}
                              onClick={(event) => {
                                event.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {/* Next */}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(event) => {
                              event.preventDefault();
                              handleNext();
                            }}
                            className={cn(
                              activePage === totalPages &&
                                "pointer-events-none opacity-50"
                            )}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}