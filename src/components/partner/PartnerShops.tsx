import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../supabase/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Search,
  Store,
  User,
  LayoutDashboard,
  FileText,
  Upload,
  DollarSign,
  Settings,
  ArrowLeft,
} from "lucide-react";
import StatusTag from "@/components/common/StatusTag";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";

export default function PartnerShops() {
  const [shops, setShops] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/partner/dashboard",
    },
    {
      icon: <Store size={20} />,
      label: "Shops",
      path: "/partner/shops",
      isActive: true,
    },
    {
      icon: <FileText size={20} />,
      label: "Leads",
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

  // Mock data for shops
  const mockShops = [
    {
      id: 1,
      name: "Coffee Haven",
      location: "London",
      type: "Cafe",
      contact_name: "James Wilson",
      status: "active",
      commission_type: "Percentage",
      commission_value: "15%",
      leads_count: 8,
    },
    {
      id: 2,
      name: "Bakery Delight",
      location: "Manchester",
      type: "Bakery",
      contact_name: "Sarah Johnson",
      status: "active",
      commission_type: "Percentage",
      commission_value: "12%",
      leads_count: 5,
    },
    {
      id: 3,
      name: "Gourmet Burgers",
      location: "Birmingham",
      type: "Restaurant",
      contact_name: "Michael Brown",
      status: "pending",
      commission_type: "Fixed",
      commission_value: "£10",
      leads_count: 3,
    },
    {
      id: 4,
      name: "Fashion Boutique",
      location: "Glasgow",
      type: "Retail",
      contact_name: "Emma Wilson",
      status: "inactive",
      commission_type: "Percentage",
      commission_value: "18%",
      leads_count: 0,
    },
    {
      id: 5,
      name: "Tech Gadgets",
      location: "Edinburgh",
      type: "Electronics",
      contact_name: "David Chen",
      status: "active",
      commission_type: "Percentage",
      commission_value: "15%",
      leads_count: 12,
    },
    {
      id: 6,
      name: "Healthy Eats",
      location: "Bristol",
      type: "Restaurant",
      contact_name: "Lisa Green",
      status: "pending",
      commission_type: "Percentage",
      commission_value: "14%",
      leads_count: 2,
    },
  ];

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Use mock data instead of fetching from Supabase
        setShops(mockShops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  // Filter shops based on search term
  const filteredShops = shops.filter(
    (shop) =>
      shop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Get current shops for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentShops = filteredShops.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredShops.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar items={navItems} activeItem="Shops" />
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.history.back()}
                  className="flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold">My Shops</h1>
              </div>
              <Button className="text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700">
                <Store className="mr-2 h-4 w-4" /> Add New Shop
              </Button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search shops by name or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Shops</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardHeader className="h-24 bg-gray-200 rounded-t-lg"></CardHeader>
                        <CardContent className="pt-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : filteredShops.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentShops.map((shop) => (
                        <Card
                          key={shop.id}
                          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl">
                                {shop.name}
                              </CardTitle>
                              <StatusTag status={shop.status || "active"} />
                            </div>
                            <CardDescription>{shop.location}</CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Building2 className="mr-2 h-4 w-4" />
                              <span>{shop.type || "Retail"}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="mr-2 h-4 w-4" />
                              <span>
                                {shop.contact_name || "Contact not available"}
                              </span>
                            </div>
                            <div className="mt-4">
                              <Badge variant="outline" className="mr-2">
                                {shop.commission_type || "Percentage"}:{" "}
                                {shop.commission_value || "5%"}
                              </Badge>
                              <Badge variant="outline">
                                {shop.leads_count || "0"} Leads
                              </Badge>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-2">
                            <Link
                              to={`/partner/shop/${shop.id}`}
                              className="w-full"
                            >
                              <Button className="w-full text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700">
                                View Shop Details
                              </Button>
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-8">
                        <nav className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              paginate(Math.max(1, currentPage - 1))
                            }
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>

                          {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1,
                          ).map((number) => (
                            <Button
                              key={number}
                              variant={
                                currentPage === number ? "default" : "outline"
                              }
                              size="sm"
                              onClick={() => paginate(number)}
                              className={
                                currentPage === number ? "bg-blue-600" : ""
                              }
                            >
                              {number}
                            </Button>
                          ))}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              paginate(Math.min(totalPages, currentPage + 1))
                            }
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-10">
                    <Store className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No shops found</h3>
                    <p className="mt-1 text-gray-500">
                      {searchTerm
                        ? "Try a different search term"
                        : "Get started by adding a new shop"}
                    </p>
                    {!searchTerm && (
                      <div className="mt-6">
                        <Button className="text-primary-foreground shadow h-9 px-4 py-2 bg-blue-600 hover:bg-blue-700">
                          <Store className="mr-2 h-4 w-4" /> Add New Shop
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>

              {/* Other tab contents would filter by status */}
              <TabsContent value="active" className="mt-0">
                {/* Similar content but filtered for active shops */}
              </TabsContent>
              <TabsContent value="pending" className="mt-0">
                {/* Similar content but filtered for pending shops */}
              </TabsContent>
              <TabsContent value="inactive" className="mt-0">
                {/* Similar content but filtered for inactive shops */}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
