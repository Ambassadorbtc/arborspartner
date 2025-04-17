import React, { useState, useEffect } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  LayoutDashboard,
  Store,
  FileText,
  Upload,
  DollarSign,
  User,
  Settings,
  Search,
  Plus,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

interface Shop {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  contactName: string;
  phone: string;
  email: string;
  status: "active" | "pending" | "inactive";
  lastContact: string;
  notes: string;
}

const mockShops: Shop[] = [
  {
    id: 1,
    name: "Coffee Haven",
    address: "123 High Street",
    city: "London",
    postcode: "EC1A 1BB",
    contactName: "James Wilson",
    phone: "+44 7700 900123",
    email: "james@coffeehaven.com",
    status: "active",
    lastContact: "2023-05-15",
    notes:
      "Premium coffee shop with high foot traffic. Interested in expanding their digital presence.",
  },
  {
    id: 2,
    name: "Bakery Delight",
    address: "45 Market Square",
    city: "Manchester",
    postcode: "M1 1AE",
    contactName: "Sarah Johnson",
    phone: "+44 7700 900456",
    email: "sarah@bakerydelight.com",
    status: "active",
    lastContact: "2023-06-02",
    notes:
      "Family-owned bakery with multiple locations. Looking for loyalty program solutions.",
  },
  {
    id: 3,
    name: "Gourmet Burgers",
    address: "78 Castle Road",
    city: "Birmingham",
    postcode: "B1 1AA",
    contactName: "Michael Brown",
    phone: "+44 7700 900789",
    email: "michael@gourmetburgers.com",
    status: "pending",
    lastContact: "2023-06-10",
    notes:
      "Fast-growing burger chain. Initial meeting scheduled for next week.",
  },
  {
    id: 4,
    name: "Fashion Boutique",
    address: "12 Style Avenue",
    city: "Glasgow",
    postcode: "G1 1AB",
    contactName: "Emma Wilson",
    phone: "+44 7700 900101",
    email: "emma@fashionboutique.com",
    status: "inactive",
    lastContact: "2023-04-20",
    notes: "Upscale clothing store. Currently reviewing our proposal.",
  },
  {
    id: 5,
    name: "Tech Gadgets",
    address: "56 Digital Lane",
    city: "Edinburgh",
    postcode: "EH1 1YZ",
    contactName: "David Chen",
    phone: "+44 7700 900202",
    email: "david@techgadgets.com",
    status: "active",
    lastContact: "2023-06-15",
    notes:
      "Electronics retailer with strong online presence. Interested in in-store analytics.",
  },
  {
    id: 6,
    name: "Healthy Eats",
    address: "89 Nutrition Road",
    city: "Bristol",
    postcode: "BS1 1AA",
    contactName: "Lisa Green",
    phone: "+44 7700 900303",
    email: "lisa@healthyeats.com",
    status: "pending",
    lastContact: "2023-06-08",
    notes:
      "Health food restaurant chain. Looking for delivery integration solutions.",
  },
];

const PartnerShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load mock data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShops(mockShops);
      setFilteredShops(mockShops);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter shops based on search term and status
  useEffect(() => {
    if (!shops.length) return;

    const filtered = shops.filter((shop) => {
      const matchesSearch =
        searchTerm === "" ||
        shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || shop.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    setFilteredShops(filtered);
  }, [searchTerm, statusFilter, shops]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
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
    {
      icon: <Store size={20} />,
      label: "Shops",
      isActive: true,
      path: "/partner/shops",
    },
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
        <Sidebar items={navItems} activeItem="Shops" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Shop Management
              </h1>
              <Button className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Shop
              </Button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search shops..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Shop Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card
                    key={index}
                    className="bg-white shadow-sm border border-gray-200"
                  >
                    <CardContent className="p-6">
                      <div className="animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                        <div className="h-20 bg-gray-200 rounded w-full mb-3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredShops.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No shops found
                </h3>
                <p className="text-gray-500 mb-6">
                  No shops match your current search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShops.map((shop) => (
                  <Card
                    key={shop.id}
                    className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {shop.name}
                        </h3>
                        <Badge
                          className={`${getStatusBadgeColor(shop.status)} border`}
                        >
                          {shop.status.charAt(0).toUpperCase() +
                            shop.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {shop.address}, {shop.city}, {shop.postcode}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <User className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {shop.contactName}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {shop.phone}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {shop.email}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-md mb-4">
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {shop.notes}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Last Contact:{" "}
                          {new Date(shop.lastContact).toLocaleDateString()}
                        </span>
                        <Button
                          className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                          onClick={() =>
                            (window.location.href = `/partner/shop/${shop.id}`)
                          }
                        >
                          <ExternalLink className="h-4 w-4" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerShops;
