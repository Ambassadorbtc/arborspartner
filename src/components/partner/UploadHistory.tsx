import React, { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Store,
  FileText,
  Upload,
  DollarSign,
  User,
  Settings,
  Search,
  Filter,
  FileDown,
  Eye,
  Calendar,
  FileText as FileIcon,
} from "lucide-react";

interface UploadRecord {
  id: number;
  filename: string;
  uploadDate: string;
  status: "processing" | "completed" | "failed";
  recordCount: number;
  successCount: number;
  errorCount: number;
  notes: string;
}

const mockUploads: UploadRecord[] = [
  {
    id: 1,
    filename: "leads_june_2023.csv",
    uploadDate: "2023-06-15T14:30:00",
    status: "completed",
    recordCount: 45,
    successCount: 45,
    errorCount: 0,
    notes: "All records processed successfully",
  },
  {
    id: 2,
    filename: "new_shops_batch1.csv",
    uploadDate: "2023-06-10T11:15:00",
    status: "completed",
    recordCount: 32,
    successCount: 30,
    errorCount: 2,
    notes: "2 records had missing contact information",
  },
  {
    id: 3,
    filename: "leads_may_2023.csv",
    uploadDate: "2023-05-28T09:45:00",
    status: "completed",
    recordCount: 38,
    successCount: 38,
    errorCount: 0,
    notes: "All records processed successfully",
  },
  {
    id: 4,
    filename: "potential_clients.csv",
    uploadDate: "2023-05-15T16:20:00",
    status: "failed",
    recordCount: 25,
    successCount: 0,
    errorCount: 25,
    notes: "Invalid file format. Please use the provided template.",
  },
  {
    id: 5,
    filename: "leads_july_2023.csv",
    uploadDate: "2023-07-01T10:00:00",
    status: "processing",
    recordCount: 50,
    successCount: 0,
    errorCount: 0,
    notes: "Processing in progress",
  },
];

const UploadHistory = () => {
  const [uploads, setUploads] = useState<UploadRecord[]>([]);
  const [filteredUploads, setFilteredUploads] = useState<UploadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Load mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setUploads(mockUploads);
      setFilteredUploads(mockUploads);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter uploads based on search term and status
  useEffect(() => {
    if (!uploads.length) return;

    const filtered = uploads.filter((upload) => {
      const matchesSearch =
        searchTerm === "" ||
        upload.filename.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || upload.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredUploads(filtered);
  }, [searchTerm, statusFilter, uploads]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/partner/dashboard",
    },
    { icon: <Store size={20} />, label: "Shops", path: "/partner/shops" },
    { icon: <FileText size={20} />, label: "Leads", path: "/partner/tracking" },
    { icon: <Upload size={20} />, label: "Upload", path: "/partner/upload" },
    {
      icon: <DollarSign size={20} />,
      label: "Commissions",
      path: "/partner/commissions",
    },
    { icon: <User size={20} />, label: "Profile", path: "/partner/profile" },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/partner/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar items={navItems} activeItem="History" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Upload History
            </h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by filename..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            {/* Uploads Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Filename</th>
                      <th className="px-6 py-3">Upload Date</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Records</th>
                      <th className="px-6 py-3">Success/Error</th>
                      <th className="px-6 py-3">Notes</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          Loading upload history...
                        </td>
                      </tr>
                    ) : filteredUploads.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No uploads found matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredUploads.map((upload) => (
                        <tr key={upload.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <FileIcon className="h-4 w-4 text-gray-400 mr-2" />
                              {upload.filename}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              {new Date(upload.uploadDate).toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={`${getStatusBadgeColor(upload.status)} border`}
                            >
                              {upload.status.charAt(0).toUpperCase() +
                                upload.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {upload.recordCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="text-green-600">
                              {upload.successCount}
                            </span>
                            {" / "}
                            <span className="text-red-600">
                              {upload.errorCount}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="max-w-xs truncate">
                              {upload.notes}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                                disabled={upload.status === "processing"}
                              >
                                <FileDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadHistory;
