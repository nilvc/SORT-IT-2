import React from 'react'
import Card from './card'

export default function Description({colors}) {
    return (
        <div className='container'>
            <Card color = {colors.intialcolor} mgs='Initial colors of bars'  />
            <Card color = {colors.swapingcolor} mgs='Bars being swapped'/>
            <Card color = {colors.comparingcolor} mgs='Bars being compared'/>
            <Card color = {colors.finalcolor} mgs='Final position'/>
            <Card color = {colors.sortedcolor} mgs='Completed sorting'/>
            <Card color = {colors.pivotcolor} mgs='Pivot bar'/>
        </div>
    )
}
