import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { useBudgetContextAll } from '../../../context/BudgetContext';
import TransactionList from '../../Helpers/Transactions/TransactionList';
import { useTransactionContextAll } from '../../../context/TransactionContext';
import ProgressBar from '@ramonak/react-progress-bar';

function ViewBudget({setBudgetView, budgetView, budgetId}) {

    const { allBudgetList, dispatch, BUDGET_ACTIONS } = useBudgetContextAll()
    const {
      allTransactionsList,
      } = useTransactionContextAll()
    
    const [currentBudget, setCurrentBudget] = useState({})

    const [newtransactionArray, setNEwTransactionArray] = useState([])

    const handleDeleteBudget = () => {
        Swal.fire({
            title: "Delete transaction?",
            showCancelButton: true,
            confirmButtonText: "Delete",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Deleted!", "", "success");
                return dispatch({type: BUDGET_ACTIONS.DELETE_BUDGET, payload: budgetId})

            }
          });

          setBudgetView(false)
    }

    


    useEffect(()=> {
        const foudned = allBudgetList.find(budget => budget.id === budgetId)
        setCurrentBudget(foudned)

    }, [budgetView ,budgetId])

    useEffect(()=> {

      if(!currentBudget || !budgetView || !budgetId) {
        return
      }
      const budgetLabels = currentBudget ? currentBudget.budget_labels.map(l => l.label_name) : []
      const newArr = allTransactionsList
      .filter(tr => tr.transaction_labels.some(item => budgetLabels.includes(item.label_name)))

      setNEwTransactionArray(newArr)

    }, [currentBudget])


    const handleProgressBar = (current) => {
      
      if(!current){
        return
      }

      const budgetLabels = current.map(l => l.label_name)
      const newArr = allTransactionsList
      .filter(tr => tr.transaction_labels.some(item => budgetLabels.includes(item.label_name)))

     return newArr.reduce((acc, e) => acc + parseFloat(e.transaction_amount), 0)
    }


  return (
    <div className={ budgetView ? 'fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-end z-50 py-6 md:py-1 dark:text-black ' : 'hidden'}>

    <main className='relative bg-gray-100 rounded-xl shadow-2xl h-full md:h-5/6 w-full flex flex-col justify-center items-center px-2 md:px-2 overflow-y-scroll mx-4 md:max-w-screen-lg md dark:bg-[#272727]'>
      

      <div className='absolute top-0 w-full'>
        <section className='flex justify-between items-center w-full px-3 md:px-6 py-2'>

        <span className='flex gap-1'>
            <button className='text-sm md:text-lg font-semibold rounded-md bg-green-300 py-1 px-1'>Edit</button>
            <button className='text-sm md:text-lg font-semibold rounded-md bg-red-300 py-1 px-1' onClick={handleDeleteBudget}>Delete</button>


        </span>

        <h1 className='font-bold text-lg md:text-2xl mb-2 w-full dark:text-white'>{currentBudget ? currentBudget.budget_name : 'None'}</h1>

            <button className='text-lg md:text-3xl font-semibold dark:text-white' onClick={()=> {
            setBudgetView(false)
        }}>x</button>
        </section>
      </div>

        <section className='flex flex-col justify-start items-center w-full px-2 md:px-12 h-5/6 gap-3' >
            

 <div className='flex items-center justify-between w-full gap-1 text-lg md:text-2xl font-semibold'>

      <span className='flex gap-2 items-center text-xl md:text-4xl font-semibold bg-blue-300 bg-opacity-60 py-4 px-3 rounded-lg'>
        <h1>{currentBudget ? currentBudget.budget_currency : 'None'}</h1>
        <h1>{currentBudget ? currentBudget.budget_amount + '.00' : 'None'}</h1>
      </span>


      <div className={`flex-grow flex justify-between items-center rounded-lg py-4 px-2 mr-2 shadow-md bg-gray-400 bg-opacity-30 overflow-x-scroll`}>      
            
            <section className='flex gap-2'>
         {currentBudget && currentBudget.budget_labels !== undefined ? currentBudget.budget_labels
            .map(label => <p key={label.id} className={`rounded-md py-1 px-1.5 font-semibold text-sm shadow-lg border border-black`} style={{backgroundColor: label.label_color}}>{label.label_name}</p>)
            :
            <h1>There's no elements</h1>
            }
            </section>
     </div>




</div>

      <div className='w-full py-3 px-2  bg-gray-200 bg-opacity-90 shadow-2xl rounded-xl flex flex-col gap-1 '>
      <ProgressBar completed={ currentBudget ? (handleProgressBar(currentBudget.budget_labels) / currentBudget.budget_amount).toFixed(3) * 100 : 0} maxCompleted={100} bgColor='#0f0f0f' baseBgColor='#C1C1C1' /> 

      <span className='w-full flex justify-between'>
                      <span className='flex text-xs font-medium'>
                      <h1>Current</h1>
                      <p>{`: ${currentBudget ? handleProgressBar(currentBudget.budget_labels) : 0}.00`}</p>
                      </span>

                      <span className='flex text-xs font-medium'>
                      <h1>Remaining</h1>
                      <p>{`: ${currentBudget ? currentBudget.budget_amount - handleProgressBar(currentBudget.budget_labels) : 0}.00`}</p>
                      </span>
                  </span>
      </div>
      
<section className='w-full flex flex-col gap-2 bg-gray-200 bg-opacity-90 shadow-2xl rounded-xl px-2 py-5'> 
<h1 className='font-semibold text-xl w-full text-left px-2'>Last Transactions:</h1>
<span className='bg-white bg-opacity-60 rounded-lg  dark:text-white'>
   <TransactionList transactionsList={newtransactionArray.slice(0, 3)} />
</span>
 
</section>

    

        </section>

        
        
    </main>
</div>
  )
}

export default ViewBudget