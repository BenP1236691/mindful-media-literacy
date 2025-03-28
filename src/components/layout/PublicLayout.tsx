
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { BookOpen, User, LogOut } from "lucide-react";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold gradient-heading">
            MindfulMedia
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-primary">
              Courses
            </Link>
            <Link to="/team" className="text-gray-700 hover:text-primary">
              Our Team
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <div className="hidden md:block text-sm text-gray-500">
                  {user.email}
                </div>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/my-courses">
                  <Button variant="outline" size="sm">
                    <BookOpen className="mr-2 h-4 w-4" />
                    My Courses
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t mt-10 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold gradient-heading mb-4">
                MindfulMedia
              </h3>
              <p className="text-sm text-gray-600 max-w-md">
                Promoting AI literacy and critical thinking for the digital age.
                Learn to navigate the complex landscape of online information.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium mb-4">Site</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/" className="text-gray-600 hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses" className="text-gray-600 hover:text-primary">
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/team" className="text-gray-600 hover:text-primary">
                      Our Team
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Account</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/login" className="text-gray-600 hover:text-primary">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="text-gray-600 hover:text-primary">
                      Sign Up
                    </Link>
                  </li>
                  {user && (
                    <li>
                      <Link to="/my-courses" className="text-gray-600 hover:text-primary">
                        My Courses
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} MindfulMedia. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
