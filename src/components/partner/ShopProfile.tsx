import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import EditShopInline from "./EditShopInline";
import {
  LayoutDashboard,
  Store,
  FileText,
  Upload,
  DollarSign,
  User,
  Settings,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Edit,
  ArrowLeft,
  Clock,
  FileText as FileIcon,
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
  commissionRate?: number;
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
    commissionRate: 15,
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
    commissionRate: 12,
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
    commissionRate: 10,
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
    commissionRate: 18,
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
    commissionRate: 15,
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
    commissionRate: 14,
  },
];

interface ShopProfileProps {
  shopId?: number;
}

const ShopProfile: React.FC<ShopProfileProps> = ({ shopId }) => {
  const { toast } = useToast();
  const params = useParams<{ shopId: string }>();
  const id = shopId || parseInt(params.shopId || "0");
  const [shop, setShop] = useState<Shop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "details" | "leads" | "commissions"
  >("details");
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to fetch shop details
    setTimeout(() => {
      const foundShop = mockShops.find((s) => s.id === Number(id));
      setShop(foundShop || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <TopNavigation />
        <div className="flex h-[calc(100vh-64px)] mt-16">
          <Sidebar items={navItems} activeItem="Shops" />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <TopNavigation />
        <div className="flex h-[calc(100vh-64px)] mt-16">
          <Sidebar items={navItems} activeItem="Shops" />
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Shop Not Found
                </h3>
                <p className="text-gray-500 mb-6">
                  The shop you are looking for does not exist or has been
                  removed.
                </p>
                <Button
                  className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => (window.location.href = "/partner/shops")}
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Shops
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleSaveShop = (updatedShop: Shop) => {
    setShop(updatedShop);
    setShowEditForm(false);
    toast({
      title: "Shop updated",
      description: "Shop details have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar items={navItems} activeItem="Shops" />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Button
                  className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  onClick={() => (window.location.href = "/partner/shops")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">
                  {shop.name}
                </h1>
                <Badge
                  className={`${getStatusBadgeColor(shop.status)} border ml-2`}
                >
                  {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
                </Badge>
              </div>
              <Button
                className="justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                onClick={() => setShowEditForm(true)}
              >
                <Edit className="h-4 w-4" />
                Edit Shop
              </Button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-t-xl shadow-sm overflow-hidden border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                <Button
                  variant="ghost"
                  className={`px-4 py-2 rounded-none ${activeTab === "details" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "bg-white text-gray-700"}`}
                  onClick={() => setActiveTab("details")}
                >
                  Shop Details
                </Button>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 rounded-none ${activeTab === "leads" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "bg-white text-gray-700"}`}
                  onClick={() => setActiveTab("leads")}
                >
                  Leads
                </Button>
                <Button
                  variant="ghost"
                  className={`px-4 py-2 rounded-none ${activeTab === "commissions" ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600" : "bg-white text-gray-700"}`}
                  onClick={() => setActiveTab("commissions")}
                >
                  Commissions
                </Button>
              </div>
            </div>

            {activeTab === "details" && !showEditForm && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Shop Information */}
                <Card className="md:col-span-2 bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle>Shop Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Shop Name
                          </h3>
                          <p className="text-base text-gray-900">{shop.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Contact Person
                          </h3>
                          <p className="text-base text-gray-900">
                            {shop.contactName}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              Address
                            </h3>
                            <p className="text-base text-gray-900">
                              {shop.address}, {shop.city}, {shop.postcode}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              Last Contact
                            </h3>
                            <p className="text-base text-gray-900">
                              {new Date(shop.lastContact).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <Phone className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              Phone
                            </h3>
                            <p className="text-base text-gray-900">
                              {shop.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Mail className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">
                              Email
                            </h3>
                            <p className="text-base text-gray-900">
                              {shop.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Notes
                        </h3>
                        <div className="bg-gray-50 p-3 rounded-md">
                          <p className="text-base text-gray-900">
                            {shop.notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Commission Information */}
                <Card className="bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle>Commission Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Commission Rate
                        </h3>
                        <p className="text-2xl font-bold text-blue-600">
                          {shop.commissionRate}%
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Status
                        </h3>
                        <Badge
                          className={`${getStatusBadgeColor(
                            shop.status,
                          )} border mt-1`}
                        >
                          {shop.status.charAt(0).toUpperCase() +
                            shop.status.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          Last Updated
                        </h3>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Log */}
                <Card className="md:col-span-3 bg-white shadow-sm border border-gray-200">
                  <CardHeader>
                    <CardTitle>Activity Log</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FileIcon className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Shop information updated
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date().toLocaleDateString()} at{" "}
                            {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <DollarSign className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Commission rate adjusted to {shop.commissionRate}%
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(shop.lastContact).toLocaleDateString()} at{" "}
                            {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <User className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Shop added to the system
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(shop.lastContact).toLocaleDateString()} at{" "}
                            {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "details" && showEditForm && (
              <EditShopInline
                shop={shop}
                onCancel={() => setShowEditForm(false)}
                onSave={handleSaveShop}
              />
            )}

            {activeTab === "leads" && !showEditForm && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Shop Leads
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Leads associated with {shop.name}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-center text-gray-500 py-8">
                    Lead information will be displayed here. This feature is
                    under development.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "commissions" && !showEditForm && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Commission History
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Commission history for {shop.name}
                  </p>
                </div>
                <div className="p-6">
                  <p className="text-center text-gray-500 py-8">
                    Commission history will be displayed here. This feature is
                    under development.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShopProfile;
