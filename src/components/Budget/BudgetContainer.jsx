import React, { useEffect, useState } from 'react'
import addNew from '../../assets/add.png'
import { useCategoriesContextAll } from '../../context/CategoriesContext'
import { useBudgetContextAll } from '../../context/BudgetContext'
import ViewBudget from './helpers/ViewBudget'
import ProgressBar from "@ramonak/react-progress-bar";
import { useTransactionContextAll } from '../../context/TransactionContext'




function BudgetContainer({setBudgetFormView}) {
    const {allCategoriesList} = useCategoriesContextAll()
    const {allBudgetList} = useBudgetContextAll()
    const {
      allTransactionsList,
      } = useTransactionContextAll()
    

    const [ViewBudgetState, setBudgetViewState] = useState(false)
    const [categoryState, setCategoryState] = useState('All')
    const [selectedBudgetId, setSelectedBudgetId] = useState('')

    const handleProgressBar = (current) => {

      const budgetLabels = current.map(l => l.label_name)
      const newArr = allTransactionsList
      .filter(tr => tr.transaction_labels.some(item => budgetLabels.includes(item.label_name)))

     return newArr.reduce((acc, e) => acc + parseFloat(e.transaction_amount), 0)
    }


  return (
    <div>
          <div className='py-5'>
        <section className='flex justify-between items-center px-2'>


      <div className='relative'>

         <ViewBudget setBudgetView={setBudgetViewState} budgetView={ViewBudgetState} budgetId={selectedBudgetId} />
      </div>




            <section className='flex flex-col gap-3 w-full items-center '>
                 
                 <section className='flex gap-1 w-full items-center justify-between'>
                   <span className='flex justify-between items-center flex-grow'>
                            <h1 className='font-semibold text-2xl text-center'>Your Budgets</h1>
                            <span className='font-semibold text-xl text-center mr-6 text-green-700 '>
                                {allBudgetList ? allBudgetList
                                .filter(item => {
                                    if(categoryState == 'All'){
                                        return item
                                    }
                                   return item.budget_category == categoryState
                                   })
                                .length : 0}
                            </span>
                        </span>
                        <button className={`rounded-full bg-blue-300 w-fit h-fit px-3 py-3 opacity-70 `} onClick={()=> setBudgetFormView(true)} >
                <img src={addNew} className='w-6 h-6'/>
             </button>
                 </section>
                 
                  

        <span className='flex gap-2 items-center w-full'>

             <div className={`flex-grow flex justify-between items-center rounded-lg py-3 md:py-4 px-2 md:text-2xl shadow-md bg-blue-400 bg-opacity-70 overflow-x-scroll  dark:text-black`}>

             
           
                 <section className='flex gap-2'>
                 <p className={`bg-gray-200 rounded-lg py-1 md:py-2 md:text-2xl px-4 font-semibold text-lg ${categoryState == 'All' ? 'bg-opacity-100' : 'bg-opacity-45' }`} onClick={() => setCategoryState('All')}>All</p>
                   {allCategoriesList && allCategoriesList.length > 0 ? allCategoriesList
                   .filter(category => category.category_type == 'expense')
                   .map(category => <p key={category.id} className={`rounded-lg py-1 md:py-2 px-4 font-semibold text-lg ${categoryState == category.category_name ? 'bg-opacity-100' : 'opacity-45' }`} onClick={()=> setCategoryState(category.category_name)}  style={{backgroundColor: category.category_color}}>{category.category_name}</p>)
                :
                <h1>There's no categories</h1>
                }
                 </section>

             </div>
            
               </span>
            </section>

         
            
             
        </section>
     
    <ul className='py-4 px-1 grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
  {allBudgetList && allBudgetList.length > 0 ? allBudgetList
  .filter(item => {
    if(categoryState == 'All'){
        return item
    }
    return item.budget_category == categoryState
   })
  .map(budget => <li className={`shadow-lg py-2 rounded-lg dark:bg-gray-700 dark:bg-opacity-60`} key={budget.id} onClick={()=> {
    setSelectedBudgetId(budget.id)
    setBudgetViewState(true)
  }}>
            
            <span className='flex justify-between w-full px-3 py-1 '>

            <span className='w-full'>
              <div className='w-full font-semibold text-center'>{budget.budget_type}</div>
                 <div className='flex justify-between w-full items-start'>
               <h1 className='font-semibold'>{budget.budget_name}</h1>
                <h1 className='font-semibold text-lg'>{'RD$' + budget.budget_amount + '.00'}</h1>
                 </div>

                 <div className='w-full py-1.5 flex flex-col gap-1'>
                  <ProgressBar completed={(handleProgressBar(budget.budget_labels) / budget.budget_amount).toFixed(3) * 100 } maxCompleted={100} bgColor='#0f0f0f' /> 

                  <span className='w-full flex justify-between'>
                      <span className='flex text-xs font-medium'>
                      <h1>Current</h1>
                      <p>{`: ${handleProgressBar(budget.budget_labels)}.00`}</p>
                      </span>

                      <span className='flex text-xs font-medium'>
                      <h1>Remaining</h1>
                      <p>{`: ${budget.budget_amount - handleProgressBar(budget.budget_labels)}.00`}</p>
                      </span>
                  </span>
                 </div>

         <div className={`w-full flex justify-between items-center rounded-lg py-1 px-1 bg-transparent overflow-x-scroll`}>      
            
            <section className='flex gap-2  dark:text-black'>
         {budget.budget_labels
            .map(label => <p key={label.id} className={`rounded-md py-0.5 px-2 font-semibold text-sm shadow-lg border border-black`} style={{backgroundColor: label.label_color}}>{label.label_name}</p>)
            }
            </section>
        </div>
              
            </span>

                <span>
         {/*  {  <button className='h-1/6' onClick={() => handleUpdateBudget(budget.id)}>
               <img src={editImg} alt="edit" className='w-7 h-7' />
            </button>
            
             <button className='ml-3 h-1/6' onClick={() => handleDeleteBudget(budget.id)}>
              <p className='rounded-full bg-red-400 py-0.5 px-2.5'>x</p>
            </button>} */}
                </span>

           
            </span>
        </li>)  : <li>There's no elements</li> 
}
    </ul>
    </div>
    </div>
  )
}

export default BudgetContainer