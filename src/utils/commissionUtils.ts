/**
 * Calculate commission based on sale amount and partner's commission settings
 * Default commission is max(£50, 0.15 * sale_amount)
 * Partners can have custom commission rates and minimums
 */
export const calculateCommission = (
  saleAmount: number,
  commissionRate: number = 0.15,
  commissionMin: number = 50,
): number => {
  // Calculate commission based on rate
  const calculatedCommission = saleAmount * commissionRate;

  // Return the greater of calculated commission or minimum commission
  return Math.max(calculatedCommission, commissionMin);
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
};

/**
 * Calculate total commission for multiple sales
 */
export const calculateTotalCommission = (
  sales: Array<{ amount: number }>,
  commissionRate: number = 0.15,
  commissionMin: number = 50,
): number => {
  return sales.reduce((total, sale) => {
    return (
      total + calculateCommission(sale.amount, commissionRate, commissionMin)
    );
  }, 0);
};

/**
 * Calculate commission tiers for display
 */
export const getCommissionTiers = (
  commissionRate: number = 0.15,
  commissionMin: number = 50,
): Array<{ saleAmount: number; commission: number }> => {
  // Generate sample tiers for display purposes
  const saleAmounts = [100, 250, 500, 1000, 2500, 5000, 10000];

  return saleAmounts.map((amount) => ({
    saleAmount: amount,
    commission: calculateCommission(amount, commissionRate, commissionMin),
  }));
};
