import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, Filter, Package, TrendingUp, TrendingDown, Clock } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useParcelStore } from "@/stores/parcel-store";
import ParcelCard from "@/components/ParcelCard";
import FilterModal from "@/components/FilterModal";

export default function ParcelsScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [refreshing, setRefreshing] = useState(false);
  const { parcels, loading, fetchParcels } = useParcelStore();
  const router = useRouter();

  useEffect(() => {
    fetchParcels();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchParcels();
    setRefreshing(false);
  };

  const filteredParcels = parcels.filter(parcel => {
    if (activeFilter === "ALL") return true;
    return parcel.status === activeFilter;
  });

  // Calculate stats
  const totalParcels = parcels.length;
  const inTransit = parcels.filter(p => p.status === "EN TRANSIT").length;
  const inDelivery = parcels.filter(p => p.status === "EN COURS DE LIVRAISON").length;
  const returned = parcels.filter(p => p.status === "RETOUR").length;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Filter size={20} color="#1a73e8" />
          <Text style={styles.filterText}>
            {activeFilter === "ALL" ? "All Parcels" : activeFilter}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push("/add-parcel")}
        >
          <LinearGradient
            colors={["#1a73e8", "#0d47a1"]}
            style={styles.addButtonGradient}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add New</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
          <Text style={styles.loadingText}>Loading parcels...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredParcels}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ParcelCard parcel={item} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#1a73e8"]} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Package size={60} color="#1a73e8" />
              <Text style={styles.emptyText}>No parcels found</Text>
              <Text style={styles.emptySubtext}>
                {activeFilter === "ALL" 
                  ? "Add your first parcel to get started" 
                  : "No parcels with this status"}
              </Text>
            </View>
          }
        />
      )}

      <View style={styles.statsContainer}>
        <LinearGradient
          colors={["#f5f9ff", "#e1f5fe"]}
          style={styles.statsGradient}
        >
          <Text style={styles.statsTitle}>Delivery Statistics</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Package size={18} color="#1a73e8" />
              </View>
              <View>
                <Text style={styles.statValue}>{totalParcels}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: "#e3f2fd" }]}>
                <Clock size={18} color="#0d47a1" />
              </View>
              <View>
                <Text style={styles.statValue}>{inTransit}</Text>
                <Text style={styles.statLabel}>In Transit</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: "#e8f5e9" }]}>
                <TrendingUp size={18} color="#2e7d32" />
              </View>
              <View>
                <Text style={styles.statValue}>{inDelivery}</Text>
                <Text style={styles.statLabel}>Delivering</Text>
              </View>
            </View>
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: "#ffebee" }]}>
                <TrendingDown size={18} color="#c62828" />
              </View>
              <View>
                <Text style={styles.statValue}>{returned}</Text>
                <Text style={styles.statLabel}>Returned</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    marginLeft: 6,
    color: "#1a73e8",
    fontWeight: "500",
  },
  addButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 6,
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#757575",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a73e8",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginTop: 8,
  },
  statsContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  statsGradient: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  statLabel: {
    fontSize: 12,
    color: "#757575",
  },
});