import { useAuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import { Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '537382059905-6cadmq1c0d61m95qii3t9i6djm3js02l.apps.googleusercontent.com';
const REDIRECT_URI = makeRedirectUri({ useProxy: true });
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
// 376644645436-su8td6k2n06lf6jfe2sqv59f4b749d7b.apps.googleusercontent.com
// 376644645436-a25f4f6jcrn3fg0pklt19uvema5vq806.apps.googleusercontent.com
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
};

export default function useGoogleDriveAuth(viewShotRef) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: REDIRECT_URI,
      responseType: ResponseType.Token,
      usePKCE: false,
    },
    discovery
  );

  const getToken = async () => {
    const result = await promptAsync({ useProxy: true });
    if (result.type !== 'success') throw new Error('Authentication failed');
    return result.params.access_token;
  };

  const captureAndUpload = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('EV Charger Maps', asset, false);
      Alert.alert('Saved', 'Screenshot saved locally.');

      const token = await getToken();

      const formData = new FormData();
      formData.append(
        'metadata',
        new Blob(
          [JSON.stringify({ name: 'ev_map.jpg', mimeType: 'image/jpeg' })],
          { type: 'application/json' }
        )
      );
      formData.append('file', {
        uri,
        name: 'ev_map.jpg',
        type: 'image/jpeg',
      });

      await axios.post(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      Alert.alert('Uploaded', 'Screenshot uploaded to Google Drive!');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Upload failed');
    }
  };

  return { captureAndUpload };
}

// import { useAuthRequest, makeRedirectUri, ResponseType } from 'expo-auth-session';
// import * as WebBrowser from 'expo-web-browser';
// import * as MediaLibrary from 'expo-media-library';
// import axios from 'axios';
// import { Alert, Platform } from 'react-native';

// WebBrowser.maybeCompleteAuthSession();

// const CLIENT_ID = '537382059905-6cadmq1c0d61m95qii3t9i6djm3js02l.apps.googleusercontent.com';
// const REDIRECT_URI = makeRedirectUri({ useProxy: true });
// const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//   tokenEndpoint: 'https://oauth2.googleapis.com/token',
// };

// export default function useGoogleDriveAuth(viewShotRef) {
//   const [request, response, promptAsync] = useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       scopes: SCOPES,
//       redirectUri: REDIRECT_URI,
//       responseType: ResponseType.Token,
//       usePKCE: false,
//     },
//     discovery
//   );

//   const getToken = async () => {
//     const result = await promptAsync({ useProxy: true });
//     if (result.type !== 'success') throw new Error('Authentication failed');
//     return result.params.access_token;
//   };

//   const captureAndUpload = async () => {
//     try {
//       const uri = await viewShotRef.current.capture();
//       const asset = await MediaLibrary.createAssetAsync(uri);
//       await MediaLibrary.createAlbumAsync('EV Charger Maps', asset, false);
//       Alert.alert('Saved', 'Screenshot saved locally.');

//       const token = await getToken();

//       const formData = new FormData();
//       formData.append('metadata', {
//         string: JSON.stringify({ name: 'ev_map.jpg', mimeType: 'image/jpeg' }),
//         type: 'application/json',
//       });
//       formData.append('file', {
//         uri,
//         name: 'ev_map.jpg',
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
//       Alert.alert('Uploaded', 'Screenshot uploaded to Google Drive!');
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Upload failed');
//     }
//   };

//   return { captureAndUpload };
// }
