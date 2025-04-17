import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import { formatCurrency } from "@/utils/commissionUtils";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useAuth } from "../../../supabase/auth";

// Mock data for initial display
const mockMetrics = {
  totalSales: 45000,
  totalCommissions: 6750,
  activeLeads: 18,
  pendingLeads: 12,
  closedLeads: 32,
};

// Mock data for charts
const mockMonthlySales = [
  { month: "Jan", sales: 5000, commissions: 750 },
  { month: "Feb", sales: 6500, commissions: 975 },
  { month: "Mar", sales: 8000, commissions: 1200 },
  { month: "Apr", sales: 7500, commissions: 1125 },
  { month: "May", sales: 9000, commissions: 1350 },
  { month: "Jun", sales: 9000, commissions: 1350 },
];

const mockLeadStatus = [
  { name: "Pending", value: 12, color: "#FFBB28" },
  { name: "Spoken To", value: 8, color: "#0088FE" },
  { name: "Closed", value: 32, color: "#00C49F" },
  { name: "Rejected", value: 6, color: "#FF8042" },
];

const mockSalesGrowth = [
  { month: "Jan", sales: 5000 },
  { month: "Feb", sales: 6500 },
  { month: "Mar", sales: 8000 },
  { month: "Apr", sales: 7500 },
  { month: "May", sales: 9000 },
  { month: "Jun", sales: 9000 },
];

const PartnerDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(mockMetrics);
  const [monthlySales, setMonthlySales] = useState(mockMonthlySales);
  const [leadStatus, setLeadStatus] = useState(mockLeadStatus);
  const [salesGrowth, setSalesGrowth] = useState(mockSalesGrowth);
  const [dateRange, setDateRange] = useState("month"); // "week", "month", "year"
  const [partnerData, setPartnerData] = useState(null);

  // Function to fetch mock data
  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      // Simulate a delay and use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update with mock data
      setMetrics(mockMetrics);
      setMonthlySales(monthlySales);
      setLeadStatus(leadStatus);
      setSalesGrowth(salesGrowth);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial load
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch data when date range changes
  useEffect(() => {
    fetchDashboardData();
  }, [dateRange]);

  const handleRefresh = () => {
    fetchDashboardData();
  };

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      isActive: true,
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
        <Sidebar items={navItems} activeItem="Dashboard" />
        <main className="flex-1 overflow-auto pb-20 md:pb-6">
          <div className="container mx-auto px-4 md:px-6 pt-4 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Partner Dashboard
            </h1>
            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
              <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-white flex-1 sm:flex-initial">
                <Button
                  variant="ghost"
                  className={`px-4 py-2 ${dateRange === "week" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-700"}`}
                  onClick={() => setDateRange("week")}
                >
                  Week
                </Button>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 ${dateRange === "month" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-700"}`}
                  onClick={() => setDateRange("month")}
                >
                  Month
                </Button>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 ${dateRange === "year" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-700"}`}
                  onClick={() => setDateRange("year")}
                >
                  Year
                </Button>
              </div>
              <Button
                onClick={handleRefresh}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "container mx-auto p-4 md:p-6 space-y-6 md:space-y-8",
              "transition-all duration-300 ease-in-out",
            )}
          >
            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard
                title="Total Sales"
                value={formatCurrency(metrics.totalSales)}
                isLoading={loading}
                icon={<PoundSterling className="h-5 w-5 text-blue-500" />}
              />
              <MetricCard
                title="Total Commissions"
                value={formatCurrency(metrics.totalCommissions)}
                isLoading={loading}
                icon={<Percent className="h-5 w-5 text-green-500" />}
              />
              <MetricCard
                title="Active Leads"
                value={metrics.activeLeads.toString()}
                isLoading={loading}
                icon={<Users className="h-5 w-5 text-purple-500" />}
              />
              <MetricCard
                title="Pending Leads"
                value={metrics.pendingLeads.toString()}
                isLoading={loading}
                icon={<Clock className="h-5 w-5 text-yellow-500" />}
              />
              <MetricCard
                title="Closed Leads"
                value={metrics.closedLeads.toString()}
                isLoading={loading}
                icon={<CheckCircle className="h-5 w-5 text-green-500" />}
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Sales & Commissions Chart */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Monthly Sales & Commissions
                  </h2>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="h-64 w-full bg-gray-100 animate-pulse rounded"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart
                        data={monthlySales}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value) => formatCurrency(value as number)}
                        />
                        <Legend />
                        <Bar
                          dataKey="sales"
                          fill="#4F46E5"
                          name="Sales"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="commissions"
                          fill="#10B981"
                          name="Commissions"
                          radius={[4, 4, 0, 0]}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Lead Status Distribution */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Lead Status Distribution
                  </h2>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="h-64 w-full bg-gray-100 animate-pulse rounded"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={leadStatus}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {leadStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value, name) => [value, name]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Sales Growth Trend */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 lg:col-span-2">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sales Growth Trend
                  </h2>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="h-64 w-full bg-gray-100 animate-pulse rounded"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={salesGrowth}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value) => formatCurrency(value as number)}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="sales"
                          stroke="#4F46E5"
                          activeDot={{ r: 8 }}
                          name="Sales"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({
  title,
  value,
  isLoading,
  icon,
}: {
  title: string;
  value: string;
  isLoading: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          )}
        </div>
        <div className="rounded-full p-2 bg-gray-100">{icon}</div>
      </div>
    </div>
  );
};

// Import all required icons
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  PoundSterling,
  Percent,
  Clock,
  CheckCircle,
  Store,
  Upload,
  DollarSign,
  User,
  RefreshCw,
} from "lucide-react";

export default PartnerDashboard;
