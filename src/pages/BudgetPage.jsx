import React, { useState } from 'react'
import BudgetContainer from '../components/Budget/BudgetContainer'
import BudgetForm from '../components/Budget/Forms/BudgetForm'

function BudgetPage() {

    const [budgetFormView, setBudgetFormView] = useState(false)

  return (
    <div className='relative'>
         <BudgetContainer setBudgetFormView={setBudgetFormView}/>
        <BudgetForm setBudgetFormView={setBudgetFormView} budgetFormView={budgetFormView}/>
       

    </div>
  )
}

export default BudgetPage