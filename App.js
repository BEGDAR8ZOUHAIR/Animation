import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler'; 
import  PangestureHandler  from './components/PanGestureHandler';

function App()
{
 
  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <PangestureHandler />
    </GestureHandlerRootView>
  );
}


export default App;
