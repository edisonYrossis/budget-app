import React, { useEffect, useState } from 'react'
import addNew from '../../assets/add.png'
import editImg from '../../assets/edit.png'
import { useCategoriesContextAll } from '../../context/CategoriesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import UpdateCategoryForm from '../categories/Forms/UpdateCategoryForm'



function CategoriesContainer({setCategoryFormView}) {
    const {allCategoriesList, dispatch, CATEGORIES_ACTIONS} = useCategoriesContextAll()

    const [transactionState, setTransactionState] = useState('expense')
    const [updateFormView, setUpdateFormView] = useState(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState('')

    const handleDeleteCategory = (categoryId) => {
      Swal.fire({
         title: "Do you want to delete this category?",
         showCancelButton: true,
         confirmButtonText: "Delete",
       }).then((result) => {
         if (result.isConfirmed) {
           Swal.fire("Deleted!", "", "success");
            dispatch({type:CATEGORIES_ACTIONS.DELETE_CATEGORY, payload: categoryId})
         } 
       });
    }

    const handleUpdateCategory = (id) => {
          setSelectedCategoryId(id)
          setUpdateFormView(true)
        }

  return (
    <div className='dark:text-black'>
          <div className='py-5'>


        <section className='flex justify-between flex-col items-center gap-2 px-2'>

        <button className={`rounded-full bg-green-300 w-fit h-fit px-3 py-3 opacity-70 ${transactionState == 'expense' ? 'bg-red-400' : 'bg-green-400' }`} onClick={()=> setCategoryFormView(true)} >
                <img src={addNew} className='w-6 h-6'/>
             </button>

        <div className='relative'>
          <UpdateCategoryForm categoryUpdateFormView={updateFormView} setCategoryUpdateFormView={setUpdateFormView} categoryId={selectedCategoryId}/>
      </div>

             <div className={`flex-grow flex justify-between items-center rounded-lg py-4 px-2 shadow-md ${transactionState == 'expense' ? 'bg-red-100 bg-opacity-70' : 'bg-green-100 bg-opacity-70' }`}>

              <span className='flex justify-between items-center flex-grow'>
                 <h1 className='font-semibold text-sm sm:text-2xl text-left sm:text-center'>Your Categories</h1>
                 <span className='font-semibold text-xl text-center mr-6 text-green-700'>
                    {allCategoriesList ? allCategoriesList
                    .filter(item => item.category_type == transactionState)
                    .length : 0}
                 </span>
              </span>

                 <section className='flex gap-2'>
                    <button className= {`bg-red-100 rounded-lg py-2 px-4 font-semibold text-lg sm:text-2xl ${transactionState == 'expense' ? 'bg-red-300' : 'bg-red-100 opacity-50'}`} onClick={() => setTransactionState('expense')}>Expense</button>
                    <button className={`bg-green-100 rounded-lg py-2 px-4 font-semibold text-lg sm:text-2xl ${transactionState == 'income' ? 'bg-green-300' : 'bg-green-100 opacity-50'}`} onClick={() => setTransactionState('income')}>Income</button>
                 </section>

             </div>
             
        </section>
     
    <ul className='py-4 px-1 flex flex-col gap-3 mt-4'>
  {allCategoriesList && allCategoriesList.length > 0 ? allCategoriesList
  .filter(item => item.category_type == transactionState)
  .map(category => <li className={`shadow-md py-2 rounded-lg`} key={category.id} style={{backgroundColor : category.category_color}}>
            
            <span className='flex justify-between w-full px-3 py-2 '>
            <span className='flex-grow text-left px-2 flex gap-3 items-center'>
                <div>
                <FontAwesomeIcon icon={category.category_icon ? JSON.parse(category.category_icon) : faCoffee} size="2x" /> 
                </div>
                <div>
                     <h1 className='font-semibold text-lg'>{category.category_name}</h1>
                </div>
                
            </span>
           
            <button className='h-1/6' onClick={() => handleUpdateCategory(category.id)}>
               <img src={editImg} alt="edit" className='w-7 h-7' />
            </button>
            
             <button className='ml-3 h-1/6' onClick={() => handleDeleteCategory(category.id)}>
              <p className='rounded-full bg-red-400 py-0.5 px-2.5'>x</p>
            </button>
            </span>
        </li>)  : <li>There's no elements</li> 
}
    </ul>
    </div>
    </div>
  )
}

export default CategoriesContainer