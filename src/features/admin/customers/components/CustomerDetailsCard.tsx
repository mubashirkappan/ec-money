"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customers } from "@/dummy_db/customers.mock";
import { walletCredits } from "@/dummy_db/walletcredits.mock";
import Image from "next/image";
import defaultProfileImage from "@/assets/images/defaultProfileImage.jpg"

import { SquareArrowOutUpRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { cn } from "@/lib/utils";

interface CustomerDetailsCardProps {
  customerCode: string;
}

export default function CustomerDetailsCard({
  customerCode,
}: CustomerDetailsCardProps) {
  const customer = customers.find(
    (customer) => customer.customerId === customerCode
  );

  if (!customer) {
    return (
      <Card className="w-full h-full">
        <CardContent>
          <p>Customer not found</p>
        </CardContent>
      </Card>
    );
  }

  const customerWalletCredits = walletCredits.filter(
    (walletCredit) => walletCredit.customer.id === customer.id
  );

  return (
    <Card className="w-full h-full">
      <CardContent>
        <div className="divide-y-2">
          <div className="flex justify-between pb-1">
            <p className="text-2xl font-bold">{customer.customerId}</p>
            <div className="space-x-1">
              <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
              <Button>update</Button>
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
              <p className="text-4xl font-bold">{customer.customerName}</p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-400">Add Credit</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 text-lg gap-4 py-2 px-2">
            {/* Informations */}
            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-slate-500 bg-slate-300 px-1">
                  Contact Information
                </p>

                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-50 px-1 text-slate-600">Email</td>
                      <td>{customer.email}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Main Contact</td>
                      <td>{customer.contact1}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Alternate Contact</td>
                      <td>{customer.contact2}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-lg font-medium text-slate-500 bg-slate-300 px-1">
                  Personal Information
                </p>

                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-50 px-1 text-slate-600">Date of Birth</td>
                      <td>{customer.dateOfBirth}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Address</td>
                      <td>{customer.personalAddress}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-lg font-medium text-slate-500 bg-slate-300 px-1">
                  Organization Information
                </p>

                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-50 px-1 text-slate-600">Organization</td>
                      <td>{customer.orgName}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Address</td>
                      <td>{customer.orgAddress}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-lg font-medium text-slate-500 bg-slate-300 px-1">
                  Verification/Proof
                </p>

                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-50 px-1 text-slate-600">Proof Type</td>
                      <td>{customer.proofType}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Proof ID</td>
                      <td>{customer.proofID}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Attachment</td>
                      <td>
                        <Button variant="link" className="p-0 text-blue-500">
                          View Attachment
                          <SquareArrowOutUpRight />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <p className="text-lg font-medium text-slate-500 bg-slate-300 px-1">
                  Account Information
                </p>

                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-50 px-1 text-slate-600">Added At</td>
                      <td>{customer.addedAt}</td>
                    </tr>

                    <tr>
                      <td className="w-50 px-1 text-slate-600">Status</td>
                      <td>
                        {customer.isActive ? (
                          <p className="inline-block rounded-full bg-green-100 px-1 py-1 text-green-600">
                            Active
                          </p>
                        ) : (
                          <p className="inline-block rounded-full bg-red-100 px-1 py-1 text-red-600">
                            In Active
                          </p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Recent Transactions */}
            <div>
              <Table>
                <TableHeader>
                  <TableHead>Amount</TableHead>
                  <TableHead>Added At</TableHead>
                  <TableHead>Status</TableHead>
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
                    customerWalletCredits.map((walletCredit) => (
                      <TableRow key={walletCredit.id}>
                        <TableCell className="font-semibold">{walletCredit.amount}</TableCell>
                        <TableCell className="grid">
                          <span className="text-sm font-medium">{walletCredit.date}</span>
                          <span className="text-xs text-slate-500">{walletCredit.time}</span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                              walletCredit.status === "Pending"
                                ? "bg-yellow-50 text-yellow-700"
                                : walletCredit.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            )}
                          >
                            {walletCredit.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
      {/* <CardContent>
        <p>{customer.customerName}</p>
        <p>{customer.customerId}</p>
        <p>{customer.orgName}</p>
        <p>{customer.email}</p>
        <p>{customer.contact1}</p>

        <div className="mt-4">
          <h2 className="font-semibold">Wallet Credits</h2>

          {customerWalletCredits.map((walletCredit) => (
            <div key={walletCredit.id} className="mt-2">
              <p>Amount: {walletCredit.amount}</p>
              <p>Date: {walletCredit.date}</p>
              <p>Time: {walletCredit.time}</p>
              <p>Status: {walletCredit.status}</p>
            </div>
          ))}
        </div>
      </CardContent> */}
    </Card>
  );
}