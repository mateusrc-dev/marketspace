import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
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
};

type AppRoutesTwo = {
  Home: undefined;
  adDetails: undefined;
  createAd: undefined;
  myAdDetails: undefined;
  editAd: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;
export type AppNavigatorRoutesPropsTwo =
  NativeStackNavigationProp<AppRoutesTwo>;

const Tab = createBottomTabNavigator<AppRoutes>();
const Stack = createNativeStackNavigator<AppRoutesTwo>();

function HomeTabs() {
  const { sizes, colors } = useTheme();
  const iconSize = sizes[6];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          paddingBottom: sizes[5],
          paddingTop: sizes[5],
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              weight={focused ? "bold" : "regular"}
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="myAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              weight={focused ? "bold" : "regular"}
              size={iconSize}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="logout"
        component={Logout}
        options={{
          tabBarIcon: () => (
            <SignOut weight="regular" size={iconSize} color={colors.red[100]} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="adDetails" component={AnnouncementDetails} />
        <Stack.Screen name="createAd" component={CreateAd} />
        <Stack.Screen name="myAdDetails" component={MyAdDetails} />
        <Stack.Screen name="editAd" component={EditAd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
