import './cartypetab.css';
import React, {useState} from 'react'
import { Tab, Tabs, TabList } from "react-tabs";

function Cartypetab() {

  const [tabIndex, setTabIndex] = useState(0);
  console.log('selected tab::::',tabIndex);
    
  return (
        
   <div className="Appp">
     <Tabs className="Tabs" selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
       <TabList>
         <Tab>ALL</Tab>
         <Tab>SUV</Tab>
         <Tab>MUV</Tab>
         <Tab>Sedan</Tab>
         <Tab>Hatch</Tab>
       </TabList>
{/* <TabPanel>
         <p>Tab 1 works!</p>
       </TabPanel>
       <TabPanel>
         <p>Tab 2 works!</p>
       </TabPanel>
       <TabPanel>
         <p>Tab 3 works!</p>
       </TabPanel> */}
     </Tabs>
   </div>
  )
}

export default Cartypetab
