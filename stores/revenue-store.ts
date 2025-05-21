import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { RevenueSettings } from "@/types";

interface RevenueState {
  totalRevenue: number;
  pendingPayments: number;
  transactions: Array<{
    id: string;
    amount: number;
    type: "INCOME" | "WITHDRAWAL";
    date: string;
    description: string;
  }>;
  settings: RevenueSettings;
  loading: boolean;
  fetchRevenue: () => Promise<void>;
  updateSettings: (settings: RevenueSettings) => Promise<void>;
  withdraw: (amount: number) => Promise<void>;
}

export const useRevenueStore = create<RevenueState>()(
  persist(
    (set, get) => ({
      totalRevenue: 15790,
      pendingPayments: 3250,
      transactions: [
        {
          id: "1",
          amount: 5000,
          type: "WITHDRAWAL",
          date: new Date(Date.now() - 5 * 86400000).toISOString(),
          description: "Withdrawal",
        },
        {
          id: "2",
          amount: 1250,
          type: "INCOME",
          date: new Date(Date.now() - 8 * 86400000).toISOString(),
          description: "Delivery Payment",
        },
        {
          id: "3",
          amount: 2340,
          type: "INCOME",
          date: new Date(Date.now() - 10 * 86400000).toISOString(),
          description: "Delivery Payment",
        },
      ],
      settings: {
        notificationsEnabled: true,
        autoWithdraw: false,
        withdrawThreshold: 10000,
        paymentMethod: "bank_transfer",
      },
      loading: false,

      fetchRevenue: async () => {
        set({ loading: true });
        try {
          // In a real app, this would fetch from Appwrite
          // For demo purposes, we'll use the existing state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ loading: false });
        } catch (error) {
          console.error("Error fetching revenue:", error);
          set({ loading: false });
        }
      },

      updateSettings: async (settings) => {
        set({ loading: true });
        try {
          // In a real app, this would update in Appwrite
          // For demo purposes, we'll just update the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ settings, loading: false });
        } catch (error) {
          console.error("Error updating settings:", error);
          set({ loading: false });
        }
      },

      withdraw: async (amount) => {
        set({ loading: true });
        try {
          // In a real app, this would create a withdrawal request in Appwrite
          // For demo purposes, we'll just update the local state
          
          if (amount > get().totalRevenue) {
            throw new Error("Insufficient funds");
          }
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const newTransaction = {
            id: Math.random().toString(36).substring(2, 9),
            amount,
            type: "WITHDRAWAL" as const,
            date: new Date().toISOString(),
            description: "Withdrawal",
          };
          
          set(state => ({
            totalRevenue: state.totalRevenue - amount,
            transactions: [newTransaction, ...state.transactions],
            loading: false,
          }));
        } catch (error) {
          console.error("Error processing withdrawal:", error);
          set({ loading: false });
          throw error;
        }
      },
    }),
    {
      name: "revenue-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);