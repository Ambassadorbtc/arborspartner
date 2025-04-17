import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabase";

// Define types for the dashboard data
type MetricsType = {
  totalSales: number;
  totalCommissions: number;
  activeLeads: number;
  pendingLeads: number;
  closedLeads: number;
};

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

type PartnerDashboardDataType = {
  metrics: MetricsType;
  monthlySales: MonthlySalesType;
  leadStatus: LeadStatusType;
  salesGrowth: SalesGrowthType;
  loading: boolean;
  fetchDashboardData: () => Promise<void>;
};

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

/**
 * Custom hook to fetch and manage partner dashboard data
 * @param dateRange - The date range for filtering data (week, month, year)
 * @param partnerId - The ID of the partner (from auth)
 * @returns Dashboard data and loading state
 */
export function usePartnerDashboardData(
  dateRange: string = "month",
  partnerId?: string,
): PartnerDashboardDataType {
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(mockMetrics);
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

      // TODO: Replace with actual Supabase queries filtered by partnerId
      // Example query for partner's sales:
      // if (partnerId) {
      //   const { data: salesData, error: salesError } = await supabase
      //     .from('sales')
      //     .select('sale_amount, commission')
      //     .eq('partner_id', partnerId)
      //     .gte('sale_date', getDateRangeStart(dateRange));
      //
      //   if (salesError) throw salesError;
      //
      //   const totalSales = salesData.reduce((sum, sale) => sum + sale.sale_amount, 0);
      //   const totalCommissions = salesData.reduce((sum, sale) => sum + sale.commission, 0);
      //   // Update metrics with real data
      // }

      // Update with mock data for now
      setMetrics(mockMetrics);
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

  // Fetch data when date range or partnerId changes
  useEffect(() => {
    fetchDashboardData();
  }, [dateRange, partnerId]);

  return {
    metrics,
    monthlySales,
    leadStatus,
    salesGrowth,
    loading,
    fetchDashboardData,
  };
}
