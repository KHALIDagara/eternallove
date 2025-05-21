import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Ramassage } from "@/types";
import { useParcelStore } from "./parcel-store";

interface RamassageState {
  ramassages: Ramassage[];
  loading: boolean;
  fetchRamassages: () => Promise<void>;
  addRamassage: (ramassage: Omit<Ramassage, "id" | "createdAt">) => Promise<void>;
  updateRamassage: (id: string, updates: Partial<Ramassage>) => Promise<void>;
  deleteRamassage: (id: string) => Promise<void>;
  completeRamassage: (id: string) => Promise<void>;
  cancelRamassage: (id: string) => Promise<void>;
}

export const useRamassageStore = create<RamassageState>()(
  persist(
    (set, get) => ({
      ramassages: [],
      loading: false,

      fetchRamassages: async () => {
        set({ loading: true });
        try {
          // In a real app, this would fetch from Appwrite
          // For demo purposes, we'll use the existing state or create mock data if empty
          
          const { ramassages } = get();
          
          if (ramassages.length === 0) {
            // Generate some mock data for demo
            const mockRamassages: Ramassage[] = [
              {
                id: "1",
                fornisseurName: "Société Express",
                city: "Casablanca",
                phone: "0522123456",
                address: "Zone Industrielle, Casablanca",
                notes: "Pickup after 2pm",
                parcelIds: ["1"],
                status: "PENDING",
                createdAt: new Date().toISOString(),
              },
              {
                id: "2",
                fornisseurName: "Maroc Livraison",
                city: "Rabat",
                phone: "0537654321",
                address: "Quartier Hassan, Rabat",
                notes: "",
                parcelIds: ["2"],
                status: "COMPLETED",
                createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
              },
            ];
            
            set({ ramassages: mockRamassages });
          }
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({ loading: false });
        } catch (error) {
          console.error("Error fetching ramassages:", error);
          set({ loading: false });
        }
      },

      addRamassage: async (ramassage) => {
        set({ loading: true });
        try {
          // In a real app, this would add to Appwrite
          // For demo purposes, we'll just add to the local state
          
          const newRamassage: Ramassage = {
            ...ramassage,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date().toISOString(),
          };
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Update parcels to associate them with this ramassage
          const { assignToRamassage } = useParcelStore.getState();
          await assignToRamassage(ramassage.parcelIds, newRamassage.id);
          
          set(state => ({
            ramassages: [...state.ramassages, newRamassage],
            loading: false,
          }));
        } catch (error) {
          console.error("Error adding ramassage:", error);
          set({ loading: false });
        }
      },

      updateRamassage: async (id, updates) => {
        set({ loading: true });
        try {
          // In a real app, this would update in Appwrite
          // For demo purposes, we'll just update the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            ramassages: state.ramassages.map(ramassage => 
              ramassage.id === id ? { ...ramassage, ...updates } : ramassage
            ),
            loading: false,
          }));
        } catch (error) {
          console.error("Error updating ramassage:", error);
          set({ loading: false });
        }
      },

      deleteRamassage: async (id) => {
        set({ loading: true });
        try {
          // In a real app, this would delete from Appwrite
          // For demo purposes, we'll just remove from the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            ramassages: state.ramassages.filter(ramassage => ramassage.id !== id),
            loading: false,
          }));
        } catch (error) {
          console.error("Error deleting ramassage:", error);
          set({ loading: false });
        }
      },

      completeRamassage: async (id) => {
        set({ loading: true });
        try {
          // In a real app, this would update in Appwrite
          // For demo purposes, we'll just update the local state
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            ramassages: state.ramassages.map(ramassage => 
              ramassage.id === id ? { ...ramassage, status: "COMPLETED" } : ramassage
            ),
            loading: false,
          }));
        } catch (error) {
          console.error("Error completing ramassage:", error);
          set({ loading: false });
        }
      },

      cancelRamassage: async (id) => {
        set({ loading: true });
        try {
          // In a real app, this would update in Appwrite
          // For demo purposes, we'll just update the local state
          
          // Get the ramassage to find its parcels
          const ramassage = get().ramassages.find(r => r.id === id);
          
          if (ramassage) {
            // Update parcels to disassociate them from this ramassage
            const { updateParcel } = useParcelStore.getState();
            for (const parcelId of ramassage.parcelIds) {
              await updateParcel(parcelId, { ramassageId: undefined, status: "EN TRANSIT" });
            }
          }
          
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set(state => ({
            ramassages: state.ramassages.map(ramassage => 
              ramassage.id === id ? { ...ramassage, status: "CANCELLED" } : ramassage
            ),
            loading: false,
          }));
        } catch (error) {
          console.error("Error cancelling ramassage:", error);
          set({ loading: false });
        }
      },
    }),
    {
      name: "ramassages-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);