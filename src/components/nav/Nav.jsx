import React, { useEffect, useState } from 'react'
import menuBar from '../../assets/menuBar.png'
import SideBar from './SideBar'
import { useTransactionContextAll } from '../../context/TransactionContext'
import NewTransactionForm from '../Transactions/Forms/NewTransactionForm'
import Toggle from '../Toggle'

function nav() {

  const [sideBarView, setSideBarView] = useState(false)
  const {transactionView, setTransactionView} = useTransactionContextAll()
  
  return (
   <main className='flex items-center justify-between w-full fixed top-12 left-0 px-4 z-40 '>


<section>
  <span>
   <button onClick={() => setSideBarView(true)}>
        <img src={menuBar} alt="Menu" className='w-8 h-8 rounded-lg px-0.5 py-0.5 bg-white bg-opacity-40 ' />
      </button> 
    </span> 


   <div className='relative'>
     <div className='fixed top-0 -left-0'>

   <SideBar sideBarView={sideBarView} setSideBarView={setSideBarView} setTransactionView={setTransactionView} />
   
    <NewTransactionForm transactionView={transactionView} setTransactionView={setTransactionView}/> 

   </div>
   </div>
   
</section>

    

    <Toggle />

   </main>
  )
}
export default nav 