import React , { Component } from 'react';
import './App.css';
import Amplify, { XR, awsconfig } from 'aws-amplify';
import scene_config from './sumerian_exports';
import { SumerianScene, withAuthenticator } from 'aws-amplify-react';
import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';

// import AWS services used inside Sumerian
new AWS.Polly();

 Amplify.configure({
  ...awsconfig,
  XR: { // XR category configuration
    region: 'us-east-1', // Sumerian region
    scenes: { 
      "SumerianAmplify": { // Friendly scene name
        sceneConfig: scene_config // Scene configuration from Sumerian publish
      }
    }
  }
});

Auth.currentAuthenticatedUser({
  bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
}).then(user => console.log(user))
.catch(err => console.log(err));

class App extends Component {
  render() {
    return (
      <div style={ { height: '100vh' } }>
        <SumerianScene sceneName='SumerianAmplify' />
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });



