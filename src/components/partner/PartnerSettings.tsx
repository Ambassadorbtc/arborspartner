import React, { useState } from "react";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  LayoutDashboard,
  Store,
  FileText,
  Upload,
  DollarSign,
  User,
  Settings,
  Save,
  Bell,
  Lock,
  Shield,
  ArrowLeft,
} from "lucide-react";

const PartnerSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leadUpdates: true,
    commissionPayments: true,
    marketingEmails: false,
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });

      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description:
          error.message || "There was an error updating your password.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an error updating your notification settings.",
      });
    } finally {
      setLoading(false);
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
      path: "/partner/commissions",
    },
    { icon: <User size={20} />, label: "Profile", path: "/partner/profile" },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      isActive: true,
      path: "/partner/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <TopNavigation />
      <div className="flex h-[calc(100vh-64px)] mt-16">
        <Sidebar items={navItems} activeItem="Settings" />
        <main className="flex-1 overflow-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">
                Account Settings
              </h1>
            </div>

            <div className="space-y-6">
              {/* Password Settings */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center">
                  <Lock className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Password Settings
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Update your password
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4" />
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Notification Settings
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage your notification preferences
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleNotificationSubmit}
                  className="p-6 space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive email notifications
                        </p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(
                            "emailNotifications",
                            checked,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="leadUpdates">Lead Updates</Label>
                        <p className="text-sm text-gray-500">
                          Receive updates when lead status changes
                        </p>
                      </div>
                      <Switch
                        id="leadUpdates"
                        checked={notificationSettings.leadUpdates}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("leadUpdates", checked)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="commissionPayments">
                          Commission Payments
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive notifications about commission payments
                        </p>
                      </div>
                      <Switch
                        id="commissionPayments"
                        checked={notificationSettings.commissionPayments}
                        onCheckedChange={(checked) =>
                          handleNotificationChange(
                            "commissionPayments",
                            checked,
                          )
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="marketingEmails">
                          Marketing Emails
                        </Label>
                        <p className="text-sm text-gray-500">
                          Receive marketing and promotional emails
                        </p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notificationSettings.marketingEmails}
                        onCheckedChange={(checked) =>
                          handleNotificationChange("marketingEmails", checked)
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4" />
                      {loading ? "Saving..." : "Save Preferences"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex items-center">
                  <Shield className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Security Settings
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage your account security
                    </p>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-sm text-gray-500">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Active Sessions</h3>
                        <p className="text-sm text-gray-500">
                          Manage your active login sessions
                        </p>
                      </div>
                      <Button variant="outline">View Sessions</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="font-medium">Account Activity</h3>
                        <p className="text-sm text-gray-500">
                          View your recent account activity
                        </p>
                      </div>
                      <Button variant="outline">View Activity</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PartnerSettings;
