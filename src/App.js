import React , { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';


import Amplify, { XR, awsconfig } from 'aws-amplify';

 import scene_config from './sumerian_exports';
 import { SumerianScene, withAuthenticator } from 'aws-amplify-react';

//  XR.configure({ // XR category configuration
//    SumerianProvider: { // Sumerian-specific configuration
//      region: 'us-east-1', // Sumerian scene region
//      scenes: {
//        "SumerianAmplify": {   // Friendly scene name
//            sceneConfig: scene_config // Scene JSON configuration
//          },
//      }
//    }
//  });

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



// function App() {
//   return (
//     <div className="App">
//       <div>Sumerian Scene</div>
//       <div style={{height: '600px'}}>  
//         <SumerianScene sceneName='SumerianAmplify' />
//       </div>
//     </div>
//   );
// }

// export default App;

class App extends Component {
  render() {
    return (
      <div>
        <SumerianScene sceneName='SumerianAmplify' />
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });



// class App extends Component {
//   async componentDidMount() {
//     await XR.loadScene("SumerianAmplify", "sumerian-scene-dom-id");
//     XR.start("SumerianAmplify");
//   }
//   render() {
//     return (
//       <div className="App">
//         <div id="sumerian-scene-dom-id"></div>
//       </div>
//     );
//   }
// }

// export default withAuthenticator(App, { includeGreetings: true });