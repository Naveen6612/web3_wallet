import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react"; // optional icon

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("wallet_password");
    // localStorage.removeItem("wallet_uuid");
    localStorage.removeItem("wallet_accounts"); // optional
    navigate("/"); // or /login
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl shadow transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default LogoutButton;
