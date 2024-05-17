import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faMoneyBill1Wave, faCreditCard, faAddressCard, faIdCard } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useAccountsContextAll } from '../../../context/AccountsContext';

function CategoriesForm({setAccountFormView, accountFormView}) {

  const amountRef = useRef(null)
  const currencyRef = useRef(null)
  const bankRef = useRef(null)
  const accountNameRef = useRef(null)
  const annualInterestRef = useRef(null)
  const descriptionRef = useRef(null)
  const paymentDueDateRef = useRef(null)
  const cutDateRef = useRef(null)

  const datesOptions = Array.from({ length: 31 }, (_, index) => index + 1);

    const {accDispatch, ACCOUNTS_ACTIONS} = useAccountsContextAll()

    const [accountIcon, setAccountIcon] = useState(faMoneyCheckDollar)
    const [accountState, setAccountState] = useState('Debit Card')
    const [selectedColor, setSelectedColor] = useState('#000000'); // 

    const handleColorChange = (event) => {
      setSelectedColor(event.target.value); 
    };
    const handleIconChange = (icon) => {
        setAccountIcon(icon); // Actualizar el icono seleccionado
      };

    const predefinedColors = [
        'linear-gradient(137deg, rgba(250,188,48,0.9150035014005602) 46%, rgba(212,144,20,0.8785889355742297) 70%)',
  '      linear-gradient(137deg, rgba(48,193,250,0.8925945378151261) 46%, rgba(20,145,212,0.861782212885154) 61%)',
  'linear-gradient(118deg, rgba(169,118,255,0.7441351540616247) 59%, rgba(145,55,179,0.758140756302521) 77%)',
  'linear-gradient(118deg, rgba(230, 211, 169, 0.8) 40%, rgba(236, 223, 192, 0.8) 60%)',
  'linear-gradient(118deg, rgba(226, 223, 244, 0.8) 40%, rgba(238, 233, 233, 0.8) 60%)',
    ];

    const predefinedIcons = [faMoneyCheckDollar, faMoneyBill1Wave, faCreditCard, faAddressCard, faIdCard ];
  

    const handleSubmit = (e)=> {
        e.preventDefault()

        accDispatch({type: ACCOUNTS_ACTIONS.ADD_ACCOUNT, payload: {
          account_amount:amountRef.current.value.toFixed(2),
            account_name: accountNameRef.current.value,
            account_type: accountState,
            account_currency: currencyRef.current.value,
            account_bank: bankRef.current.value,
            account_color: selectedColor,
            account_icon: JSON.stringify(accountIcon),
            account_annualInterest: accountState == 'Saving Account' ? annualInterestRef.current.value : 'none',
            account_description: accountState == 'Saving Account' ? descriptionRef.current.value : 'none',
            account_paymentDueDate: accountState == 'Credit Card' ? paymentDueDateRef.current.value : 'none',
            account_cutDate: accountState == 'Credit Card' ? cutDateRef.current.value : 'none'



        }})
    
        Swal.fire({
          icon: 'success',
          title: 'Well Done!',
          text: accountState + ' ' + 'succesfully added!'
        })
          setAccountFormView(false)

          console.log( {
            account_amount:amountRef.current.value.toFixed(2),
              account_name: accountNameRef.current.value,
              account_type: accountState,
              account_currency: currencyRef.current.value,
              account_bank: bankRef.current.value,
              account_color: selectedColor,
              account_icon: JSON.stringify(accountIcon),
              account_annualInterest: accountState == 'Saving Account' ? annualInterestRef.current.value : 'none',
              account_description: accountState == 'Saving Account' ? descriptionRef.current.value : 'none',
              account_paymentDueDate: accountState == 'Credit Card' ? paymentDueDateRef.current.value : 'none',
              account_cutDate: accountState == 'Credit Card' ? cutDateRef.current.value : 'none'
  
  
  
          })
      }
  return (
    <div className={ accountFormView ? 'fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-center z-50 ' : 'hidden'}>

    <main className='relative bg-gray-100 rounded-xl shadow-2xl h-4/5 w-full md:w-fit mx-4 flex flex-col justify-center items-center  px-8 overflow-y-scroll overflow-x-hidden mt-4'>
        <button className='absolute right-5 top-2 text-xl font-semibold' onClick={()=> setAccountFormView(false)}>x</button>
        <h1 className='font-semibold text-xl mb-2'>Account Form</h1>

        <section className='flex gap-2 my-6'>

          <button className= {`bg-custom-platinum rounded-lg py-2 px-4 font-semibold text-2xl ${accountState == 'Debit Card' ? 'bg-custom-platinum shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Debit Card')}>Debit Card</button>

          <button className= {`bg-custom-gold rounded-lg py-2 px-4 font-semibold text-2xl ${accountState == 'Credit Card' ? 'bg-custom-gold shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Credit Card')}>Credit Card</button>

          <button className= {`bg-blue-100 rounded-lg py-2 px-4 font-semibold text-2xl ${accountState == 'Saving Account' ? 'bg-blue-300 shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Saving Account')}>Saving Account</button>
          
     </section>

        <form action="" className='flex flex-col justify-between items-center mb-7 w-full px-10 h-5/6 gap-5' onSubmit={handleSubmit} >
            

<div className='flex items-center flex-col gap-1 '>
  <label className='font-semibold text-lg'>{accountState == 'Saving Account' ? 'Account Current Amount' : accountState == 'Credit Card' ? 'Credit Card Limit' : 'Card Balance'}</label>
    <span className='flex items-center gap-2'>

          <select
          className="block appearance-none w-fit h-fit  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline text-2xl" ref={currencyRef}
          >
          <option value="DOP">DOP</option>
          </select>

            <input type="number" name='amount' ref={amountRef} className='min-h-24 w-4/5 shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-lg text-3xl text-center placeholder:text-3xl placeholder:opacity-45 ' placeholder='RD$00.00'/>

      </span>
</div>
      

        <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >{accountState == 'Saving Account' ? 'Account Name' : 'Card Name'}</label> 
                <input type="text" className='w-full h-12 border border-black px-6' ref={accountNameRef} placeholder='Primary...' />
              </span>


              <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Bank</label> 
                <input type="text" className='w-full h-12 border border-black px-6' ref={bankRef} placeholder='Banreservas, Qik...' />
              </span>

            {accountState == 'Saving Account' ?  <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Annual Interest</label> 
                <input type="text" className='w-full h-12 border border-black px-6' ref={annualInterestRef} placeholder='5%, 3%...' />
              </span> : null
            }
             
             {accountState == 'Saving Account' ?   <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Porpouse Description</label> 
                <input type="text" className='w-full h-12 border border-black px-6' ref={descriptionRef} placeholder='Emergencies, Investment...' />
              </span> : null
            } 
            
              {accountState == 'Credit Card' ?   <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Credit Cut Date</label> 
               <select ref={cutDateRef} >
              {  datesOptions.map(date => <option key={date}>{date}</option>) }
               </select>
              </span> : null
            }

             {accountState == 'Credit Card' ?  <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Payment Due Date</label> 
              <select ref={paymentDueDateRef} >
              {  datesOptions.map(date => <option key={date}>{date}</option>) }
               </select>              </span> : null
            }
             
          

            
              

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

<div className="mb-5 mt-1 flex flex-col gap-0.5 justify-center w-fit px-4 py-1 bg-slate-400 rounded-lg">
                    <label className='text-white font-semibold'>Selected Icon</label>
                        <FontAwesomeIcon icon={accountIcon} size="3x" />
                    </div>

                    </div>
            </span>

                    <span className='w-full flex flex-col items-center gap-0.5 mt-5'> 
                    <label className='font-semibold ' >Chosee a color</label> 

                    <span className='flex gap-3'>
                    <input
                        type="color"
                        value={selectedColor}
                        onChange={handleColorChange}
                        className="p-2 rounded border border-gray-300"
                    />

           <div className='px-3 rounded-md ' style={{backgroundImage: selectedColor}}></div>  
                    </span>

                <div className="mt-4 flex flex-wrap">
                        {predefinedColors.map((color, index) => (
                        <div key={index} className="mr-4 mb-4 cursor-pointer" onClick={() => setSelectedColor(color)}>
                            <div className="w-8 h-8 rounded-full border border-gray-300" style={{ backgroundImage: color }}></div>
                        </div>
            ))}
        </div>

                    </span>

              <button className='bg-black text-white font-semibold rounded-sm w-full py-2 mt-8'>Save</button>
        </form>
        
    </main>
</div>
  )
}

export default CategoriesForm