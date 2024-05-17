import React, { useState } from 'react'
import CategoriesForm from '../components/categories/Forms/CategoriesForm'
import CategoriesContainer from '../components/categories/CategoriesContainer'

function CategoriesPage() {

    const [categoryFormView, setCategoryFormView] = useState(false)

  return (
    <div className='relative'>
         <CategoriesContainer setCategoryFormView={setCategoryFormView}/>
        <CategoriesForm categoryFormView={categoryFormView} setCategoryFormView={setCategoryFormView}/>
       

    </div>
  )
}

export default CategoriesPage