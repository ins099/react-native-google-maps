// import React, {useState} from 'react';
// import {
//   TextInput,
//   TouchableOpacity,
//   Button,
//   Text,
//   View,
//   Alert,
// } from 'react-native';
// import submitUser from './src/apiService/index';
// import {database} from './src/firebase/config';

// const App = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [Id, setId] = useState();
//   const [users, setUsers] = useState([]);

//   const submitHandler = () => {
//     submitUser(Id, name, email)
//       .then(result => {
//         setId(null);
//         setName('');
//         setEmail('');
//       })
//       .catch(error => {
//         Alert.alert(error);
//       });
//   };

//   function deleteUser(item) {
//     console.log('Pressed');
//     database()
//       .ref('users/' + item.Id)
//       .remove()
//       .then(() => {})
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   //output from firebase database
//   React.useEffect(() => {
//     const userRef = database().ref('/users');
//     const OnLoadingListener = userRef.on('value', snapshot => {
//       setUsers([]);
//       snapshot.forEach(function (childSnapshot) {
//         setUsers(users => [...users, childSnapshot.val()]);
//       });
//     });
//     const childRemovedListener = userRef.on('child_removed', snapshot => {
//       // Set Your Functioanlity Whatever you want.
//       alert('Child Removed');
//     });

//     // const childChangedListener = userRef.on('child_changed', (snapshot) => {
//     //   // Set Your Functioanlity Whatever you want.
//     //   alert('Child Updated/Changed');
//     // });

//     return () => {
//       userRef.off('value', OnLoadingListener);
//       userRef.off('child_removed', childRemovedListener);
//       // userRef.off('child_changed', childChangedListener);
//     };
//   }, []);

//   return (
//     <View>
//       <Text>This is Data Base App</Text>
//       <TextInput
//         placeholder="name"
//         value={name}
//         onChangeText={text => setName(text)}
//       />
//       <TextInput
//         placeholder="email"
//         value={email}
//         onChangeText={text => setEmail(text)}
//       />

//       <Button title="Submit" onPress={submitHandler} />

//       {users.map((item, key) => {
//         console.log();
//         return (
//           <View key={key}>
//             <TouchableOpacity
//               onPress={() => {
//                 deleteUser(item);
//               }}>
//               <Text>
//                 {'Name:'}
//                 {item.Name}
//                 {'Email:'}
//                 {item.Email}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// export default App;

//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, {useState} from 'react';
// import {View, StyleSheet, Text, TextInput, Button, Linking} from 'react-native';

// const App = () => {
//   let [msg, setMsg] = useState('');
//   let [mobile, setMobile] = useState(3360039055);
//   openWhatsApp = () => {
//     if (mobile) {
//       if (msg) {
//         let url = 'whatsapp://send?text=' + msg + '&phone=92' + mobile;
//         Linking.openURL(url)
//           .then(data => {
//             console.log('WhatsApp Opened successfully ' + data);
//           })
//           .catch(() => {
//             alert('Make sure WhatsApp installed on your device');
//           });
//       } else {
//         alert('Please enter message to send');
//       }
//     } else {
//       alert('Please enter mobile no');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={{textAlign: 'center', fontSize: 20, paddingVertical: 30}}>
//         Open WhatsApp chat box from React-native App
//       </Text>

//       <TextInput
//         value={msg}
//         onChangeText={message => setMsg({message})}
//         placeholder={'Enter message'}
//         multiline={true}
//         style={[styles.input, {height: 90}]}
//       />

//       <TextInput
//         value={mobile}
//         onChangeText={mobileNo => setMobile(mobileNo)}
//         placeholder={'Enter Mobile'}
//         style={styles.input}
//         keyboardType={'numeric'}
//       />
//       <View style={{marginTop: 20}}>
//         <Button onPress={openWhatsApp} title="Open WhatsApp message" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 30,
//     backgroundColor: '#ffffff',
//   },
//   input: {
//     width: 255,
//     height: 44,
//     padding: 10,
//     margin: 10,
//     backgroundColor: '#FFF',
//     borderColor: '#000',
//     borderRadius: 0.5,
//     borderWidth: 0.5,
//   },
// });

// export default App;
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {mapStyle} from './src/mapStyle';
const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude),
          setLongitude(position.coords.longitude);
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
  }, [1]);

  return (
    <View>
      <Text>This is APP</Text>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapStyle}
          style={[{flex: 1}, styles.container]}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}></Marker>
        </MapView>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
