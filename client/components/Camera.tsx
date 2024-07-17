import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Camera } from 'expo-camera';
import { CameraProps } from 'expo-camera/build/Camera.types';

export default function CameraComponent() {

    const [facing, setFacing] = useState<CameraProps["facing"]>("back");
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [uri, setUri] = useState<string | null>('');
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = useRef<CameraView | null>(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const askForPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status === 'granted') {
                setShowCamera(true);
            } else {
                Alert.alert("Permission Denied", "You need to grant camera permission to use this feature.");
            }
        } else {
            setShowCamera(true);
        }
    };

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePic = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            if (photo)
                setUri(photo.uri);
            console.log(JSON.stringify(photo));
        }
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return (
            <View style={styles.cameraContainer}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={askForPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showCamera ? (
                <Camera style={styles.camera} type={facing} ref={cameraRef}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                            <Text style={styles.text}>Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.takePicButton} onPress={takePic}>
                            <Text style={styles.text}>Capture</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            ) : (
                <Button title="Open Camera" onPress={askForPermission} />
            )}
            {uri ? <Image source={{ uri }} style={styles.imagePreview} /> : null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    takePicButton: {
        height: 50,
        width: 50,
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: 'flex-end',
        marginHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePreview: {
        width: 100,
        height: 100,
        margin: 10,
    },
});