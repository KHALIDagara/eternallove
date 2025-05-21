import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DollarSign, CreditCard, Bell, Settings, ChevronRight, Wallet } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRevenueStore } from "@/stores/revenue-store";

export default function RevenueScreen() {
  const { totalRevenue, pendingPayments, settings, updateSettings } = useRevenueStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings.notificationsEnabled);
  const [autoWithdraw, setAutoWithdraw] = useState(settings.autoWithdraw);

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    updateSettings({ ...settings, notificationsEnabled: value });
  };

  const handleAutoWithdrawToggle = (value: boolean) => {
    setAutoWithdraw(value);
    updateSettings({ ...settings, autoWithdraw: value });
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={["#1a73e8", "#0d47a1"]}
            style={styles.balanceGradient}
          >
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceTitle}>Total Revenue</Text>
              <DollarSign size={24} color="#fff" />
            </View>
            
            <Text style={styles.balanceAmount}>{totalRevenue.toFixed(2)} MAD</Text>
            
            <View style={styles.balanceFooter}>
              <View style={styles.pendingContainer}>
                <Text style={styles.pendingLabel}>Pending</Text>
                <Text style={styles.pendingAmount}>{pendingPayments.toFixed(2)} MAD</Text>
              </View>
              
              <TouchableOpacity style={styles.withdrawButton}>
                <Text style={styles.withdrawText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: "#e3f2fd" }]}>
              <CreditCard size={20} color="#1a73e8" />
            </View>
            <View>
              <Text style={styles.statLabel}>This Month</Text>
              <Text style={styles.statValue}>12,450.00 MAD</Text>
            </View>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: "#e8f5e9" }]}>
              <Wallet size={20} color="#2e7d32" />
            </View>
            <View>
              <Text style={styles.statLabel}>Last Month</Text>
              <Text style={styles.statValue}>9,320.00 MAD</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Settings size={18} color="#1a73e8" />
          <Text style={styles.sectionTitle}>Billing Settings</Text>
        </View>

        <View style={styles.settingsContainer}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color="#1a73e8" />
              <Text style={styles.settingText}>Payment Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: "#e0e0e0", true: "#bbdefb" }}
              thumbColor={notificationsEnabled ? "#1a73e8" : "#f5f5f5"}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Wallet size={20} color="#1a73e8" />
              <Text style={styles.settingText}>Auto Withdraw</Text>
            </View>
            <Switch
              value={autoWithdraw}
              onValueChange={handleAutoWithdrawToggle}
              trackColor={{ false: "#e0e0e0", true: "#bbdefb" }}
              thumbColor={autoWithdraw ? "#1a73e8" : "#f5f5f5"}
            />
          </View>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <CreditCard size={20} color="#1a73e8" />
              <Text style={styles.settingText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color="#757575" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <DollarSign size={18} color="#1a73e8" />
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Withdrawal</Text>
              <Text style={styles.transactionDate}>Oct 15, 2023</Text>
            </View>
            <Text style={styles.transactionAmount}>-5,000.00 MAD</Text>
          </View>
          
          <View style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Delivery Payment</Text>
              <Text style={styles.transactionDate}>Oct 12, 2023</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.incomeAmount]}>+1,250.00 MAD</Text>
          </View>
          
          <View style={styles.transaction}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionTitle}>Delivery Payment</Text>
              <Text style={styles.transactionDate}>Oct 10, 2023</Text>
            </View>
            <Text style={[styles.transactionAmount, styles.incomeAmount]}>+2,340.00 MAD</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 16,
  },
  balanceCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceGradient: {
    padding: 20,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  balanceTitle: {
    fontSize: 16,
    color: "#e1f5fe",
    fontWeight: "500",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pendingContainer: {
    
  },
  pendingLabel: {
    fontSize: 12,
    color: "#e1f5fe",
  },
  pendingAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  withdrawButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  withdrawText: {
    color: "#fff",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "#757575",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0d47a1",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d47a1",
    marginLeft: 8,
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 14,
    color: "#424242",
    marginLeft: 12,
  },
  transactionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  transactionInfo: {
    
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#424242",
  },
  transactionDate: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f44336",
  },
  incomeAmount: {
    color: "#2e7d32",
  },
});