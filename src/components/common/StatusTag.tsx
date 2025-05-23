import { cn } from "@/lib/utils";

type StatusType =
  | "pending"
  | "spoken"
  | "closed"
  | "rejected"
  | "active"
  | "inactive";

interface StatusTagProps {
  status: StatusType;
  className?: string;
}

const StatusTag = ({ status, className }: StatusTagProps) => {
  // Define status colors and labels
  const statusConfig = {
    pending: {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-800",
      borderColor: "border-yellow-200",
      label: "Pending",
    },
    spoken: {
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      borderColor: "border-blue-200",
      label: "Spoken To",
    },
    closed: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      label: "Closed",
    },
    rejected: {
      bgColor: "bg-red-100",
      textColor: "text-red-800",
      borderColor: "border-red-200",
      label: "Rejected",
    },
    active: {
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      borderColor: "border-green-200",
      label: "Active",
    },
    inactive: {
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
      label: "Inactive",
    },
  };

  const config = statusConfig[status] || {
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-200",
    label: status.charAt(0).toUpperCase() + status.slice(1),
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        config.bgColor,
        config.textColor,
        config.borderColor,
        className,
      )}
    >
      {config.label}
    </span>
  );
};

export default StatusTag;
