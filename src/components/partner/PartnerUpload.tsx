import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "../dashboard/layout/TopNavigation";
import Sidebar from "../dashboard/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  LayoutDashboard,
  Store,
  FileText,
  Upload as UploadIcon,
  DollarSign,
  User,
  Settings,
  FileUp,
  AlertCircle,
  CheckCircle,
  X,
  ClipboardList,
  RefreshCw,
  Eye,
  FileText as FileIcon,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PartnerUpload = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadType, setUploadType] = useState<"csv" | "manual">("csv");
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [manualFormData, setManualFormData] = useState({
    storeName: "",
    contactName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    notes: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);
    setUploadSuccess(false);

    if (!selectedFile) {
      return;
    }

    // Check file type
    if (!selectedFile.name.endsWith(".csv")) {
      setFileError("Please upload a CSV file");
      setFile(null);
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size should be less than 5MB");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleManualInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setManualFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCsvUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setFileError("Please select a file to upload");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast({
        title: "Upload successful",
        description: `${file.name} has been uploaded successfully.`,
      });

      setUploadSuccess(true);
      // Reset file after successful upload
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById(
        "csv-upload",
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your file.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Lead added successfully",
        description: `${manualFormData.storeName} has been added to your leads.`,
      });

      // Reset form
      setManualFormData({
        storeName: "",
        contactName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postcode: "",
        notes: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error adding your lead.",
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
    {
      icon: <UploadIcon size={20} />,
      label: "Upload",
      isActive: true,
      path: "/partner/upload",
    },
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
        <Sidebar items={navItems} activeItem="Upload" />
        <main className="flex-1 overflow-auto p-6">
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
              <h1 className="text-2xl font-bold text-gray-900">Upload Leads</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex space-x-4">
                  <Button
                    variant={uploadType === "csv" ? "default" : "outline"}
                    onClick={() => setUploadType("csv")}
                    className={
                      uploadType === "csv"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }
                  >
                    CSV Upload
                  </Button>
                  <Button
                    variant={uploadType === "manual" ? "default" : "outline"}
                    onClick={() => setUploadType("manual")}
                    className={
                      uploadType === "manual"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }
                  >
                    Manual Entry
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {uploadType === "csv" ? (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        Upload CSV File
                      </h2>
                      <p className="text-sm text-gray-500">
                        Upload a CSV file containing your leads. The file should
                        include columns for store name, contact details, and
                        address information.
                      </p>
                    </div>

                    {uploadSuccess && (
                      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-green-800">
                            Upload Successful
                          </h3>
                          <p className="text-sm text-green-700 mt-1">
                            Your file has been uploaded and is being processed.
                            You can view the status in the upload history.
                          </p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleCsvUpload} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="csv-upload">Select CSV File</Label>
                        <div className="flex items-center">
                          <Input
                            id="csv-upload"
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="flex-1"
                          />
                          {file && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                              onClick={() => {
                                setFile(null);
                                const fileInput = document.getElementById(
                                  "csv-upload",
                                ) as HTMLInputElement;
                                if (fileInput) fileInput.value = "";
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {fileError && (
                          <div className="flex items-center text-red-500 text-sm mt-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {fileError}
                          </div>
                        )}
                        {file && !fileError && (
                          <p className="text-sm text-gray-500 mt-1">
                            Selected file: {file.name} (
                            {(file.size / 1024).toFixed(2)} KB)
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          Download Template
                        </a>
                        <span className="text-gray-400">|</span>
                        <a
                          href="#"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          View Instructions
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        disabled={loading || !file}
                      >
                        <FileUp className="h-4 w-4" />
                        {loading ? "Uploading..." : "Upload File"}
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2">
                        Manual Lead Entry
                      </h2>
                      <p className="text-sm text-gray-500">
                        Enter lead information manually using the form below.
                      </p>
                    </div>

                    <form onSubmit={handleManualSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="storeName">Store Name *</Label>
                          <Input
                            id="storeName"
                            name="storeName"
                            value={manualFormData.storeName}
                            onChange={handleManualInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactName">Contact Name</Label>
                          <Input
                            id="contactName"
                            name="contactName"
                            value={manualFormData.contactName}
                            onChange={handleManualInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={manualFormData.email}
                            onChange={handleManualInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={manualFormData.phone}
                            onChange={handleManualInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            name="address"
                            value={manualFormData.address}
                            onChange={handleManualInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="city"
                            value={manualFormData.city}
                            onChange={handleManualInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="postcode">Postcode</Label>
                          <Input
                            id="postcode"
                            name="postcode"
                            value={manualFormData.postcode}
                            onChange={handleManualInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={manualFormData.notes}
                          onChange={handleManualInputChange}
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                        disabled={loading || !manualFormData.storeName}
                      >
                        <FileUp className="h-4 w-4" />
                        {loading ? "Submitting..." : "Add Lead"}
                      </Button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Upload Guidelines
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        CSV Format Requirements
                      </h3>
                      <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li>File must be in CSV format with UTF-8 encoding</li>
                        <li>Maximum file size is 5MB</li>
                        <li>First row should contain column headers</li>
                        <li>Required columns: store_name</li>
                        <li>
                          Optional columns: contact_name, email, phone, address,
                          city, postcode, notes
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Processing Time
                      </h3>
                      <p className="text-sm text-gray-600">
                        CSV files are typically processed within 5-10 minutes.
                        You will receive an email notification once processing
                        is complete.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-md font-medium text-gray-900 mb-2">
                        Data Protection
                      </h3>
                      <p className="text-sm text-gray-600">
                        Ensure you have permission to share the contact details
                        you upload. All data is processed in accordance with our
                        privacy policy and data protection regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Uploads
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Upload history items */}
                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <FileIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium text-sm">
                            leads_june_2023.csv
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200 border">
                          Completed
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Uploaded on{" "}
                        {new Date("2023-06-15").toLocaleDateString()}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs">45 records processed</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <FileIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium text-sm">
                            new_shops_batch1.csv
                          </span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200 border">
                          Completed
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Uploaded on{" "}
                        {new Date("2023-06-10").toLocaleDateString()}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs">
                          32 records processed (2 errors)
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <FileIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium text-sm">
                            leads_july_2023.csv
                          </span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 border">
                          Processing
                        </Badge>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Uploaded on{" "}
                        {new Date("2023-07-01").toLocaleDateString()}
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs">50 records processing</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </div>
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

export default PartnerUpload;
