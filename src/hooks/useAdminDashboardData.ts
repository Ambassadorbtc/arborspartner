import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabase";

// Define types for the dashboard data
type MetricsType = {
  totalSales: number;
  totalCommissions: number;
  activePartners: number;
  pendingLeads: number;
  closedLeads: number;
};

type PartnerPerformanceType = {
  name: string;
  sales: number;
  commissions: number;
  leads: number;
}[];

type MonthlySalesType = {
  month: string;
  sales: number;
  commissions: number;
}[];

type LeadStatusType = {
  name: string;
  value: number;
  color: string;
}[];

type SalesGrowthType = {
  month: string;
  sales: number;
}[];

type DashboardDataType = {
  metrics: MetricsType;
  partnerPerformance: PartnerPerformanceType;
  monthlySales: MonthlySalesType;
  leadStatus: LeadStatusType;
  salesGrowth: SalesGrowthType;
  loading: boolean;
  fetchDashboardData: () => Promise<void>;
};

// Mock data for initial display
const mockMetrics = {
  totalSales: 125000,
  totalCommissions: 18750,
  activePartners: 24,
  pendingLeads: 37,
  closedLeads: 89,
};

const mockPartnerPerformance = [
  { name: "Partner A", sales: 42000, commissions: 6300, leads: 28 },
  { name: "Partner B", sales: 35000, commissions: 5250, leads: 22 },
  { name: "Partner C", sales: 28000, commissions: 4200, leads: 19 },
  { name: "Partner D", sales: 20000, commissions: 3000, leads: 15 },
];

// Mock data for charts
const mockMonthlySales = [
  { month: "Jan", sales: 15000, commissions: 2250 },
  { month: "Feb", sales: 18000, commissions: 2700 },
  { month: "Mar", sales: 22000, commissions: 3300 },
  { month: "Apr", sales: 19000, commissions: 2850 },
  { month: "May", sales: 24000, commissions: 3600 },
  { month: "Jun", sales: 28000, commissions: 4200 },
];

const mockLeadStatus = [
  { name: "Pending", value: 37, color: "#FFBB28" },
  { name: "Spoken To", value: 25, color: "#0088FE" },
  { name: "Closed", value: 89, color: "#00C49F" },
  { name: "Rejected", value: 18, color: "#FF8042" },
];

const mockSalesGrowth = [
  { month: "Jan", sales: 15000 },
  { month: "Feb", sales: 18000 },
  { month: "Mar", sales: 22000 },
  { month: "Apr", sales: 19000 },
  { month: "May", sales: 24000 },
  { month: "Jun", sales: 28000 },
];

/**
 * Custom hook to fetch and manage admin dashboard data
 * @param dateRange - The date range for filtering data (week, month, year)
 * @returns Dashboard data and loading state
 */
export function useAdminDashboardData(
  dateRange: string = "month",
): DashboardDataType {
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(mockMetrics);
  const [partnerPerformance, setPartnerPerformance] = useState(
    mockPartnerPerformance,
  );
  const [monthlySales, setMonthlySales] = useState(mockMonthlySales);
  const [leadStatus, setLeadStatus] = useState(mockLeadStatus);
  const [salesGrowth, setSalesGrowth] = useState(mockSalesGrowth);

  // Function to fetch real data from Supabase
  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      // In a real implementation, we would fetch actual data from Supabase
      // For now, we'll simulate a delay and use mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // TODO: Replace with actual Supabase queries
      // Example query for total sales:
      // const { data: salesData, error: salesError } = await supabase
      //   .from('sales')
      //   .select('sale_amount')
      //   .gte('sale_date', getDateRangeStart(dateRange));
      //
      // if (salesError) throw salesError;
      //
      // const totalSales = salesData.reduce((sum, sale) => sum + sale.sale_amount, 0);

      // Update with mock data for now
      setMetrics(mockMetrics);
      setPartnerPerformance(mockPartnerPerformance);
      setMonthlySales(mockMonthlySales);
      setLeadStatus(mockLeadStatus);
      setSalesGrowth(mockSalesGrowth);
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

  return {
    metrics,
    partnerPerformance,
    monthlySales,
    leadStatus,
    salesGrowth,
    loading,
    fetchDashboardData,
  };
}
