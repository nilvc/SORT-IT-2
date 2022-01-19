import React from "react";
import Description from "./components/Description";
import { SortAlgorithms } from "./components/sortAlgorithms";
function App() {
  const colors = {intialcolor : '#D02525' ,
                    swapingcolor : "#62E841", 
                    comparingcolor : "#FAA916", 
                    finalcolor : '#A104C8',
                    sortedcolor : "#3BA1A1", // completed sorting
                    pivotcolor : "#2DF7F7" }
  return (
    <div className="container-fluid" style={{backgroundColor : '#2B2D42', height : '100vh' }}>
      <div className="row">
        <div className="col-md-9 col-sm-12" >
            <SortAlgorithms colors={colors}/>
        </div>
        <div className="col-md-3 col-sm-12" >
          <Description colors={colors}/>
        </div>
      </div>
    </div>
  );
}

export default App;
