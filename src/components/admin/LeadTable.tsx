import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import StatusTag from "@/components/common/StatusTag";
import { Database } from "@/types/supabase";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

interface LeadTableProps {
  leads: Lead[];
  isLoading: boolean;
  onStatusUpdate: (leadId: number, newStatus: string) => void;
}

const LeadTable = ({ leads, isLoading, onStatusUpdate }: LeadTableProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [partnerFilter, setPartnerFilter] = useState<number | null>(null);

  // Get unique partner IDs for filtering
  const uniquePartnerIds = Array.from(
    new Set(leads.map((lead) => lead.partner_id)),
  ).filter((id): id is number => id !== null);

  // Filter leads based on selected filters
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;
    const matchesPartner =
      partnerFilter === null || lead.partner_id === partnerFilter;
    return matchesStatus && matchesPartner;
  });

  // Handle status change
  const handleStatusChange = (leadId: number, newStatus: string) => {
    onStatusUpdate(leadId, newStatus);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Leads Management
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View and manage leads from all partners
        </p>
      </div>

      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Partner
          </label>
          <select
            className="rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={partnerFilter || ""}
            onChange={(e) =>
              setPartnerFilter(e.target.value ? parseInt(e.target.value) : null)
            }
          >
            <option value="">All Partners</option>
            {uniquePartnerIds.map((id) => (
              <option key={id} value={id}>
                Partner ID: {id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Store Name</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Partner ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Loading leads data...
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.contact_name || "N/A"}
                    {lead.email && <div>{lead.email}</div>}
                    {lead.phone && <div>{lead.phone}</div>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.partner_id || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <StatusTag status={lead.status as any} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      className="rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mr-2"
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="spoken">Spoken To</option>
                      <option value="closed">Closed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
