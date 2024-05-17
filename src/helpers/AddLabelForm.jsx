import React, { useEffect, useRef, useState } from 'react'
import { useCategoriesContextAll } from '../context/CategoriesContext';

function AddLabelForm({labelFormView, setLabelFormView}) {

    const {dispatch, CATEGORIES_ACTIONS, setLabelsCategoryArray, predefinedColors, currentColor } = useCategoriesContextAll()

    const [currentColorArray, setCurrentColorArray] = useState([]);  


    useEffect(()=> {
        const foundedCurrentColor = predefinedColors.find(color => color.main_color == currentColor)
        setCurrentColorArray(foundedCurrentColor.colors)
    },[currentColor])

    const labelNameRef = useRef(null)

    const [selectedColor, setSelectedColor] = useState('#fff');  

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value); 
      };


    const handleSubmit = (e) => {
        e.preventDefault()
        setLabelsCategoryArray(prev => [...prev , { 
            id: crypto.randomUUID(),
            label_name: labelNameRef.current.value,
            label_color: selectedColor
        }])

        labelNameRef.current.value = ''
    }


  return (
    <div className={labelFormView ? 'relative rounded-xl border-2 border-black py-2 px-2 min-w-80 w-1/2 bg-slate-200' : 'hidden'}>
        <h1>Add Label </h1>
        <button className='absolute right-4 top-2 text-lg font-semibold' onClick={()=> setLabelFormView(false)}>x</button>

        <input type="text" ref={labelNameRef} placeholder='Collegue, School...' className='w-full h-12 border border-black px-6 dark:bg-transparent'/>
        
        <span className='w-full flex flex-col items-center gap-0.5 mt-5'> 
                    <label className='font-semibold ' >Chosee a color</label> 

                    <span className='flex gap-3'>
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                        className="p-2 rounded border border-gray-300 "
                    />

            <div className='px-3 rounded-md ' style={{backgroundColor: selectedColor}}></div>  
                    </span>

                <div className="mt-4 flex flex-wrap">
        {

                        
                currentColorArray.map((color, index) => (
                <div key={index} className="mr-4 mb-4 cursor-pointer" onClick={() => setSelectedColor(color)}>
                    <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                </div>))
                        
            }
        </div>

                    </span>

                <button onClick={handleSubmit} className='bg-black w-full text-white font-semibold'>save</button>

    </div>
  )
}

export default AddLabelForm