import React , {useState , useEffect} from 'react'



const Slider = ({generateNewBars , setTime , maxBars , complexities}) => {
    const [speed , setSpeed] = useState(100)
    const [barsLength , setBarsLength] = useState(maxBars)
    const onChangeSpeed = (e) => {
        const val = parseInt(e.target.value)
        setSpeed(val)
        setTime(val)
    }

    const onChangeSize = (e) => {
        const val = parseInt(e.target.value)
        setBarsLength(val)
        generateNewBars(val)
    }
    useEffect(()=>{
        setBarsLength(maxBars)
    },[maxBars])
        return (

            <div className="row p-0" style={{backgroundColor : '#8D99AE'}} >
                <div className='col-sm-12'>
                    <h4>Algorithm :- {complexities.algorithm}. 
                        Time complexity :- {complexities.time_complexity}. 
                        Space complexity :- {complexities.space_complexity} 
                    </h4>
                </div>
                <div className="col-sm-12 col-md-6">
                    <h5>Speed of animations [5 - 500]</h5>
                    <input onChange = {onChangeSpeed} 
                    className="range-slider__range" 
                    type="range" value={speed} min="5" max="500"
                    name ="speed"/>
                    <span className="range-slider__value">{`${speed} ms`}</span>
                    
                </div>
                <div className="col-sm-12 col-md-6">
                    <h5>Number of bars [2 - {maxBars}]</h5>
                    <input onChange = {onChangeSize} 
                    className="range-slider__range" 
                    type="range" value={barsLength} min="2" max={maxBars}
                    name ="size"/>
                    <span>{`${barsLength} bars`}</span>
                </div>
            </div>
        )
}

export default Slider
