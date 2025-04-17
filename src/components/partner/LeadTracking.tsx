import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import { Button } from "@/components/ui/button";
import StatusTag from "@/components/common/StatusTag";
import { useAuth } from "../../../supabase/auth";
// import { Database } from "@/types/supabase";

// Define a mock type for leads since we're using mock data
type Lead = {
  id: number;
  store_name: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  city?: string;
  postcode?: string;
  status: string;
  notes?: string;
  partner_id: number;
  updated_at: string;
};
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
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
} from "lucide-react";

// Using the mock Lead type defined above

const LeadTracking = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [partnerId, setPartnerId] = useState<number | null>(null);

  // Set mock partner ID
  useEffect(() => {
    // Use a mock partner ID for now
    setPartnerId(1);
  }, []);

  // Set mock leads data
  useEffect(() => {
    if (!partnerId) return;

    setIsLoading(true);

    // Mock leads data
    const mockLeads = [
      {
        id: 1,
        store_name: "Coffee Shop A",
        contact_name: "John Smith",
        email: "john@example.com",
        phone: "555-123-4567",
        city: "London",
        postcode: "EC1A 1BB",
        status: "pending",
        notes: "Interested in our services",
        partner_id: 1,
        updated_at: new Date().toISOString(),
      },
      {
        id: 2,
        store_name: "Bakery B",
        contact_name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "555-987-6543",
        city: "Manchester",
        postcode: "M1 1AE",
        status: "spoken",
        notes: "Follow up next week",
        partner_id: 1,
        updated_at: new Date().toISOString(),
      },
      {
        id: 3,
        store_name: "Restaurant C",
        contact_name: "Michael Brown",
        email: "michael@example.com",
        phone: "555-456-7890",
        city: "Birmingham",
        postcode: "B1 1AA",
        status: "closed",
        notes: "Deal completed",
        partner_id: 1,
        updated_at: new Date().toISOString(),
      },
      {
        id: 4,
        store_name: "Retail Shop D",
        contact_name: "Emma Wilson",
        email: "emma@example.com",
        phone: "555-789-0123",
        city: "Glasgow",
        postcode: "G1 1AB",
        status: "rejected",
        notes: "Not interested at this time",
        partner_id: 1,
        updated_at: new Date().toISOString(),
      },
    ];

    // Set the mock data
    setTimeout(() => {
      setLeads(mockLeads);
      setFilteredLeads(mockLeads);
      setIsLoading(false);
    }, 1000);
  }, [partnerId]);

  // Filter leads based on search term and status
  useEffect(() => {
    if (!leads) return;

    const filtered = leads.filter((lead) => {
      const matchesSearch =
        searchTerm === "" ||
        lead.store_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.contact_name &&
          lead.contact_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.email &&
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredLeads(filtered);
  }, [searchTerm, statusFilter, leads]);

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/partner/dashboard",
    },
    { icon: <Store size={20} />, label: "Shops", path: "/partner/shops" },
    {
      icon: <FileText size={20} />,
      label: "Leads",
      isActive: true,
      path: "/partner/tracking",
    },
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
        <Sidebar items={navItems} activeItem="Leads" />
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Lead Tracking
            </h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 md:mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search leads..."
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
                  <option value="pending">Pending</option>
                  <option value="spoken">Spoken To</option>
                  <option value="closed">Closed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Store Name</th>
                      <th className="px-6 py-3">Contact</th>
                      <th className="px-6 py-3">Location</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Notes</th>
                      <th className="px-6 py-3">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          Loading leads data...
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No leads found matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {lead.store_name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {lead.contact_name || "N/A"}
                            {lead.email && (
                              <div className="text-xs">{lead.email}</div>
                            )}
                            {lead.phone && (
                              <div className="text-xs">{lead.phone}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {lead.city ? (
                              <>
                                {lead.city}
                                {lead.postcode && (
                                  <span>, {lead.postcode}</span>
                                )}
                              </>
                            ) : (
                              "N/A"
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusTag status={lead.status as any} />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <div className="max-w-xs truncate">
                              {lead.notes || "No notes"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {lead.updated_at
                              ? new Date(lead.updated_at).toLocaleDateString()
                              : "N/A"}
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

export default LeadTracking;
