import React, { useEffect, useState } from 'react'
import { NormalWidget } from '../widgets/Widget'
import { useTransactionContextAll } from '../../context/TransactionContext'
import UpdateTransactionForm from '../Transactions/Forms/UpdateTransactionForm'
import TransactionList from '../Helpers/Transactions/TransactionList'
import { useAccountsContextAll } from '../../context/AccountsContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { format } from 'date-fns'

function HomeContainer() {

    const {
      allTransactionsList,
      incomesAmount,
      expensesAmount
      } = useTransactionContextAll()

      const { allAccountsList, ACCOUNTS_ACTIONS, accDispatch } = useAccountsContextAll();


      const [updateFormView, setUpdateFormView] = useState(false)
      const [transactionArrayList, setTransactionArrayList] = useState([])
      const [transactionListState, setTransactionListState] = useState('expense')
  const [selectedTransactionId, setSelectedTransactionId] = useState('')


/* const handleUpdateTransaction = (id) => {
  setSelectedTransactionId(id)
  setUpdateFormView(true)
} */
  
useEffect(()=> {

  if(!allTransactionsList){
    return
  }

setTransactionArrayList(allTransactionsList)
},[allTransactionsList])


useEffect(()=> {
  if(!transactionListState) {
    return
  }
  
  if(transactionListState == 'all') {
    return setTransactionArrayList(allTransactionsList)
  }

 
  const newArr = allTransactionsList ? allTransactionsList.filter(t => t.transaction_type == transactionListState) : []
  setTransactionArrayList(newArr)

  },[allTransactionsList, transactionListState])


  return (
    <main className='py-1'>

      <div className='relative'>
          <UpdateTransactionForm transactionView={updateFormView} setTransactionView={setUpdateFormView} transactionId={selectedTransactionId}/>
      </div>
    
    {/* accounts top list */}

           {/*  lista de cuentas  */}             
           <ul className="flex overflow-x-scroll gap-2 w-full min-h-40 min-w-48 py-7 opacity-95 dark:text-black dark:opacity-95">
                {allAccountsList && allAccountsList.length > 0 ? (
                  allAccountsList
                  .sort((a, b)=> {
                    if(a.account_type === 'Cash'){
                      return -1 
                    }
                    else if(b.account_type === 'Cash'){
                      return 1 
                    }
                    else { 
                      return 0
                    }

                  })
                  .map((account) => (
                    <li
                      key={account.id}
                      style={{ backgroundImage: account.account_color }}
                      onClick={() => handleSelectedAccount(account.id)}
                      className={`py-3 min-w-28 min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between`}
                    >
                     
                     <span className="w-full flex justify-between items-center">
                        <FontAwesomeIcon 
                      icon={JSON.parse(account.account_icon)}
                      size="xs" />

                      <p className="text-sm">{account.account_name}</p>
                     </span>
                    

                      <span className="flex place-content-center w-full gap-1 text-lg bg-gray-200 rounded-md bg-opacity-40 px-2">
                      <p>{account.account_currency}</p>
                      <p>{account.account_amount}</p>
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>


        <div className='flex flex-col gap-4'>

          <h1 className='font-bold w-full text-left text-2xl px-3'>{format(new Date(), 'MMMM d')}</h1>

          <span className='flex gap-2'>
              <NormalWidget title={'Incomes'} content={'DOP ' + incomesAmount.toFixed(2)}  classes={'  bg-white shadow-lg'}/>
            <NormalWidget title={'Expenses'} content={'DOP ' + expensesAmount.toFixed(2)} classes={'  bg-white shadow-lg'}  />
          </span>
          
        </div>

       

        <div className='mt-2 flex flex-col'>

          
         <ul className='rounded-lg text-lg flex gap-2 w-fit px-3 py-1 my-6 mx-auto border border-black items-center'>
          <li 
          className={transactionListState == 'all' ? 'bg-white shadow-lg bg-opacity-60 dark:bg-gray-800 font-semibold px-2 py-1 rounded-lg' : 'px-2 py-1'} 
          onClick={()=> setTransactionListState('all')}>
            All</li>

          <li 
           className={transactionListState == 'expense' ? 'bg-white shadow-lg bg-opacity-60 dark:bg-gray-800 font-semibold px-2 py-1 rounded-lg' : 'px-2 py-1'}
           onClick={()=> setTransactionListState('expense')}>
            Expenses</li>

          <li  
          className={transactionListState == 'income' ? 'bg-white shadow-lg bg-opacity-60 dark:bg-gray-800 font-semibold px-2 py-1 rounded-lg' : 'px-2 py-1'}
          onClick={()=> setTransactionListState('income')}>
            Incomes</li>
            <li  
          className={transactionListState == 'transfer' ? 'bg-white shadow-lg bg-opacity-60 dark:bg-gray-800 font-semibold px-2 py-1 rounded-lg' : 'px-2 py-1'}
          onClick={()=> setTransactionListState('transfer')}>
            Transfer</li>
         </ul>

        <TransactionList transactionsList={transactionArrayList} />
        
        </div>
              
    </main>
  )
}

export default HomeContainer
