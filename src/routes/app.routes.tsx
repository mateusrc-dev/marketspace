import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";
import { AnnouncementDetails } from "@screens/AnnouncementDetails";
import { CreateAd } from "@screens/CreateAd";
import { EditAd } from "@screens/EditAd";
import { MyAds } from "@screens/MyAds";
import { MyAdDetails } from "@screens/MyAdDetails";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  return (
      <Navigator>
        <Screen name="home" component={Home} />
        <Screen name="adDetails" component={AnnouncementDetails} />
        <Screen name="myAds" component={MyAds} />
        <Screen name="createAd" component={CreateAd} />
        <Screen name="myAdDetails" component={MyAdDetails} />
        <Screen name="editAd" component={EditAd} />
      </Navigator>
    )
}
