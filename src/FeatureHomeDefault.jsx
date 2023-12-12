import React from 'react'
import EntityGrid from './Components/EntityGrid';
import MyFeatures from './MyFeatures';
import ChatbotButton from './Components/ChatbotButton';



export default function FeatureHomeDefault() {
  return (
    <>
    <div className="">
        <EntityGrid></EntityGrid>
        {/* <PieChartComponent></PieChartComponent> */}
        <div className="">
          <MyFeatures></MyFeatures>
        </div>
      </div>
      <br></br>
      <ChatbotButton />
    </>
  )
}




