import { createContext } from "react";
import type { WalletContextType } from "@/types/wallet";

// ✅ Export just the context (no components here)
export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);
