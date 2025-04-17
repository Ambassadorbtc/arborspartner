import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
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
} from "lucide-react";
import StatusTag from "@/components/common/StatusTag";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

  useEffect(() => {
    async function fetchShops() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("shops").select("*");

        if (error) throw error;

        if (data) {
          setShops(data);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchShops();
  }, []);

  const filteredShops = shops.filter(
    (shop) =>
      shop.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shop.location?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar items={navItems} activeItem="Shops" />
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">My Shops</h1>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredShops.map((shop) => (
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
