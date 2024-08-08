import React from 'react';
import { SafeAreaView } from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { sepia } from "@cloudinary/url-gen/actions/effect";

export default function App() {

    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'demo'
        }
    });

    // Use the image with public ID, 'picture'.
    const myImage = cld.image('picture');

    // Apply the transformation.
    myImage
      .effect(sepia());  // Apply a sepia effect.
np
    // Render the transformed image in a React Native component.
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <AdvancedImage cldImg={myImage} style={{ width: 200, height: 200, alignSelf: 'center'}} />
      </SafeAreaView>
    )
};