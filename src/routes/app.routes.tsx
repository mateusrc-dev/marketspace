import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { AnnouncementDetails } from "@screens/AnnouncementDetails";
import { CreateAd } from "@screens/CreateAd";
import { EditAd } from "@screens/EditAd";
import { MyAds } from "@screens/MyAds";
import { MyAdDetails } from "@screens/MyAdDetails";
import { Logout } from "@screens/Logout";
import { useTheme } from "native-base";
import { House, Tag, SignOut } from "phosphor-react-native";

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  logout: undefined;
  adDetails: undefined;
  createAd: undefined;
  myAdDetails: undefined;
  editAd: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House weight={focused ? "bold" : "regular"} size={iconSize} color={color} />
          ),
        }}
      />
      <Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag weight={focused ? "bold" : "regular"} size={iconSize} color={color} />
          ),
        }}
      />
      <Screen
        name="logout"
        component={Logout}
        options={{
          tabBarIcon: () => (
            <SignOut weight="regular" size={iconSize} color={colors.red[100]} />
          ),
        }}
      />
      <Screen name="adDetails" component={AnnouncementDetails} />
      <Screen name="createAd" component={CreateAd} />
      <Screen name="myAdDetails" component={MyAdDetails} />
      <Screen name="editAd" component={EditAd} />
    </Navigator>
  );
}
