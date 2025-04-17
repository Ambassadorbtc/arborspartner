import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronRight,
  Settings,
  User,
  BarChart3,
  Users,
  FileText,
  PieChart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-green-600"
            >
              <path d="M21 9c0 4-5 7-9 7s-9-3-9-7c0-3 2-5 5-5 2 0 3 1 4 2 1-1 2-2 4-2 3 0 5 2 5 5Z" />
              <path d="M12 16v6" />
            </svg>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/partner-login">
                  <Button className="rounded-full bg-green-600 text-white hover:bg-green-700 text-sm px-4">
                    Partner Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero section */}
        <section className="py-20 text-center bg-gradient-to-b from-white to-green-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-5xl font-semibold tracking-tight mb-3">
              Grow Your Business with Arbor
            </h2>
            <h3 className="text-2xl font-medium text-gray-600 mb-6">
              Join our partner network and earn commissions on every referral
            </h3>
            <div className="flex justify-center space-x-6 text-xl">
              <Link
                to="/partner-login"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium flex items-center"
              >
                Become a Partner <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
              <Link
                to="/partner-login"
                className="border border-gray-300 hover:border-gray-400 px-8 py-3 rounded-full font-medium flex items-center"
              >
                Partner Login <ChevronRight className="h-5 w-5 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-[1200px] mx-auto px-4">
            <h2 className="text-4xl font-semibold tracking-tight mb-3">
              Partner Benefits
            </h2>
            <h3 className="text-xl font-medium text-gray-600 mb-12 max-w-2xl mx-auto">
              Join our network of partners and enjoy these exclusive benefits
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <PieChart className="h-7 w-7 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3">
                  Competitive Commissions
                </h4>
                <p className="text-gray-600">
                  Earn industry-leading commission rates on every successful
                  referral, with flexible percentage or fixed amount options.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart3 className="h-7 w-7 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3">
                  Real-time Dashboard
                </h4>
                <p className="text-gray-600">
                  Track your performance, commissions, and leads in real-time
                  through our intuitive partner dashboard.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm text-left border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-7 w-7 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-3">
                  Dedicated Support
                </h4>
                <p className="text-gray-600">
                  Get personalized support from our partner success team to help
                  maximize your referral potential.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-semibold tracking-tight mb-3">
                How It Works
              </h2>
              <h3 className="text-xl font-medium text-gray-600 max-w-2xl mx-auto">
                Our partner program is designed to be simple and rewarding
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-xl font-semibold mb-2">Sign Up</h4>
                <p className="text-gray-600">
                  Create your partner account and complete your profile
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-xl font-semibold mb-2">Refer Clients</h4>
                <p className="text-gray-600">
                  Share your unique referral link with potential clients
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-xl font-semibold mb-2">Track Progress</h4>
                <p className="text-gray-600">
                  Monitor your leads and conversions in real-time
                </p>
              </div>

              <div className="text-center">
                <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  4
                </div>
                <h4 className="text-xl font-semibold mb-2">Earn Commissions</h4>
                <p className="text-gray-600">
                  Get paid for successful referrals on a monthly basis
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Dashboard Preview */}
        <section className="py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-semibold tracking-tight mb-4">
                  Powerful Admin Dashboard
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Our comprehensive admin interface gives you complete
                  visibility and control over your partner program.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Monitor partner performance with visual analytics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Manage custom commission structures for each partner
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Track and update lead statuses with color-coded indicators
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                      <svg
                        className="h-4 w-4 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">
                      Generate detailed reports on sales and commissions
                    </span>
                  </li>
                </ul>

                <div className="mt-8">
                  <Link
                    to="/admin-login"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
                  >
                    Access Admin Dashboard{" "}
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </Link>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
                <div className="bg-gray-900 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Partner Performance</h4>
                    <div className="text-xs bg-gray-700 px-2 py-1 rounded">
                      Last 30 days
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-gray-400 text-xs mb-1">
                        Total Partners
                      </div>
                      <div className="text-2xl font-semibold">24</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-gray-400 text-xs mb-1">
                        Active Leads
                      </div>
                      <div className="text-2xl font-semibold">156</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg">
                      <div className="text-gray-400 text-xs mb-1">
                        Commissions
                      </div>
                      <div className="text-2xl font-semibold text-green-400">
                        $12,450
                      </div>
                    </div>
                  </div>
                  <div className="h-40 flex items-end justify-between px-2">
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[20%]"></div>
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[45%]"></div>
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[30%]"></div>
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[60%]"></div>
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[75%]"></div>
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[90%]"></div>
                    <div className="w-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t h-[65%]"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-green-600 text-white text-center">
          <div className="max-w-[800px] mx-auto px-4">
            <h2 className="text-4xl font-semibold tracking-tight mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl mb-8">
              Join our partner network today and start earning commissions on
              every successful referral.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/partner-login"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-full font-medium"
              >
                Become a Partner
              </Link>
              <Link
                to="/partner-login"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-medium"
              >
                Partner Login
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-medium text-white mb-4">
                Arbor Partner Portal
              </h4>
              <p className="text-sm mb-4">
                The leading commission-based referral system for growing
                businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    Partner Guide
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Marketing Materials
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Commission Structure
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:text-white">
                    Partner Agreement
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-sm">
            <p>© 2025 Arbor Partner Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
