import { format } from 'date-fns';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { useTransactionContextAll } from '../../../context/TransactionContext';

function UpdateTransactionForm({transactionView, setTransactionView, transactionId}) {

  const {dispatch, TRANSACTIONS_ACTIONS, allTransactionsList } = useTransactionContextAll()
  const [selectedTransaction, setSelectedTransaction ] = useState({})

  const [transactionState, setTransactionState] = useState('expense')

const [amount, setAmount] = useState(0)
const [category, setCategory] = useState('')
const [account, setAccount ] = useState('')
const [description, setDescription] = useState('')
const [currency, setCurrency] = useState('')

  const currentDate = new Date();
  const formatedDate = format(currentDate, 'EEEE dd MMM yyyy').toUpperCase();

  useEffect(()=> {
    const foundedId = allTransactionsList.find(item => item.id === transactionId)
    setSelectedTransaction(foundedId)
  },[transactionId])

  useEffect(()=> {
    if(selectedTransaction == undefined) {
        return
    }
   setAmount(parseFloat(selectedTransaction.transaction_amount) || 0)
   setDescription(selectedTransaction.transaction_description || '')
   setAccount(selectedTransaction.transaction_account || '')
   setCategory(selectedTransaction.transaction_category || '')
   setCurrency(selectedTransaction.transaction_currency || '')
   setTransactionState(selectedTransaction.transaction_type || '')

  },[selectedTransaction])

  const handleTransactionSubmit = (e) => {
    e.preventDefault()

    const new_transaction = {
      id: transactionId,
      transaction_type: transactionState,
      transaction_amount: amount,
      transaction_currency: currency,
      transaction_category: category,
      transaction_account: account,
      transaction_description: description,
      transaction_date: currentDate
    }

    dispatch({type: TRANSACTIONS_ACTIONS.UPDATE_TRANSACTION, payload: {id: transactionId, data: new_transaction}})

    setTransactionView(false)
    Swal.fire({
      title: "Updated!",
      icon: "success"
    });


  }

  return (
    <div className={transactionView ? 'fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-center z-50' : 'hidden'}>
     

    <main className='relative bg-gray-100 rounded-xl shadow-2xl h-fit w-fit flex flex-col justify-center items-center py-24 px-12 overflow-y-scroll'>

    <h1 className='absolute top-10 font-bold text-2xl'>{selectedTransaction ? selectedTransaction.id : 'Transaction not found'}</h1>

    
     <section className='flex gap-2 justify-center'>
       <button className= {`bg-red-100 rounded-lg py-2 px-4 font-semibold text-2xl ${transactionState == 'expense' ? 'bg-red-300' : 'hidden'}`} onClick={() => setTransactionState('expense')}>Expense</button>
       <button className={`bg-green-100 rounded-lg py-2 px-4 font-semibold text-2xl ${transactionState == 'income' ? 'bg-green-300' : 'hidden'}`} onClick={() => setTransactionState('income')}>Income</button>
     </section>

     <form action="" className='flex flex-col gap-12 h-4/5 w-full mt-8 items-center' onSubmit={handleTransactionSubmit}>
  
  <span className='flex items-center gap-2'>

      <select
      className="block appearance-none w-fit h-fit  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline text-2xl" value={currency} onChange={(e)=> setCurrency(e.target.value)}
    >
      <option value="DOP">DOP</option>
    </select>

        <input type="number" name='amount' value={amount} className='min-h-24 w-4/5 shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-lg text-3xl text-center placeholder:text-3xl placeholder:opacity-45 ' onChange={(e)=> setAmount(e.target.value)}  placeholder='RD$00.00' />

  </span>
   
        <span className='bg-gray-300 rounded-lg py-0.5 px-1'>{category}</span>

        <span  className='bg-gray-300 rounded-lg py-0.5 px-1'>{account}</span>

        <input type="text" name='description' className='min-h-24 w-full shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-md text-3xl text-center placeholder:text-3xl placeholder:opacity-45 ' placeholder='Description(optional)' value={description} onChange={(e)=> setDescription(e.target.value)} />

        <button className='bg-blue-400 rounded-md text-lg text-white font-semibold py-1 w-full' >Update</button>

        <p className='px-2 py-1 rounded-lg bg-gray-300 font-semibold text-xl'>{formatedDate}</p>

     </form>

    


  
    

    <span className='absolute right-4 top-4 w-5 h-5' onClick={()=> setTransactionView(false)}>
    <h2 className='font-bold text-lg'>x</h2>
    </span>

           
    </main>


   
  </div>
  )
}

export default UpdateTransactionForm