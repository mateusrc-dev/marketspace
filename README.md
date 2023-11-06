# Marketspace - project is part of a challenge on Rocketseat's Ignite ReactNative trail 🚀

### 💻 In this project we apply knowledge about native-base - NativeBase is a library of customizable components that we can use in our application and save time

### ➡️ This application consists of an e-commerce where the user can create their account, log in, and register their products and view other user's products. When adding a product, the user can add photos of the product, description, enter payment methods, specify whether the product is new or used, etc.

➡️ To create this application, use NativeBase to create the interfaces. Some components we used in NativeBase were: Center, Spinner, View, StatusBar, Image, Text, Heading, VStack, HStack, Input, Pressable, SectionList, Skeleton, ScrollView, etc.

### 💻 Some libraries used in the application:

- react-navigation/bottom-tabs -> this lib is important because with them we create navigation with a manu at the bottom of the application - in this menu we place the routes to the home page, my ads and logout
- react-navigation/native-stack -> this lib is very important because with it we create the application routes - both the authentication routes and the app routes
- native-base -> is a library of customizable components that we can use in our application and save time
- phosphor-react-native -> lib with icon packs to be used in the interface
- react-native-app-intro-slider -> this lib is very important because with it we create the product image slider when the user clicks on an ad to see the product details or when the user previews your product before to publish it on the platform
- async-storage -> to store user data on the device itself
- axios -> to make requests to the API
- expo-file-system -> we can use this library to obtain information from a file on the user's device, regardless of whether the system is IOS or ANDROID
- expo-image-picker -> to be able to choose images from the device gallery
- moment -> lib to handle data
- react-hook-form -> to be able to get the data from the inputs at the same time when the submit button is clicked, add rules for these fields, put default values ​​in the fields, catch errors when the data entered is not valid - instead of creating a state for each input
- react-native-safe-area-context -> so that interface components/elements are in safe spaces on the device so as not to run the risk of being hidden
- yup - to create the schema -> schema is a model of our form (set of inputs) that we will use to define what the fields are and the validation rules for those fields

### To use the application on your PC, download the repository, then run the command 'npm run start' in the repository terminal (note. when executing this command it is important that the Android emulator is activated (Android Studio))
