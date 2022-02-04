import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { Platform, Text } from "react-native";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealsDetailScreen from "../screens/MealsDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import  Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : ""
  },
  headerTitleStyle: {
      fontFamily: "open-sans-bold"
  },
  headerBackTitleStyle: {
         fontFamily: "open-sans"
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  headerTitle: "A Screen"
};

const MealsNavigator = createStackNavigator({
  Categories: { 
    screen: CategoriesScreen,
    navigationOptions: {
      headerTitle: "Meals Categories",
    }},
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealsDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
});


const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealsDetailScreen, 
},{
   defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
  Meals: { 
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
         return (
         <Ionicons name="ios-restaurant" 
         size={25} 
         color={tabInfo.tintColor} />
         );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: Platform.OS === "android" 
      ? <Text style={{fontFamily: "open-sans-bold"}}>Meals</Text>
      : "Meals"
    }
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return <Ionicons name="ios-star" 
        size={25} 
        color={tabInfo.tintColor} />;
     },
     tabBarColor: Colors.accentColor,
     tabBarLabel: Platform.OS === "android" 
      ? <Text style={{fontFamily: "open-sans-bold"}}>Favorites</Text>
      : "Favorites"
    }
  }
};

const MealsFavTabNavigator = 
Platform.OS === "android" 
? createMaterialBottomTabNavigator(tabScreenConfig, {
  activeTintColor: "white",
  shifting: true,
  barStyle: {
    backgroundColor: Colors.primaryColor
  },
}) : 
createBottomTabNavigator(tabScreenConfig,
    {
  tabBarOptions: {
    labelStyle: {
      fontFamily: "open-sans"
    },
    activeTintColor: Colors.accentColor
}
});

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen
}, {
  /*navigationOptions: {
    drawerLabel: "Filter!!!"
  },*/
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
  MealsFavs: { screen: MealsFavTabNavigator,
  navigationOptions: {
    drawerLabel: "Meals" 
  },
  contentOptions: {
    labelStyle: {
      marginTop: 50
    }
  }},
  Filters: FiltersNavigator
}, {
  contentOptions: {
    activeTintColor: Colors.accentColor,
    labelStyle: {
      marginTop: 50,
      fontFamily: "open-sans-bold"

    }
  
  }
});

export default createAppContainer(MainNavigator);



