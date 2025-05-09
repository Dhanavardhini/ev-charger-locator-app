// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export default function ChargerCard({ charger }) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.name}>{charger.name}</Text>
//       <Text style={styles.address}>{charger.address}</Text>
//       <Text style={styles.distance}>
//         {charger.distance} {charger.distance_metrics}
//       </Text>
//       <View style={styles.connectors}>
//         {charger.connector_types.map((type, index) => {
//           const [name, count] = type.split('-');
//           return (
//             <Text key={index} style={styles.connector}>
//               {name.toUpperCase()}: {count}
//             </Text>
//           );
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 12,
//     marginVertical: 8,
//     marginHorizontal: 16,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 8,
//     elevation: 2,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333'
//   },
//   address: {
//     color: '#666'
//   },
//   distance: {
//     color: '#888',
//     marginTop: 4
//   },
//   connectors: {
//     marginTop: 6,
//     flexDirection: 'row',
//     flexWrap: 'wrap'
//   },
//   connector: {
//     marginRight: 10,
//     backgroundColor: '#d1ecf1',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     fontSize: 12,
//     color: '#0c5460'
//   }
// });

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChargerCard({ charger }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{charger.name}</Text>
      <Text style={styles.address}>{charger.address}</Text>
      <Text style={styles.distance}>
        {(charger.distance / 1000).toFixed(1)} km
      </Text>
      <View style={styles.connectorRow}>
        {charger.connector_types.map((type, index) => {
          const [conn, count] = type.split('-');
          const label = {
            lvl1dc: 'Level 1 DC',
            lvl2dc: 'Level 2 DC',
            normalac: 'Normal AC',
          }[conn.toLowerCase()] || conn;

          return (
            <View key={index} style={styles.connectorItem}>
              <Ionicons name="flash" size={16} color="#00ffcc" />
              <Text style={styles.connectorText}>{label} x{count}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f1f1f',
    marginRight: 16,
    borderRadius: 20,
    padding: 16,
    width: Dimensions.get('window').width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  distance: {
    color: '#ff4da6',
    fontWeight: '600',
    marginBottom: 10,
  },
  connectorRow: {
    flexDirection: 'column',
    gap: 6,
  },
  connectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  connectorText: {
    color: '#ccc',
    marginLeft: 8,
  },
});
