// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import { Ionicons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// const dummyChargers = [
//   {
//     id: '1',
//     name: 'EV Station A',
//     address: '123 Main St',
//     distance: 1200,
//     latitude: 37.78825,
//     longitude: -122.4324,
//     connector_types: ['normalac-2', 'lvl2dc-1'],
//   },
//   {
//     id: '2',
//     name: 'Charge Hub B',
//     address: '456 Second St',
//     distance: 2400,
//     latitude: 37.78925,
//     longitude: -122.4314,
//     connector_types: ['lvl1dc-1', 'normalac-1'],
//   },
// ];

// const HomeScreen = () => {
//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') return;
//       let loc = await Location.getCurrentPositionAsync({});
//       setLocation(loc.coords);
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={StyleSheet.absoluteFillObject}
//         region={{
//           latitude: location?.latitude || 37.78825,
//           longitude: location?.longitude || -122.4324,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}
//       >
//         {location && (
//           <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }}>
//             <View style={styles.pinkDotOuter}>
//               <View style={styles.pinkDotInner} />
//             </View>
//           </Marker>
//         )}
//         {dummyChargers.map((charger) => (
//           <Marker
//             key={charger.id}
//             coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
//           >
//             <Ionicons name="flash" size={28} color="#00ffcc" />
//           </Marker>
//         ))}
//       </MapView>

//       {/* Floating Search Bar */}
//       <View style={styles.searchBar}>
//         <Ionicons name="search" size={20} color="#ccc" style={{ marginRight: 8 }} />
//         <TextInput
//           placeholder="Search for the compatible chargers"
//           placeholderTextColor="#ccc"
//           style={styles.searchInput}
//         />
//         <Ionicons name="options" size={20} color="#ccc" />
//       </View>

//       {/* Charger Cards */}
//       <View style={styles.cardList}>
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={dummyChargers}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.card}>
//               <Text style={styles.cardTitle}>{item.name}</Text>
//               <Text style={styles.cardSubtitle}>{item.address}</Text>
//               <Text style={styles.distance}>{(item.distance / 1000).toFixed(1)} km</Text>

//               <View style={styles.connectorRow}>
//                 {item.connector_types.map((type, index) => {
//                   const [conn, count] = type.split('-');
//                   const label = {
//                     lvl1dc: 'Level 1 DC',
//                     lvl2dc: 'Level 2 DC',
//                     normalac: 'Normal AC',
//                   }[conn.toLowerCase()] || conn;

//                   return (
//                     <View key={index} style={styles.connectorItem}>
//                       <Ionicons name="flash" size={16} color="#00ffcc" />
//                       <Text style={styles.connectorText}>{label} x{count}</Text>
//                     </View>
//                   );
//                 })}
//               </View>
//             </View>
//           )}
//         />
//       </View>
//     </View>
//   );
// };

// export default HomeScreen;

import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import { FAB } from 'react-native-paper';
import ChargerCard from '../components/ChargerCard';
import { dummyChargers } from '../data/chargers';
import useGoogleDriveAuth from '../hooks/useGoogleDriveAuth';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const viewShotRef = useRef();
  const { captureAndUpload } = useGoogleDriveAuth(viewShotRef);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <ViewShot ref={viewShotRef} style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker coordinate={location}>
              <View style={styles.pinkDotOuter}>
                <View style={styles.pinkDotInner} />
              </View>
            </Marker>
            {dummyChargers.map((charger) => (
              <Marker
                key={charger.id}
                coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
              >
                <Ionicons name="flash" size={28} color="#00ffcc" />
              </Marker>
            ))}
          </MapView>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#ccc" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search for compatible chargers"
              placeholderTextColor="#ccc"
              style={styles.searchInput}
            />
            <Ionicons name="options" size={20} color="#ccc" />
          </View>
        </ViewShot>
      )}

      <FlatList
        data={dummyChargers}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
        renderItem={({ item }) => <ChargerCard charger={item} />}
      />

      <FAB icon="camera" style={styles.fab} onPress={captureAndUpload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  mapContainer: { flex: 1 },

  pinkDotOuter: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255, 77, 166, 0.3)',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkDotInner: {
    width: 16,
    height: 16,
    backgroundColor: '#ff4da6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },

  searchBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },

  cardList: {
    position: 'absolute',
    bottom: 16,
    paddingLeft: 16,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: '#ff4da6',
  },
});

