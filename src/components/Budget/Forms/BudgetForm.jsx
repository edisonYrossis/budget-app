import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { useCategoriesContextAll } from '../../../context/CategoriesContext';
import { useBudgetContextAll } from '../../../context/BudgetContext';

function BudgetForm({setBudgetFormView, budgetFormView}) {

    const {allCategoriesList, labelsCategoryArray, setLabelsCategoryArray} = useCategoriesContextAll()
    const {dispatch, BUDGET_ACTIONS } = useBudgetContextAll()

    const [budgetTitle, setCategoryTitle] = useState('')
    const [selectedLabels, setSelectedLabels] = useState([])

    const currencyRef = useRef(null)
    const amountRef = useRef(null)
    const extraAmountRef = useRef(null)

    const [categoryState, setCategoryState] = useState('')
    const [budgetState, setbudgetState] = useState('Monthly')



    const handleSelectLabel = (labelId) => {
       const foundedLabel = labelsCategoryArray.find(label => label.id == labelId)
       const isLabelSelected = selectedLabels.find(label => label.id === labelId)
       if(isLabelSelected){
      return setSelectedLabels(prev => prev.filter(label => label.id !== labelId))
       }
        setSelectedLabels(prev => [...prev, foundedLabel])
    }

    useEffect(()=>{
        if(categoryState == '' || categoryState == 'select'){
            setLabelsCategoryArray([])
            return
        }
        const foundCategory = allCategoriesList.find(item => item.category_name == categoryState)
        const labels = foundCategory.category_labels
        setLabelsCategoryArray(labels)

    },[categoryState])



    const handleSubmit = (e)=> {
        e.preventDefault()

        dispatch({type: BUDGET_ACTIONS.ADD_BUDGET, payload: {
          budget_type: budgetState,
          budget_amount: parseFloat(amountRef.current.value),
          budget_extraAmount : extraAmountRef.current.value == '' ? 0 : parseFloat(extraAmountRef.current.value),
          budget_name: budgetTitle,
          budget_labels: selectedLabels,
          budget_category: categoryState,
          budget_currency: currencyRef.current.value,

        }})
    
        Swal.fire({
          icon: 'success',
          title: 'Well Done!',
          text: 'Category succesfully added'
        })

         amountRef.current.value = ''
         extraAmountRef.current.value = ''
         setCategoryState('')
         setbudgetState('Monthly')
          setBudgetFormView(false)
          setSelectedLabels([])
      }
  return (
    <div className={ budgetFormView ? 'fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-center z-50 dark:text-black ' : 'hidden'}>

    <main className='relative bg-gray-100 rounded-xl shadow-2xl h-4/5 w-fit flex flex-col justify-center items-center py-8 px-2 overflow-y-scroll max-w-screen-md'>
        <button className='absolute right-5 top-2 text-xl font-semibold' onClick={()=> {
            setBudgetFormView(false)
            setSelectedLabels([])
        }}>x</button>
        <h1 className='font-semibold text-xl mb-2'>New Budget Form</h1>

        <section className='flex gap-2 my-6'>
       <button className= {`bg-blue-100 rounded-lg py-2 px-4 font-semibold text-2xl ${budgetState == 'Monthly' ? 'bg-blue-300' : 'bg-blue-100 opacity-50'}`} onClick={() => setbudgetState('Monthly')}>Monthly</button>
       <button className={`bg-gray-200 rounded-lg py-2 px-4 font-semibold text-2xl ${budgetState == 'Weekly' ? 'bg-gray-300' : 'bg-gray-100 opacity-50'}`} onClick={() => setbudgetState('Weekly')}>Weekly</button>
     </section>

        <section className='flex flex-col justify-between items-center mb-7 w-full px-10 h-5/6 gap-2' >
            

 <div className='flex items-center flex-col gap-1 '>
  <label className='font-semibold text-lg'>Budget Amount</label>
    <span className='flex items-center gap-2'>

          <select
          className="block appearance-none w-fit h-fit  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline text-2xl" ref={currencyRef}
          >
          <option value="DOP">DOP</option>
          </select>

            <input type="number" name='amount' ref={amountRef} className='min-h-24 w-4/5 shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-lg text-3xl text-center placeholder:text-3xl placeholder:opacity-45 ' placeholder='RD$00.00'/>

      </span>
</div>

<div className='flex items-center flex-col gap-1 '>
  <label className='font-semibold text-lg'>Extra Amount (optional)</label>

    <span className='flex justify-end gap-2 w-full '>

            <input type="number" name='amount' ref={extraAmountRef} className='min-h-24 w-4/5 shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-lg text-3xl text-center placeholder:text-3xl placeholder:opacity-45 ' placeholder='RD$00.00'/>

      </span>
</div>
      



        <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Budget Name</label> 

                <input type="text" className='w-full h-12 border border-black px-6 dark:text-white' value={budgetTitle} onChange={(e) => setCategoryTitle(e.target.value)} placeholder='Healthy life, Transportation...' />
              </span>

              <select name="category" value={categoryState} className='dark:text-white' onChange={(e)=> setCategoryState(e.target.value)}>
                <option value="select">Select</option>
                { allCategoriesList && allCategoriesList.length > 0 ? allCategoriesList
                .filter(item => item.category_type == 'expense')
                .map(category => <option key={category.id} value={category.category_name}>{category.category_name}</option>)
                : <option value={'none'}>none</option>}

            </select>


              <section className='flex flex-col gap-2 items-center'>
                <label className='text-center w-full font-semibold text-lg my-8 '>Labels List</label>
                <ul className='flex overflow-x-scroll gap-2 w-4/6 min-w-44 bg-gray-200 px-6 py-6 rounded-md bg-opacity-60'>
                  {labelsCategoryArray && labelsCategoryArray.length > 0 ?  labelsCategoryArray
                  .map(label => <li key={label.id} style={{backgroundColor: label.label_color}} onClick={()=> handleSelectLabel(label.id)} className={`py-1.5 px-3 text-medium font-semibold rounded-lg flex justify-between items-center shadow-lg 
                  ${selectedLabels.find(item => item.id == label.id) ? 'opacity-100' : 'opacity-30'}` }><p>{label.label_name}</p> </li>) : <li >No Elements</li> }
                </ul>
              </section>

              <button className='bg-black text-white font-semibold rounded-sm w-full py-2 mt-8' onClick={handleSubmit}>Save</button>
        </section>
        
    </main>
</div>
  )
}

export default BudgetForm