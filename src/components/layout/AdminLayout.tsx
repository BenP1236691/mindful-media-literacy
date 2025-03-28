
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, BookOpen, FileText, LogOut, Home } from "lucide-react";

const AdminLayout: React.FC<{ children: React.ReactNode; activeTab: string }> = ({
  children,
  activeTab,
}) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!user || !isAdmin)) {
      navigate("/login");
    }
  }, [user, isAdmin, navigate, mounted]);

  if (!mounted || !user || !isAdmin) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-primary text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-2xl font-bold">
              Admin Dashboard
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="secondary" size="sm">
                <Home className="mr-2 h-4 w-4" />
                Return to Site
              </Button>
            </Link>
            <div className="text-sm">
              {user.email}
            </div>
          </div>
        </div>
      </header>

      <div className="flex-grow flex">
        <div className="hidden md:block w-64 bg-gray-50 border-r">
          <div className="p-4">
            <nav className="space-y-2">
              <Link
                to="/admin"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "dashboard"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link
                to="/admin/team"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "team"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                Team Members
              </Link>
              <Link
                to="/admin/courses"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "courses"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Courses
              </Link>
              <Link
                to="/admin/content"
                className={`flex items-center px-4 py-2 rounded-md ${
                  activeTab === "content"
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <FileText className="h-5 w-5 mr-2" />
                Page Content
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex-grow p-6">
          <div className="md:hidden mb-6">
            <Tabs defaultValue={activeTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger
                  value="dashboard"
                  onClick={() => navigate("/admin")}
                >
                  <Home className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger
                  value="team"
                  onClick={() => navigate("/admin/team")}
                >
                  <Users className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger
                  value="courses"
                  onClick={() => navigate("/admin/courses")}
                >
                  <BookOpen className="h-5 w-5" />
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  onClick={() => navigate("/admin/content")}
                >
                  <FileText className="h-5 w-5" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
