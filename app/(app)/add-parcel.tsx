import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { X, Package, Check } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useParcelStore } from "@/stores/parcel-store";
import { Parcel } from "@/types";
import { CITIES } from "@/constants/cities";
import Dropdown from "@/components/Dropdown";

export default function AddParcelScreen() {
  const router = useRouter();
  const { addParcel } = useParcelStore();
  
  const [clientName, setClientName] = useState("");
  const [productName, setProductName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [price, setPrice] = useState("");
  const [isAllowedToOpen, setIsAllowedToOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!clientName) newErrors.clientName = "Client name is required";
    if (!productName) newErrors.productName = "Product name is required";
    if (!city) newErrors.city = "City is required";
    if (!price) newErrors.price = "Price is required";
    else if (isNaN(Number(price))) newErrors.price = "Price must be a number";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Invalid phone number";
    if (!address) newErrors.address = "Address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    
    const newParcel: Omit<Parcel, "id" | "createdAt"> = {
      clientName,
      productName,
      city,
      notes,
      price: Number(price),
      isAllowedToOpen,
      phone,
      address,
      status: "EN TRANSIT",
    };
    
    addParcel(newParcel);
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
              <Package size={24} color="#fff" />
              <Text style={styles.headerTitle}>Add New Parcel</Text>
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
            <Text style={styles.sectionTitle}>Client Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Client Name</Text>
              <TextInput
                style={[styles.input, errors.clientName && styles.inputError]}
                value={clientName}
                onChangeText={setClientName}
                placeholder="Enter client name"
              />
              {errors.clientName && <Text style={styles.errorText}>{errors.clientName}</Text>}
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
                placeholder="Enter delivery address"
                multiline
                numberOfLines={3}
              />
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Product Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Product Name</Text>
              <TextInput
                style={[styles.input, errors.productName && styles.inputError]}
                value={productName}
                onChangeText={setProductName}
                placeholder="Enter product name"
              />
              {errors.productName && <Text style={styles.errorText}>{errors.productName}</Text>}
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Price (MAD)</Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                keyboardType="numeric"
              />
              {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
            </View>
            
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Allow Package Opening</Text>
              <Switch
                value={isAllowedToOpen}
                onValueChange={setIsAllowedToOpen}
                trackColor={{ false: "#e0e0e0", true: "#bbdefb" }}
                thumbColor={isAllowedToOpen ? "#1a73e8" : "#f5f5f5"}
              />
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
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <LinearGradient
              colors={["#1a73e8", "#0d47a1"]}
              style={styles.submitGradient}
            >
              <Text style={styles.submitText}>Create Parcel</Text>
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: "#424242",
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