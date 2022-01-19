import React from 'react'

export default function Card({mgs , color}) {
    const borderStyles = {
        border: '3px solid #5965EE',
        borderRadius : '5px',
        backgroundColor : '#1A374D'
    }
    return (
        <div class="card my-2 p-0" style={borderStyles}>
                <div class="card-body m-0 p-0 " style={{height : '85px'}}>
                    <ul className='btn-group  m-0 p-0' style={{listStyleType : 'none'}}>
                        <li style={{ height : '80px' ,width: "30px", margin:"3px", backgroundColor : `${color}`}} ></li>
                        <li style={{ height : '80px' ,width: "30px", margin:"3px", backgroundColor : `${color}`}} ></li>
                        <li style={{color : color , fontWeight : 'bold' , fontSize: '1.25em'}} className='mt-3'>{mgs}</li>
                    </ul>
                </div>
            </div>
    )
}
