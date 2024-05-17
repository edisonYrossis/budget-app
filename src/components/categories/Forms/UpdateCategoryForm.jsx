import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faPencil, faFlag, faBoltLightning, faUserTie, faBookBookmark, faGlobe, faBaseballBatBall, faHeartPulse, faSyringe, faCalculator, faMoneyCheckDollar, faMoneyBill1Wave, faEarthAfrica, faChartSimple ,faHeart, faStar, faCoffee, faTrainTram, faTrainSubway, faBus, faCar, faGraduationCap, faHouse, faUtensils, faTv, faUserGroup, faDumbbell, faBagShopping, faGift, faMobileButton } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import addNew from '../../../assets/add.png'
import { useCategoriesContextAll } from '../../../context/CategoriesContext';
import AddLabelForm from '../../../helpers/AddLabelForm';

function CategoriesForm({setCategoryUpdateFormView, categoryUpdateFormView, categoryId}) {

  const {dispatch, CATEGORIES_ACTIONS, allCategoriesList, labelsCategoryArray, setLabelsCategoryArray, predefinedColors, currentColor, setCurrentColor} = useCategoriesContextAll()
    const [categoryTitle, setCategoryTitle] = useState('')
    const [categoryIcon, setCategoryIcon] = useState(faCoffee)
    const [selectedCategory, setSelectedCategory] = useState({})
    const [labelFormView, setLabelFormView] = useState(false)

    const [transactionState, setTransactionState] = useState('expense')

    const handleColorChange = (event) => {
      setCurrentColor(event.target.value); 
    };
    const handleIconChange = (icon) => {
        setCategoryIcon(icon); // Actualizar el icono seleccionado
      };


    const predefinedIcons = [faLaptop, faPencil, faFlag, faBoltLightning, faUserTie, faBookBookmark, faGlobe, faBaseballBatBall, faHeartPulse, faSyringe, faCalculator, faMoneyCheckDollar, faMoneyBill1Wave, faEarthAfrica, faChartSimple ,faHeart, faStar, faCoffee, faTrainTram, faTrainSubway, faBus, faCar, faGraduationCap, faHouse, faUtensils, faTv, faUserGroup, faDumbbell, faBagShopping, faGift, faMobileButton];
  
    useEffect(()=> {
        const foundedId = allCategoriesList.find(item => item.id === categoryId)
        setSelectedCategory(foundedId)
      },[categoryId])

    useEffect(()=> {
        if(selectedCategory == undefined) {
            return
        }
       setCategoryTitle(selectedCategory.category_name || '')
       setCurrentColor(selectedCategory.category_color || '#E5797E')
       setCategoryIcon(selectedCategory.category_icon ? JSON.parse(selectedCategory.category_icon) : faCoffee)
       setTransactionState(selectedCategory.category_type || '')
       setLabelsCategoryArray(selectedCategory.category_labels || [])

      },[selectedCategory])

      const handleDeleteLabel = (labelId) => {
        setLabelsCategoryArray(prev => prev.filter(label => label.id !== labelId) )  
      }


    const handleSubmit = (e)=> {
        e.preventDefault()

        dispatch({type: CATEGORIES_ACTIONS.UPDATE_CATEGORY, payload: {
          id: categoryId,
          data: {
          category_type: transactionState,
          category_name: categoryTitle,
          category_icon: JSON.stringify(categoryIcon),
          category_color: currentColor,
          category_labels: labelsCategoryArray
           
          }}})
    
        Swal.fire({
          icon: 'success',
          title: 'Well Done!',
          text: 'Category succesfully added'
        })
        
          setLabelsCategoryArray([])
          setCategoryUpdateFormView(false)
          
      }
  return (
    <div className={ categoryUpdateFormView ? 'fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-center z-50 ' : 'hidden'}>

    <main className='relative bg-gray-100 rounded-xl shadow-2xl h-4/5 w-fit flex flex-col justify-center items-center py-8 px-1 md:px-10 overflow-y-scroll max-w-screen-md'>
        <button className='absolute right-5 top-2 text-xl font-semibold dark:text-black' onClick={()=> {
          setCategoryUpdateFormView(false)
          setLabelsCategoryArray([])
          }}>x</button>
        <h1 className='font-semibold text-xl mb-2'>Update Category Form</h1>

        <section className='flex gap-2 my-6'>
       <button className= {`bg-red-100 rounded-lg py-2 px-4 font-semibold text-2xl ${transactionState == 'expense' ? 'bg-red-300' : 'bg-red-100 opacity-50'}`} onClick={() => setTransactionState('expense')}>Expense</button>
       <button className={`bg-green-100 rounded-lg py-2 px-4 font-semibold text-2xl ${transactionState == 'income' ? 'bg-green-300' : 'bg-green-100 opacity-50'}`} onClick={() => setTransactionState('income')}>Income</button>
     </section>

        <div action="" className='flex flex-col justify-between items-center mb-7 w-full px-10 h-5/6 gap-2'  >
            
        <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Category name</label> 
                <input type="text" className='w-full h-12 border border-black px-6 bg-transparent' value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} placeholder='Health, Home...' />
              </span>

              <span className='w-full flex justify-center my-4'>

<div className={labelFormView ? 'hidden' : 'flex justify-center flex-col gap-2 items-center'}>
   <label className={labelFormView ? 'hidden ' : 'block font-bold text-lg'}>Add Label</label>

<button className={labelFormView ? 'hidden' : 'block'} onClick={()=> setLabelFormView(true)}>
<img src={addNew} className='w-16 h-16 py-1.5 px-1.5 rounded-full bg-gray-300'/>
</button>
</div>



<AddLabelForm labelFormView={labelFormView} setLabelFormView={setLabelFormView}/>
</span>

<section>
<label className='text-center w-full font-semibold text-lg my-6'>Label List</label>
<ul className='grid grid-cols-3 md:grid-cols-5 gap-2'>
  {labelsCategoryArray && labelsCategoryArray.length > 0 ?  labelsCategoryArray
  .map(label => <li key={label.id} style={{backgroundColor: label.label_color}} className='py-1 px-1 text-sm font-semibold rounded-lg flex justify-between items-center'><p>{label.label_name}</p> <button className='bg-red-300 py-0.5 px-2 rounded-full ' onClick={()=> handleDeleteLabel(label.id)}>x</button></li>) : <li>No Labels yet</li> }
</ul>

</section>

            <span className='mt-5'>
                <label className='font-semibold ' >Choose an Icon</label>
                <div className='flex flex-col items-center justify-center'>
                    <div className="flex flex-wrap mt-2">
                        {predefinedIcons.map((icon, index) => (
                        <div key={index} className="mr-4 mb-4 cursor-pointer" onClick={() => handleIconChange(icon)}>
                            <FontAwesomeIcon icon={icon} size="2x" />
                        </div>
                        ))}
                              
                    </div>

<div className="mb-5 mt-1 flex flex-col gap-0.5 justify-center w-fit px-4 py-1 rounded-lg"  style={{backgroundColor: currentColor}}>
                    <label className='text-white font-semibold'>Selected Icon</label>
                        <FontAwesomeIcon icon={categoryIcon ? categoryIcon : faCoffee} size="3x" />
                    </div>

                    </div>
            </span>

            <span className='w-full flex flex-col items-center gap-0.5 mt-5'> 
                    <label className='font-semibold ' >Chosee a color</label> 

                    <span className='flex gap-3'>
                    <input
                        type="color"
                        value={currentColor}
                        onChange={handleColorChange}
                        className="p-2 rounded border border-gray-300"
                    />

                    </span>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-5">
                        {predefinedColors.map((color, index) => (
                        <div key={index} className="mr-4 mb-4 cursor-pointer" onClick={() => setCurrentColor(color.main_color)}>
                          <span className='flex gap-2 items-center'>
                            <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundColor: color.main_color }}></div>
                                 <span className='grid grid-cols-3 gap-0.5'>
                                    {color.colors.map((color, index) => <div key={index} className="w-4 h-4 rounded-lg border border-gray-300" style={{ backgroundColor: color }}></div> )}

                                  </span>
                            </span>              
                            

                          


                        </div>                
            ))}
        </div>

                    </span>

              <button className='bg-black text-white font-semibold rounded-sm w-full py-2 mt-8' onClick={handleSubmit}>Save</button>
        </div>
        
    </main>
</div>
  )
}

export default CategoriesForm