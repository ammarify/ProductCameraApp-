import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text, 
  Image, 
  ActivityIndicator,
  Linking,
  Platform
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const checkCameraPermission = async () => {
      const permission = await Camera.getCameraPermissionStatus();
      
      if (permission === 'not-determined') {
        const newPermission = await Camera.requestCameraPermission();
        setHasPermission(newPermission === 'granted');
      } else {
        setHasPermission(permission === 'granted' || permission === 'limited');
      }
    };

    checkCameraPermission();
  }, []);

  const requestPermission = async () => {
    const newPermission = await Camera.requestCameraPermission();
    const currentStatus = await Camera.getCameraPermissionStatus();
    
    if (currentStatus === 'denied' && Platform.OS === 'android') {
      Linking.openSettings();
    }
    
    setHasPermission(newPermission === 'granted' || currentStatus === 'granted' || currentStatus === 'limited');
  };

  const takePhoto = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto({
          flash: 'off',
          qualityPrioritization: 'quality',
        });
        setPhoto(photo);
      }
    } catch (error) {
      console.error('Failed to take photo:', error);
    }
  };

  const handleRetake = () => setPhoto(null);
  const handleConfirm = () => navigation.navigate('ProductList', { photo });

  if (hasPermission === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera access is required to use this feature</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>
            {Platform.OS === 'ios' ? 'Grant Camera Access' : 'Open Settings'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.permissionText}>Camera device not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image 
            source={{ uri: `file://${photo.path}` }} 
            style={styles.previewImage}
            resizeMode="contain"
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={handleRetake}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.confirmButton]} 
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {isFocused && (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isFocused}
              photo={true}
            />
          )}
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto} />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  previewImage: {
    flex: 1,
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  confirmButton: {
    backgroundColor: 'rgba(0,122,255,0.7)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
});

export default CameraScreen;