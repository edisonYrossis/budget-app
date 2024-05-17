import React from 'react'
import { NavLink } from 'react-router-dom'
import addNew from '../../assets/add.png'
import home from '../../assets/home.png'
import categories from '../../assets/categories.png'
import budget from '../../assets/pie-chart.png'
import accounts from '../../assets/credit-card.png'



import { useTransactionContextAll } from '../../context/TransactionContext'


function DownNav() {

    const {setTransactionView} = useTransactionContextAll()

const handleAddForm = ()=> {
    setTransactionView(true)
 }
 

  return (
   <main className='w-full   fixed bottom-0 flex justify-center  items-center px-4 py-6 gap-3'>
    
     <section className='bg-gray-400 dark:bg-inherit bg-opacity-45 flex gap-2 rounded-3xl flex-grow h-fit max-w-fit justify-between'>

     <span className='flex flex-col gap-1.5 justify-center items-center'>
              <NavLink className='dark:bg-gray-500  bg-opacity-40 w-10 h-10 rounded-full flex justify-center items-center opacity-70 hover:bg-gray-500 z-40' to={'/'}  > <img src={home} className='w-7 h-7' alt="add new"  />  </NavLink>
          </span>

          <span className='flex flex-col gap-1.5 justify-center items-center'>
              <NavLink className='dark:bg-gray-500  bg-opacity-40 w-10 h-10 rounded-full flex justify-center items-center opacity-70 hover:bg-gray-500 z-40'  to={'transactions-categories'} > <img src={categories} className='w-7 h-7' alt="add new"  />  </NavLink>
          </span>

     </section>




     <section>
     <span className='flex flex-col gap-1.5 justify-center items-center'>
              <button className='dark:bg-gray-500 bg-gray-800 bg-opacity-40 w-16 h-16 rounded-full flex justify-center items-center opacity-70 hover:bg-gray-500 z-40' onClick={handleAddForm} > <img src={addNew} className='w-8 h-8' alt="add new"  />  </button>
          </span>
     </section>




     <section className='bg-gray-400 dark:bg-inherit bg-opacity-45 flex gap-2 rounded-3xl flex-grow h-fit max-w-fit justify-between'>

     <span className='flex flex-col gap-1.5 justify-center items-center'>
              <NavLink className='dark:bg-gray-500 bg-opacity-40 w-10 h-10 rounded-full flex justify-center items-center opacity-70 hover:bg-gray-500 z-40' to={'/transactions-accounts'} > <img src={accounts} className='w-7 h-7' alt="add new"  />  </NavLink>
          </span>

          <span className='flex flex-col gap-1.5 justify-center items-center'>
              <NavLink className='dark:bg-gray-500 bg-opacity-40 w-10 h-10 rounded-full flex justify-center items-center opacity-70 hover:bg-gray-500 z-40' to={'/transactions-budget'} > <img src={budget} className='w-7 h-7' alt="add new"  />  </NavLink>
          </span>
     </section>

   </main>
  )
}

export default DownNav