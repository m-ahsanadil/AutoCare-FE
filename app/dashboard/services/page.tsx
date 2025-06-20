"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Wrench, User, Car, Calendar, DollarSign, FileText, ImageIcon } from "lucide-react"

const serviceRecords = [
  {
    id: 1,
    customer: "John Smith",
    vehicle: "2020 Honda Civic",
    service: "Oil Change",
    date: "2024-01-15",
    mechanic: "Mike Johnson",
    laborCost: 45,
    partsCost: 35,
    totalCost: 80,
    status: "completed",
    notes: "Changed oil filter and engine oil. Vehicle running smoothly.",
    parts: ["Oil Filter", "5W-30 Motor Oil"],
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    vehicle: "2019 Toyota Camry",
    service: "Brake Repair",
    date: "2024-01-10",
    mechanic: "Tom Wilson",
    laborCost: 120,
    partsCost: 180,
    totalCost: 300,
    status: "completed",
    notes: "Replaced front brake pads and rotors. Test drive completed successfully.",
    parts: ["Brake Pads", "Brake Rotors"],
  },
  {
    id: 3,
    customer: "Mike Davis",
    vehicle: "2021 Ford F-150",
    service: "Engine Diagnostic",
    date: "2024-01-12",
    mechanic: "Mike Johnson",
    laborCost: 90,
    partsCost: 0,
    totalCost: 90,
    status: "in-progress",
    notes: "Running diagnostic tests. Found issue with oxygen sensor.",
    parts: [],
  },
]

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredRecords = serviceRecords.filter(
    (record) =>
      record.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Service Records</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Service Record
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Service Record</DialogTitle>
              <DialogDescription>Document a completed or ongoing service.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer">Customer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civic">2020 Honda Civic</SelectItem>
                      <SelectItem value="camry">2019 Toyota Camry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="service">Service Type</Label>
                  <Input id="service" placeholder="e.g., Oil Change" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mechanic">Mechanic</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign mechanic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                      <SelectItem value="tom">Tom Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="laborCost">Labor Cost ($)</Label>
                  <Input id="laborCost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partsCost">Parts Cost ($)</Label>
                  <Input id="partsCost" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="parts">Parts Used</Label>
                <Input id="parts" placeholder="e.g., Oil Filter, Brake Pads" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Service Notes</Label>
                <Textarea id="notes" placeholder="Detailed notes about the service performed..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Attach Images</Label>
                <Input id="images" type="file" multiple accept="image/*" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Create Record</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-gray-600">Services This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">$12,450</p>
                <p className="text-sm text-gray-600">Revenue This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search service records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Service Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Service History</CardTitle>
          <CardDescription>Complete record of all services performed</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer & Vehicle</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mechanic</TableHead>
                <TableHead>Costs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{record.customer}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{record.vehicle}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{record.service}</p>
                      {record.parts.length > 0 && (
                        <p className="text-sm text-gray-600">Parts: {record.parts.join(", ")}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.mechanic}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Labor: ${record.laborCost}</p>
                      <p>Parts: ${record.partsCost}</p>
                      <p className="font-medium">Total: ${record.totalCost}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={record.status === "completed" ? "default" : "secondary"}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ImageIcon className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
