// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   FlatList,
//   PermissionsAndroid,
//   Platform,
//   Alert,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as MediaLibrary from 'expo-media-library';
// import ViewShot from 'react-native-view-shot';
// import { FAB } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const dummyChargers = [
//   {
//     id: '1',
//     name: 'EV Charger 1',
//     latitude: 37.78825,
//     longitude: -122.4324,
//     distance: '2.5 km',
//     connector: 'DC Fast',
//   },
//   {
//     id: '2',
//     name: 'EV Charger 2',
//     latitude: 37.78925,
//     longitude: -122.4314,
//     distance: '1.8 km',
//     connector: 'AC Type 2',
//   },
// ];

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [status, requestPermission] = MediaLibrary.usePermissions();
//   const viewShotRef = useRef();

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Location access is required.');
//         return;
//       }

//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);

//       // Ask for media library permission
//       if (!status?.granted) {
//         await requestPermission();
//       }
//     })();
//   }, []);

//   const captureMap = async () => {
//     try {
//       const uri = await viewShotRef.current.capture();

//       const asset = await MediaLibrary.createAssetAsync(uri);
//       await MediaLibrary.createAlbumAsync('EV Charger Maps', asset, false);

//       Alert.alert('Saved!', 'Screenshot saved to gallery.');
//     } catch (error) {
//       Alert.alert('Error', 'Could not save screenshot.');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {location && (
//         <ViewShot ref={viewShotRef} style={styles.mapContainer} options={{ format: 'png', quality: 1.0 }}>
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             }}
//           >
//             <Marker coordinate={location}>
//               <View style={styles.pinkDot} />
//             </Marker>

//             {dummyChargers.map((charger) => (
//               <Marker
//                 key={charger.id}
//                 coordinate={{
//                   latitude: charger.latitude,
//                   longitude: charger.longitude,
//                 }}
//                 title={charger.name}
//               />
//             ))}
//           </MapView>

//           {/* Top Search Bar */}
//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={20} color="#ccc" style={{ marginRight: 8 }} />
//             <TextInput
//               placeholder="Search compatible chargers"
//               placeholderTextColor="#ccc"
//               style={styles.searchInput}
//             />
//             <Ionicons name="options" size={20} color="#ccc" />
//           </View>
//         </ViewShot>
//       )}

//       {/* Bottom Charger Cards */}
//       <FlatList
//         data={dummyChargers}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.cardContainer}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardDetail}>Distance: {item.distance}</Text>
//             <Text style={styles.cardDetail}>Connector: {item.connector}</Text>
//           </View>
//         )}
//       />

//       {/* Screenshot Button */}
//       <FAB icon="camera" style={styles.fab} onPress={captureMap} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   mapContainer: { flex: 1 },
//   map: { flex: 1 },
//   pinkDot: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#ff4da6',
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: '#fff',
//   },
//   searchBar: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     backgroundColor: '#2c2c2e',
//     borderRadius: 12,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 999,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//   },
//   cardContainer: {
//     position: 'absolute',
//     bottom: 20,
//     paddingHorizontal: 10,
//   },
//   card: {
//     backgroundColor: '#1e1e1e',
//     padding: 15,
//     borderRadius: 16,
//     marginRight: 12,
//     width: width * 0.7,
//   },
//   cardTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cardDetail: {
//     color: '#ccc',
//     marginTop: 5,
//   },
//   fab: {
//     position: 'absolute',
//     right: 20,
//     bottom: 100,
//     backgroundColor: '#ff4da6',
//   },
// });
// --------------------
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   FlatList,
//   Alert,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import * as MediaLibrary from 'expo-media-library';
// import ViewShot from 'react-native-view-shot';
// import { FAB } from 'react-native-paper';
// import { Ionicons } from '@expo/vector-icons';
// import * as WebBrowser from 'expo-web-browser';
// import {
//   useAuthRequest,
//   makeRedirectUri,
//   ResponseType,
// } from 'expo-auth-session';
// import axios from 'axios';

// WebBrowser.maybeCompleteAuthSession();

// const { width } = Dimensions.get('window');

// // Dummy charger data
// const dummyChargers = [
//   {
//     id: '1',
//     name: 'EV Charger 1',
//     latitude: 37.78825,
//     longitude: -122.4324,
//     distance: '2.5 km',
//     connector: 'DC Fast',
//   },
//   {
//     id: '2',
//     name: 'EV Charger 2',
//     latitude: 37.78925,
//     longitude: -122.4314,
//     distance: '1.8 km',
//     connector: 'AC Type 2',
//   },
// ];

// // Replace this with your own Google Web Client ID
// const CLIENT_ID = '376644645436-su8td6k2n06lf6jfe2sqv59f4b749d7b.apps.googleusercontent.com';

// // Generates a proxy-safe redirect URI for Expo
// const REDIRECT_URI = makeRedirectUri({ useProxy: true });

// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//   tokenEndpoint: 'https://oauth2.googleapis.com/token',
// };

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [status, requestPermission] = MediaLibrary.usePermissions();
//   const [accessToken, setAccessToken] = useState(null);
//   const viewShotRef = useRef();

//   // Authorization request and response
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       scopes: SCOPES,
//       redirectUri: REDIRECT_URI,
//       responseType: ResponseType.Token,
//       usePKCE: false, // Disable PKCE to avoid code_challenge_method issue
//     },
//     discovery
//   );

//   useEffect(() => {
//     (async () => {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Location access is required.');
//         return;
//       }

//       const loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);

//       if (!status?.granted) {
//         await requestPermission();
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { access_token } = response.params;
//       setAccessToken(access_token);
//     }
//   }, [response]);

//   const signInWithGoogle = async () => {
//     if (!accessToken) {
//       const result = await promptAsync({ useProxy: true });
//       if (result.type !== 'success') throw new Error('Authentication failed');
//     }
//     return accessToken;
//   };

//   const uploadToDrive = async (uri) => {
//     try {
//       const token = await signInWithGoogle();
//       const fileName = 'ev_map_screenshot.jpg';

//       const formData = new FormData();
//       formData.append(
//         'metadata',
//         new Blob(
//           [JSON.stringify({ name: fileName, mimeType: 'image/jpeg' })],
//           { type: 'application/json' }
//         )
//       );
//       formData.append('file', {
//         uri,
//         name: fileName,
//         type: 'image/jpeg',
//       });

//       await axios.post(
//         'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       Alert.alert('Success', 'Screenshot uploaded to Google Drive!');
//     } catch (error) {
//       console.error('Drive upload failed:', error);
//       Alert.alert('Error', 'Failed to upload to Google Drive.');
//     }
//   };

//   const captureMap = async () => {
//     try {
//       if (!viewShotRef.current) {
//         Alert.alert('Map not ready');
//         return;
//       }

//       const uri = await viewShotRef.current.capture({
//         format: 'jpg',
//         quality: 1.0,
//       });

//       const asset = await MediaLibrary.createAssetAsync(uri);
//       await MediaLibrary.createAlbumAsync('EV Charger Maps', asset, false);

//       Alert.alert('Saved!', 'Screenshot saved to gallery.');

//       await uploadToDrive(uri);
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Could not save or upload screenshot.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {location && (
//         <ViewShot
//           ref={viewShotRef}
//           style={styles.mapContainer}
//           options={{ format: 'jpg', quality: 1.0 }}
//         >
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//               latitudeDelta: 0.01,
//               longitudeDelta: 0.01,
//             }}
//           >
//             <Marker coordinate={location}>
//               <View style={styles.pinkDot} />
//             </Marker>
//             {dummyChargers.map((charger) => (
//               <Marker
//                 key={charger.id}
//                 coordinate={{
//                   latitude: charger.latitude,
//                   longitude: charger.longitude,
//                 }}
//                 title={charger.name}
//               />
//             ))}
//           </MapView>

//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={20} color="#ccc" style={{ marginRight: 8 }} />
//             <TextInput
//               placeholder="Search compatible chargers"
//               placeholderTextColor="#ccc"
//               style={styles.searchInput}
//             />
//             <Ionicons name="options" size={20} color="#ccc" />
//           </View>
//         </ViewShot>
//       )}

//       <FlatList
//         data={dummyChargers}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.cardContainer}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text style={styles.cardDetail}>Distance: {item.distance}</Text>
//             <Text style={styles.cardDetail}>Connector: {item.connector}</Text>
//           </View>
//         )}
//       />

//       <FAB icon="camera" style={styles.fab} onPress={captureMap} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#000' },
//   mapContainer: { flex: 1 },
//   map: { flex: 1 },
//   pinkDot: {
//     width: 20,
//     height: 20,
//     backgroundColor: '#ff4da6',
//     borderRadius: 10,
//     borderWidth: 3,
//     borderColor: '#fff',
//   },
//   searchBar: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     right: 20,
//     backgroundColor: '#2c2c2e',
//     borderRadius: 12,
//     padding: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     zIndex: 999,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 16,
//   },
//   cardContainer: {
//     position: 'absolute',
//     bottom: 20,
//     paddingHorizontal: 10,
//   },
//   card: {
//     backgroundColor: '#1e1e1e',
//     padding: 15,
//     borderRadius: 16,
//     marginRight: 12,
//     width: width * 0.7,
//   },
//   cardTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cardDetail: {
//     color: '#ccc',
//     marginTop: 5,
//   },
//   fab: {
//     position: 'absolute',
//     right: 20,
//     bottom: 100,
//     backgroundColor: '#ff4da6',
//   },
// });

import React from 'react';
import MainApp from './src/components/MainApp';

export default function App() {
  return <MainApp />;
}
