import React from "react";
import { Plus, ChevronDown } from "lucide-react";

interface AddAccountButtonProps {
  onCreate?: () => void;
  onDropdownToggle?: () => void;
  accountCount?: number;
}

const AddAccountButton: React.FC<AddAccountButtonProps> = ({
  onCreate,
  onDropdownToggle,
  accountCount = 0,
}) => {
  return (
    <div className="flex rounded-lg overflow-hidden border border-white bg-black shadow-lg text-white">
      {/* Left: Account dropdown trigger */}
      <button
        onClick={onDropdownToggle}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-800 transition-all"
        title="Show accounts"
      >
        <ChevronDown className="w-4 h-4" />
        <span className="text-sm hidden sm:inline">
          {accountCount} {accountCount === 1 ? "Account" : "Accounts"}
        </span>
      </button>

      {/* Right: Create account */}
      <button
        onClick={onCreate}
        className="px-3 py-2 border-l border-white hover:bg-blue-600 transition-all flex items-center justify-center"
        title="Create new account"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default AddAccountButton;
