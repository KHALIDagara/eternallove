import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, Box, MapPin } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRamassageStore } from "@/stores/ramassage-store";
import RamassageCard from "@/components/RamassageCard";

export default function RamassagesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { ramassages, loading, fetchRamassages } = useRamassageStore();
  const router = useRouter();

  useEffect(() => {
    fetchRamassages();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRamassages();
    setRefreshing(false);
  };

  // Group ramassages by city
  const ramassagesByCity = ramassages.reduce((acc, ramassage) => {
    if (!acc[ramassage.city]) {
      acc[ramassage.city] = [];
    }
    acc[ramassage.city].push(ramassage);
    return acc;
  }, {} as Record<string, typeof ramassages>);

  const cities = Object.keys(ramassagesByCity);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {ramassages.length} Pickups Available
        </Text>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push("/add-ramassage")}
        >
          <LinearGradient
            colors={["#1a73e8", "#0d47a1"]}
            style={styles.addButtonGradient}
          >
            <Plus size={20} color="#fff" />
            <Text style={styles.addButtonText}>New Pickup</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a73e8" />
          <Text style={styles.loadingText}>Loading pickups...</Text>
        </View>
      ) : (
        <FlatList
          data={cities}
          keyExtractor={(item) => item}
          renderItem={({ item: city }) => (
            <View style={styles.citySection}>
              <View style={styles.cityHeader}>
                <MapPin size={18} color="#1a73e8" />
                <Text style={styles.cityName}>{city}</Text>
                <View style={styles.cityCount}>
                  <Text style={styles.cityCountText}>{ramassagesByCity[city].length}</Text>
                </View>
              </View>
              
              {ramassagesByCity[city].map((ramassage) => (
                <RamassageCard key={ramassage.id} ramassage={ramassage} />
              ))}
            </View>
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#1a73e8"]} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Box size={60} color="#1a73e8" />
              <Text style={styles.emptyText}>No pickups found</Text>
              <Text style={styles.emptySubtext}>
                Create your first pickup request
              </Text>
            </View>
          }
        />
      )}
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
  headerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#424242",
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
  citySection: {
    marginBottom: 20,
  },
  cityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cityName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a73e8",
    marginLeft: 6,
  },
  cityCount: {
    backgroundColor: "#e3f2fd",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  cityCountText: {
    fontSize: 12,
    color: "#0d47a1",
    fontWeight: "bold",
  },
});