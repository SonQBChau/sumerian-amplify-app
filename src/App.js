import React , { Component } from 'react';
import './App.css';
import Amplify, { XR, awsconfig } from 'aws-amplify';
import scene_config from './sumerian_exports';
// import { SumerianScene, withAuthenticator } from 'aws-amplify-react';
import {  withAuthenticator } from 'aws-amplify-react';
import AWS from 'aws-sdk';
import { Auth } from 'aws-amplify';
import logo from './logo.jpg';

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

// Auth.currentAuthenticatedUser({
//   bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
// }).then(user => console.log(user))
// .catch(err => console.log(err));



// old working app
// class App extends Component {
//   render() {
//     return (
//       <div style={ { height: '100vh' } }>
//         <SumerianScene sceneName='SumerianAmplify' />
//       </div>
//     );
//   }
// }

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          loading: true,
          sceneController: null
      };
  }

  sceneLoaded(sceneController) {
    this.setState({
        loading: false,
        sceneController
    });
}

    // this function send infomation down to Sumerian
  emit(channelName, value) {
      if (((this.state.sceneController || {}).sumerian || {}).SystemBus) {
          this.state.sceneController.sumerian.SystemBus.emit(channelName, value)
      }
  }

  sendUserNameToSumerian() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user =>   this.emit("getUserName", user.username))
    .catch(err => console.log(err));

}





  render() {
    //send user name to sumerian component
    this.sendUserNameToSumerian();
      return (
          <div  className="App">
              {this.state.loading && <IndeterminateLoading/>}
              <div style={{visibility: this.state.loading && 'hidden'}}>
                  {/* <SceneControls sceneController={this.state.sceneController}/> */}
                  <SumerianScene scene='SumerianAmplify' onLoaded={(controller) => this.sceneLoaded(controller)}/>
              </div>
          </div>
      );
  }
}

export default withAuthenticator(App, { includeGreetings: true });



/// new part
function IndeterminateLoading() {
  return <img src={logo} className="App-logo" alt="logo"/>;
}

class SumerianScene extends Component {

  async componentDidMount() {
      await this.loadAndStartScene();
  }

  render() {
      return <div
     
          id="sumerian-scene-dom-id"
          style={{width: "100%", height: "100%", position: "absolute"}}
        
      />;
  }

  async loadAndStartScene() {
      await XR.loadScene(this.props.scene, "sumerian-scene-dom-id");
      const controller = XR.getSceneController(this.props.scene);
      this.props.onLoaded(controller);
      XR.start(this.props.scene);
  }

}

