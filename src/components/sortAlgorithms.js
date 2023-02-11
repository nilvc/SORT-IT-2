import React , {useState , useRef , useEffect} from 'react'
import Slider from "./slider";
export const SortAlgorithms = ({colors}) => {
    const [is_sorting , setIsSorting] = useState(false);
    const [time , setTime] = useState(100)
    const [bars , setBars] = useState([{id:0 , height : "50" , color : "red"}])
    const [maxBars , setMaxBars] = useState(2)
    const [complexities , setComplexities] = useState({algorithm : 'Select below' ,time_complexity : '' ,space_complexity : ''})
    const barsContainer = useRef(null)

    const handleBarContainerWidthChange = () => {
        const barsContainerWidth = barsContainer.current.clientWidth
        const maxBars = Math.floor(barsContainerWidth / 19)
        setMaxBars(maxBars)
        Generate_Bars(maxBars)
    }
    useEffect(()=>{      
            window.addEventListener('resize' , handleBarContainerWidthChange)
            handleBarContainerWidthChange()
            // cleanup
            return () =>{
                window.removeEventListener('resize' , handleBarContainerWidthChange)
            }
        },[]
    )
    const getRandomInteger = (min, max)  => {
        return Math.floor(Math.random() * (max - min + 1) ) + min
    }

    function timer(waitfor) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve("done");
          }, waitfor);
        });
      }
      
    const Generate_Bars = (givensize = 0) => {
        if (is_sorting) return;
        
        let new_bars = []
        for ( let i=0;i<givensize;i++)
        {   
            const val = getRandomInteger(5,70);
            new_bars.push({id : i , height : val , color : colors.intialcolor});
        }
        setBars(new_bars)
    }

    const changeColor = (pos1,pos2,color) =>{
        bars[pos1].color = color
        bars[pos2].color = color
        setBars([...bars])
    }
     
    const changeOneColor = (pos1,current_color) =>{
        if (pos1 >= bars.length || pos1 < 0 ){return;}
        bars[pos1].color = current_color
        setBars([...bars])
    }
    
    const swapBars = async (pos1,pos2) => {
        const height1 = bars[pos1].height
        const height2 = bars[pos2].height
        bars[pos1].height = height2
        bars[pos2].height = height1
        bars[pos1].color = colors.swapingcolor
        bars[pos2].color = colors.swapingcolor
        setBars([...bars])
    }

    const finalState = async () => {
        const numberOfBars = bars.length
        for(let i=0; i < numberOfBars; i++ )
        {
            await timer(100)
            changeOneColor(i,colors.sortedcolor)
            
        }
        await timer(1000)
        initialState()
    }

    const initialState = async () => {
        const numberOfBars = bars.length
        for(let i=0;i<numberOfBars;i++)
        {
            changeOneColor(i,colors.intialcolor);
            await timer(time); 
        }
    }

    // sorting algorithms from here 
    // 1 Bubble sort
    // 2 Selection sort
    // 3 Quick sort
    // 4 Heap sort     

    const bubbleSort = async () => {
       
        if (is_sorting)
        {
            return ;
        }
        setIsSorting(true);
        setComplexities({algorithm : 'Bubble Sort' ,time_complexity : 'O(n**2)' ,space_complexity : 'O(1)'})
        const arrsize=bars.length;
        let last=arrsize-1;

        for (let i=0;i<arrsize ; i++)
        {
            let hasswapped = false;
            for (let j=0;j<arrsize-i-1;j++)
            {
                changeColor(j,j+1,colors.comparingcolor);
                await timer(time)

                if (bars[j].height > bars[j+1].height )
                {
                    swapBars(j,j+1)
                    await timer(time)
                    hasswapped = true
                }
                changeColor(j,j+1,colors.intialcolor);
            }
            if (! hasswapped)
            {
                break;
            }
            changeOneColor(last,colors.finalcolor);
            last--;
        }
        await finalState();
        setIsSorting(false)
    }
    
    const selectionSort = async () => {

        if (is_sorting)
        {
            return ;
        }
        setIsSorting(true);
        setComplexities({algorithm : 'Selection Sort' ,time_complexity : 'O(n**2)' ,space_complexity : 'O(1)'})
        const size = bars.length;
        for (let i=0;i<size;i++)
        {
            let current = i;
            for (let j=i;j<size;j++)
            {
                changeColor(current,j,colors.comparingcolor);
                await timer(time-50);
                 
                if (bars[current].height > bars[j].height)
                {
                    swapBars(current,j);
                    await timer(time);
                }
                changeColor(current,j,colors.intialcolor);
            }
            changeOneColor(i,colors.finalcolor)
        }
        await finalState();
        setIsSorting(false)
    }

    const doquicksort = async () => {
        if (is_sorting)
        {
            return ;
        }
        setIsSorting(true)
        setComplexities({algorithm : 'Quick Sort' ,time_complexity : 'O(nlog(n))' ,space_complexity : 'O(log(n))'})
        const size = bars.length
        await quicksort(0,size-1,bars)
        await finalState()
        setIsSorting(false)
    }

    const quicksort = async (start,end,copyarr) => {
        if (start<end)
        {
            await partion(start,end,copyarr).then( async pivot => {changeOneColor(pivot,colors.finalcolor)
                                                        await quicksort(start,pivot-1,copyarr)
                                                        await quicksort(pivot+1,end,copyarr)
                                                    }
                                            );
        }
    }

    // choice of pivot is the last element
    const partion = async (start,end,copyarr) => {
    
        let pivot = copyarr[end].height
        changeOneColor(end,colors.pivotcolor)
        await timer(2*time);
        let m = start

        for (let i=start;i<end;i++)
        {
            changeColor(i,end,colors.comparingcolor);
            await timer(time);

            if (copyarr[i].height < pivot)
            {
                swapBars(i,m)
                await timer(time)
                changeColor(i,m,colors.intialcolor)
                await timer(time)
                m++
            }
            changeColor(i,end,colors.intialcolor);
            await timer(time);
        }

        swapBars(end,m);
        await timer(time);

        changeColor(m,end,colors.intialcolor);
        await timer(time);
        return m;
    }

    const heapsort = async () => {
        if (is_sorting)
        {
            return ;
        }
        setIsSorting(true);
        setComplexities({algorithm : 'Heap Sort' ,time_complexity : 'O(nlog(n))' ,space_complexity : 'O(1)'})
        const n = bars.length;
        // Build heap (rearrange array)
        for (var i = Math.floor(n / 2) - 1; i >= 0; i--)
            await heapify(bars, n, i);

        // One by one extract an element from heap
        for (let j = n - 1; j > 0; j--) {
            // Move current root to end
            swapBars(0,j);
            await timer(time);
            changeColor(j,0,colors.intialcolor);
            await timer(time);
            
            changeOneColor(j,colors.finalcolor);
            // call max heapify on the reduced heap
            await heapify(bars, j, 0);
        }
        await finalState();
        setIsSorting(false)
    }
 
    // To heapify a subtree rooted with node i which is
    // an index in arr[]. n is size of heap
    const heapify = async (arr, n, i) =>
    {
        let largest = i; // Initialize largest as root
        let l = 2 * i + 1; // left = 2*i + 1
        let r = 2 * i + 2; // right = 2*i + 2
 
        // If left child is larger than root
        if (l < n)
        {
            changeColor(largest,l,colors.comparingcolor);
            await timer(time);
            
            const copylargest = largest;
            if(arr[l].height > arr[largest].height)
            {
                largest = l;
            }
            changeColor(copylargest,l,colors.intialcolor);
            await timer(time);
        }
 
        // If right child is larger than largest so far
        if (r < n)
        {
            changeColor(largest,r,colors.comparingcolor);
            await timer(time);

            const copylargest = largest;
            if(arr[r].height > arr[largest].height)
            {
                largest = r;
            }
            changeColor(copylargest,r,colors.intialcolor);
            await timer(time);

        }
 
        // If largest is not root
        if (largest !== i) {
            swapBars(largest,i);
            await timer(time);
            
            changeColor(i,largest,colors.intialcolor);
            await timer(time);

            // Recursively heapify the affected sub-tree
            await heapify(arr, n, largest);
        }
    }

    return (
        <div className='container-fluid' >
            <div className='col-sm-12 my-1'>
                <Slider generateNewBars = {Generate_Bars} setTime = {setTime} maxBars = {maxBars} complexities = {complexities}/>
            </div>
            <div className='row border rounded' >
                <div className='col-sm-12' ref={barsContainer}>
                    <ul className='btn-group px-1' style={{listStyleType : 'none' , height : '75vh'}}>
                    {
                        bars.map(({id,height,color}) => {return(
                            <li key={id} style={{ height : `${height}vh` ,width: "10px", backgroundColor : `${color}`}} 
                                className='mx-1 align-self-end'>
                                
                            </li>
                        )})
                    }
                    </ul>
                </div>
                <div className='col-sm-12'>
                    <button className='btn btn-warning btn-sm mx-1' onClick={() => {Generate_Bars(bars.length)}}>Generate new Bars</button>
                    <button className='btn btn-warning btn-sm mx-1' onClick={bubbleSort}>Bubble sort</button>
                    <button className='btn btn-warning btn-sm mx-1' onClick={selectionSort}>Selection Sort</button>
                    <button className='btn btn-warning btn-sm mx-1' onClick={doquicksort}>Quick Sort</button>
                    <button className='btn btn-warning btn-sm mx-1' onClick={heapsort}>Heap Sort</button>
                </div>
            </div>
        </div>
    )
}