import React from 'react'
import addNew from '../../assets/add.png'
import leftArrow from '../../assets/left-arrow.png'
import { NavLink } from 'react-router-dom'
import Toggle from '../Toggle'

function SideBar({sideBarView, setSideBarView, setTransactionView}) {



const handleAddForm = ()=> {
   setTransactionView(true)
}

  return (
  
    <div className= {sideBarView ? 'visible' : ' hidden '} >

          <div className= {'h-full w-full flex flex-col justify-around items-center bg-gray-100 dark:bg-gray-900 shadow-2xl rounded-md'} >
            

        <button className='absolute top-10 -right-8 bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center z-30 hover:bg-gray-200 hover:opacity-90 shadow-xl' onClick={()=> setSideBarView(false)}>
             <img src={leftArrow} alt="left arrow" className='w-5 h-4 opacity-40' /> 
        </button>
        
        <main className='h-dvh w-28 flex flex-col justify-start items-center my-12'>
         


          <span className='flex flex-col gap-1.5 justify-center items-center'>
            <label className='text-xs font-bold'>New Transaction</label>
              <button className='bg-blue-300 w-16 h-16 rounded-full flex justify-center items-center opacity-70 hover:bg-blue-400 z-40' onClick={handleAddForm} > <img src={addNew} className='w-8 h-8' alt="add new"  />  </button>
          </span>

          <section className='flex flex-col mt-10 gap-6'>


          </section>


      
        </main>
       
        

    </div>
    </div>
   

   
  )
}

export default SideBar