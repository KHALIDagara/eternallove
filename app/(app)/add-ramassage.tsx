import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { X, Box, Check, Search, Package } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRamassageStore } from "@/stores/ramassage-store";
import { useParcelStore } from "@/stores/parcel-store";
import { Ramassage } from "@/types";
import { CITIES } from "@/constants/cities";
import Dropdown from "@/components/Dropdown";

export default function AddRamassageScreen() {
  const router = useRouter();
  const { addRamassage } = useRamassageStore();
  const { parcels } = useParcelStore();
  
  const [fornisseurName, setFornisseurName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedParcels, setSelectedParcels] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter parcels that are in transit and not assigned to any ramassage
  const availableParcels = parcels.filter(
    parcel => parcel.status === "EN TRANSIT" && !parcel.ramassageId
  );

  const filteredParcels = availableParcels.filter(
    parcel => 
      parcel.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parcel.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!fornisseurName) newErrors.fornisseurName = "Supplier name is required";
    if (!city) newErrors.city = "City is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Invalid phone number";
    if (!address) newErrors.address = "Address is required";
    if (selectedParcels.length === 0) newErrors.parcels = "Select at least one parcel";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleParcelSelection = (parcelId: string) => {
    if (selectedParcels.includes(parcelId)) {
      setSelectedParcels(selectedParcels.filter(id => id !== parcelId));
    } else {
      setSelectedParcels([...selectedParcels, parcelId]);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    const newRamassage: Omit<Ramassage, "id" | "createdAt"> = {
      fornisseurName,
      city,
      phone,
      address,
      notes,
      parcelIds: selectedParcels,
      status: "PENDING",
    };
    
    addRamassage(newRamassage);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <LinearGradient
          colors={["#1a73e8", "#0d47a1"]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <X size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
              <Box size={24} color="#fff" />
              <Text style={styles.headerTitle}>New Pickup Request</Text>
            </View>
            
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
            >
              <Check size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent}>
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Supplier Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Supplier Name</Text>
              <TextInput
                style={[styles.input, errors.fornisseurName && styles.inputError]}
                value={fornisseurName}
                onChangeText={setFornisseurName}
                placeholder="Enter supplier name"
              />
              {errors.fornisseurName && <Text style={styles.errorText}>{errors.fornisseurName}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>City</Text>
              <Dropdown
                data={CITIES}
                value={city}
                onChange={setCity}
                placeholder="Select city"
                error={errors.city}
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, errors.address && styles.inputError, styles.textArea]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter pickup address"
                multiline
                numberOfLines={3}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Notes (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="Enter any additional notes"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Select Parcels</Text>
            
            <View style={styles.searchContainer}>
              <Search size={20} color="#757575" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search parcels by client or product"
              />
            </View>
            
            {errors.parcels && <Text style={styles.errorText}>{errors.parcels}</Text>}
            
            <View style={styles.parcelsList}>
              {filteredParcels.length === 0 ? (
                <View style={styles.emptyParcels}>
                  <Package size={40} color="#1a73e8" />
                  <Text style={styles.emptyParcelsText}>No available parcels found</Text>
                  <Text style={styles.emptyParcelsSubtext}>
                    Add parcels first or check if they are already assigned
                  </Text>
                </View>
              ) : (
                filteredParcels.map(parcel => (
                  <TouchableOpacity
                    key={parcel.id}
                    style={[
                      styles.parcelItem,
                      selectedParcels.includes(parcel.id) && styles.selectedParcel
                    ]}
                    onPress={() => toggleParcelSelection(parcel.id)}
                  >
                    <View style={styles.parcelInfo}>
                      <Text style={styles.parcelClient}>{parcel.clientName}</Text>
                      <Text style={styles.parcelProduct}>{parcel.productName}</Text>
                      <Text style={styles.parcelCity}>{parcel.city}</Text>
                    </View>
                    <View style={styles.parcelPrice}>
                      <Text style={styles.parcelPriceText}>{parcel.price} MAD</Text>
                      {selectedParcels.includes(parcel.id) && (
                        <View style={styles.checkmark}>
                          <Check size={16} color="#fff" />
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#1a73e8", "#0d47a1"]}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>Create Pickup Request</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 8,
  },
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    padding: 16,
    paddingBottom: 40,
  },
  formSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#212121",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#f44336",
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#212121",
  },
  parcelsList: {
    marginBottom: 8,
  },
  parcelItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedParcel: {
    borderColor: "#1a73e8",
    backgroundColor: "#e3f2fd",
  },
  parcelInfo: {
    flex: 1,
  },
  parcelClient: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212121",
  },
  parcelProduct: {
    fontSize: 13,
    color: "#424242",
    marginTop: 2,
  },
  parcelCity: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },
  parcelPrice: {
    alignItems: "flex-end",
  },
  parcelPriceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1a73e8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  emptyParcels: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyParcelsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1a73e8",
    marginTop: 12,
  },
  emptyParcelsSubtext: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginTop: 8,
  },
  submitButton: {
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});