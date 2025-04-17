import React, { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/utils/commissionUtils";
import {
  LayoutDashboard,
  Store,
  FileText,
  Upload,
  DollarSign,
  User,
  Settings,
  Download,
  Calendar,
  Filter,
  CheckCircle,
} from "lucide-react";

interface Commission {
  id: number;
  date: string;
  amount: number;
  status: "pending" | "paid" | "processing";
  reference: string;
  shop: string;
  salesAmount: number;
}

const mockCommissions: Commission[] = [
  {
    id: 1,
    date: "2023-06-15",
    amount: 450,
    status: "paid",
    reference: "COM-2023-001",
    shop: "Coffee Haven",
    salesAmount: 3000,
  },
  {
    id: 2,
    date: "2023-06-10",
    amount: 375,
    status: "paid",
    reference: "COM-2023-002",
    shop: "Bakery Delight",
    salesAmount: 2500,
  },
  {
    id: 3,
    date: "2023-06-05",
    amount: 525,
    status: "paid",
    reference: "COM-2023-003",
    shop: "Gourmet Burgers",
    salesAmount: 3500,
  },
  {
    id: 4,
    date: "2023-06-01",
    amount: 300,
    status: "paid",
    reference: "COM-2023-004",
    shop: "Fashion Boutique",
    salesAmount: 2000,
  },
  {
    id: 5,
    date: "2023-07-01",
    amount: 600,
    status: "pending",
    reference: "COM-2023-005",
    shop: "Tech Gadgets",
    salesAmount: 4000,
  },
  {
    id: 6,
    date: "2023-07-05",
    amount: 450,
    status: "pending",
    reference: "COM-2023-006",
    shop: "Healthy Eats",
    salesAmount: 3000,
  },
  {
    id: 7,
    date: "2023-07-10",
    amount: 525,
    status: "processing",
    reference: "COM-2023-007",
    shop: "Coffee Haven",
    salesAmount: 3500,
  },
];

const PartnerCommissions = () => {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [filteredCommissions, setFilteredCommissions] = useState<Commission[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<string>("all");
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [pendingCommissions, setPendingCommissions] = useState(0);

  // Load mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCommissions(mockCommissions);
      setFilteredCommissions(mockCommissions);
      setIsLoading(false);

      // Calculate totals
      const total = mockCommissions.reduce(
        (sum, commission) => sum + commission.amount,
        0,
      );
      setTotalCommissions(total);

      const pending = mockCommissions
        .filter((commission) => commission.status === "pending")
        .reduce((sum, commission) => sum + commission.amount, 0);
      setPendingCommissions(pending);
    }, 1000);
  }, []);

  // Filter commissions based on status and date range
  useEffect(() => {
    if (!commissions.length) return;

    let filtered = [...commissions];

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (commission) => commission.status === statusFilter,
      );
    }

    // Apply date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1,
      );
      const startOfYear = new Date(now.getFullYear(), 0, 1);

      filtered = filtered.filter((commission) => {
        const commissionDate = new Date(commission.date);
        switch (dateRange) {
          case "month":
            return commissionDate >= startOfMonth;
          case "last-month":
            return (
              commissionDate >= startOfLastMonth &&
              commissionDate < startOfMonth
            );
          case "year":
            return commissionDate >= startOfYear;
          default:
            return true;
        }
      });
    }

    setFilteredCommissions(filtered);
  }, [statusFilter, dateRange, commissions]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
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
      isActive: true,
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
        <Sidebar items={navItems} activeItem="Commissions" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Commission Payments
              </h1>
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Statement
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Total Commissions (YTD)
                      </p>
                      {isLoading ? (
                        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {formatCurrency(totalCommissions)}
                        </p>
                      )}
                    </div>
                    <div className="rounded-full p-2 bg-blue-50">
                      <DollarSign className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Pending Commissions
                      </p>
                      {isLoading ? (
                        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          {formatCurrency(pendingCommissions)}
                        </p>
                      )}
                    </div>
                    <div className="rounded-full p-2 bg-yellow-50">
                      <Calendar className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-sm border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Commission Rate
                      </p>
                      {isLoading ? (
                        <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
                      ) : (
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                          15%
                        </p>
                      )}
                    </div>
                    <div className="rounded-full p-2 bg-green-50">
                      <DollarSign className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Status:
                </span>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Period:
                </span>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {/* Commissions Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Reference</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Shop</th>
                      <th className="px-6 py-3">Sales Amount</th>
                      <th className="px-6 py-3">Commission</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          Loading commission data...
                        </td>
                      </tr>
                    ) : filteredCommissions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No commissions found matching the selected filters.
                        </td>
                      </tr>
                    ) : (
                      filteredCommissions.map((commission) => (
                        <tr key={commission.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {commission.reference}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(commission.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {commission.shop}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatCurrency(commission.salesAmount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {formatCurrency(commission.amount)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={`${getStatusBadgeColor(commission.status)} border`}
                            >
                              {commission.status.charAt(0).toUpperCase() +
                                commission.status.slice(1)}
                            </Badge>
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

export default PartnerCommissions;
