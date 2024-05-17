import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faMoneyBill1Wave, faCreditCard, faAddressCard, faIdCard  } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useAccountsContextAll } from '../../../context/AccountsContext';

function UpdateAccountForm({setAccountFormView, accountFormView, accountId}) {


   const {accDispatch, ACCOUNTS_ACTIONS, allAccountsList} = useAccountsContextAll()

    const [accountName, setAccountName] = useState('')
    const [amount, setAmount] = useState(0)
    const [anualInterest, setAnnualInterest] = useState(0)
    const [description, setDescription] = useState('')


    const [paymentDueDate, setPaymentDueDate] = useState(0)

    const [cutDate, setCutDate] = useState(0)

    const datesOptions = Array.from({ length: 31 }, (_, index) => index + 1);

    const [selectedAccount, setSelectedAccount ] = useState({})
   
    const [accountIcon, setAccountIcon] = useState(faMoneyCheckDollar)
    const [accountState, setAccountState] = useState('Debit Card')
    const [selectedColor, setSelectedColor] = useState('#000000'); // 

    const handleColorChange = (event) => {
      setSelectedColor(event.target.value); 
    };
    const handleIconChange = (icon) => {
        setAccountIcon(icon); // Actualizar el icono seleccionado
      };

      useEffect(()=> {
        const foundedId = allAccountsList.find(item => item.id === accountId)
        setSelectedAccount(foundedId)
      },[accountId])

      useEffect(()=> {
        if(selectedAccount == undefined) {
            return
        }
       setAmount(parseFloat(selectedAccount.account_amount) || 0)
       setAccountName(selectedAccount.account_name || '')
       setAccountIcon(selectedAccount.account_icon ? JSON.parse(selectedAccount.account_icon) : faMoneyBill1Wave)
       setSelectedColor(selectedAccount.account_color || '')
       setAccountState(selectedAccount.account_type || 'Debit Card')
       setAnnualInterest(selectedAccount.account_annualInterest || '')
       setDescription(selectedAccount.account_description || '')

       setPaymentDueDate(selectedAccount.account_paymentDueDate || '')

       setCutDate(selectedAccount.account_cutDate || '')

    
      },[selectedAccount]) 

      const predefinedColors = [
        'linear-gradient(137deg, rgba(250,188,48,0.9150035014005602) 46%, rgba(212,144,20,0.8785889355742297) 70%)',
  '      linear-gradient(137deg, rgba(48,193,250,0.8925945378151261) 46%, rgba(20,145,212,0.861782212885154) 61%)',
  'linear-gradient(118deg, rgba(169,118,255,0.7441351540616247) 59%, rgba(145,55,179,0.758140756302521) 77%)',
  'linear-gradient(118deg, rgba(118,255,181,0.7441351540616247) 59%, rgba(1,204,60,0.6320903361344538) 77%) green',
  'linear-gradient(118deg, rgba(230, 211, 169, 0.8) 40%, rgba(236, 223, 192, 0.8) 60%)',
  'linear-gradient(118deg, rgba(226, 223, 244, 0.8) 40%, rgba(238, 233, 233, 0.8) 60%)',
    ];

const predefinedIcons = [faMoneyCheckDollar, faMoneyBill1Wave, faCreditCard, faAddressCard, faIdCard ];
  
  

    const handleSubmit = (e)=> {
        e.preventDefault()

        accDispatch({type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT, payload: {
            id: accountId,
            data: {
            account_amount:amount,
            account_name: accountName,
            account_color: selectedColor,
            account_icon: JSON.stringify(accountIcon),
            account_type: selectedAccount.account_type,
            account_bank: selectedAccount.account_bank,
            account_currency: selectedAccount.account_currency,
             account_annualInterest: accountState == 'Saving Account' ? anualInterest : 'none',
            account_description: accountState == 'Saving Account' ? description : 'none',
             account_paymentDueDate: accountState == 'Credit Card' ? paymentDueDate : 'none',
            account_cutDate: accountState == 'Credit Card' ? cutDate : 'none'
    

            },   
        }})
    
        Swal.fire({
          icon: 'success',
          title: 'Well Done!',
          text: accountState + ' ' + 'succesfully Updated!'
        })
          setAccountFormView(false)
      }
  return (
    <div className={ accountFormView ? 'fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-center z-50 ' : 'hidden'}>

    <main className='relative bg-gray-100 rounded-xl shadow-2xl h-4/5 w-fit flex flex-col justify-center items-center py-8 px-2 overflow-y-scroll max-w-screen-md dark:text-black'>
        <button className='absolute right-5 top-2 text-xl font-semibold' onClick={()=> setAccountFormView(false)}>x</button>
        <h1 className='font-semibold text-xl mb-2'>Update Account Form</h1>

        <section className='flex gap-2 my-6'>
       <button className= {`bg-gray-100 rounded-lg py-2 px-4 font-semibold text-2xl ${accountState == 'Debit Card' ? 'bg-gray-300' : 'bg-gray-100 opacity-50'}`} onClick={() => setAccountState('Debit Card')}>Debit Card</button>
      
     </section>

        <form action="" className='flex flex-col justify-between items-center mb-7 w-full px-10 h-5/6 gap-5' onSubmit={handleSubmit} >
            

<div className='flex items-center flex-col gap-1 '>
  <label className='font-semibold text-lg'>Current Account Amount</label>
    <span className='flex items-center gap-2'>

         <div>
            <p>{selectedAccount ? selectedAccount.account_currency : ''}</p>
         </div>

            <input type="number" name='amount' value={amount} onChange={(e)=> setAmount(e.target.value)} className='min-h-24 w-4/5 shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-lg text-3xl text-center placeholder:text-3xl placeholder:opacity-45 ' placeholder='RD$00.00' />

      </span>
</div>
      

        <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Card name</label> 
                <input type="text" className='w-full h-12 border border-black px-6 bg-transparent' value={accountName} onChange={e => setAccountName(e.target.value)} placeholder='Primary...' />
              </span>


              <div>
            <p>{selectedAccount ? selectedAccount.account_bank : ''}</p>
         </div>


         {accountState == 'Saving Account' ?  <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Annual Interest</label> 
                <input type="text" className='w-full h-12 border border-black px-6' value={anualInterest} onChange={(e)=> setAnnualInterest(e.target.value)} placeholder='5%, 3%...' />
              </span> : null
            }
             
             {accountState == 'Saving Account' ?   <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Porpouse Description</label> 
                <input type="text" className='w-full h-12 border border-black px-6' value={description} onChange={(e)=> setDescription(e.target.value)} placeholder='Emergencies, Investment...' />
              </span> : null
            } 
            
              {accountState == 'Credit Card' ?   <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold '>Credit Cut Date</label> 
               <select onChange={(e)=> setCutDate(e.target.value)} value={cutDate} >
              {  datesOptions.map(date => <option key={date}>{date}</option>) }
               </select>
              </span> : null
            }

             {accountState == 'Credit Card' ?  <span className='w-full flex flex-col items-center gap-0.5'> 
              <label className='font-semibold ' >Payment Due Date</label> 
              <select value={paymentDueDate} onChange={(e)=> setPaymentDueDate(e.target.value)}>
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

export default UpdateAccountForm