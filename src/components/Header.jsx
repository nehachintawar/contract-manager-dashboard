import { ChevronUp, LogOut, User } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function getUserInitials(email) {
  if (!email) return "U";
  const parts = email.split("@")[0].split(".");
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "U";
}

const Header = () => {
  const { userDetails, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleUserDetailsClick = () => {
    navigate("/profile");
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <header className="w-full flex justify-between items-center px-6 py-1 border-b border-gray-200 bg-white sticky top-0 z-40">
      <h1 className="text-xl font-bold font-sans">Contract Manager</h1>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
        >
          {/* Avatar */}
          <div className="relative">
            {userDetails?.image ? (
              <img
                src={userDetails.image}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium">
                {getUserInitials(userDetails?.email)}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">
              {userDetails?.firstName + " " + userDetails?.lastName ||
                userDetails?.email ||
                "User"}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {userDetails?.email}
            </div>
          </div>

          {/* Chevron Icon */}
          <ChevronUp
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
            <button
              onClick={handleUserDetailsClick}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              <span>User Details</span>
            </button>

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
