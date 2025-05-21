import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Box, Package, DollarSign } from "lucide-react-native";
import { View, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1a73e8",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        header: ({ options }) => {
          return (
            <LinearGradient
              colors={["#1a73e8", "#0d47a1"]}
              style={{
                height: 100,
                paddingTop: 50,
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {options.headerTitle && (
                  <View style={{ flex: 1 }}>
                    {typeof options.headerTitle === "string" ? (
                      <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                          {options.tabBarIcon && options.tabBarIcon({ color: "#fff", size: 24, focused: true })}
                          <View style={{ marginLeft: 10 }}>
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                              {options.headerTitle}
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : (
                      options.headerTitle({ children: "", tintColor: "#fff" })
                    )}
                  </View>
                )}
                {options.headerRight && options.headerRight({ tintColor: "#fff", canGoBack: false })}
              </View>
            </LinearGradient>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Parcels",
          headerTitle: "Parcels Management",
          tabBarIcon: ({ color, size }) => <Package size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ramassages"
        options={{
          title: "Pickups",
          headerTitle: "Pickups Management",
          tabBarIcon: ({ color, size }) => <Box size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="revenue"
        options={{
          title: "Revenue",
          headerTitle: "Revenue & Billing",
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}