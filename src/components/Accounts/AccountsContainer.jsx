import React, { useEffect, useState } from 'react'
import addNew from '../../assets/add.png'
import editImg from '../../assets/edit.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { useAccountsContextAll } from '../../context/AccountsContext'
import UpdateAccountForm from './Forms/UpdateAccountForm';


function AccountsContainer({setAccountFormView}) {
    const {allAccountsList, accDispatch, ACCOUNTS_ACTIONS} = useAccountsContextAll()

    const [accountState, setAccountState] = useState('Debit Card')
    const [updateFormView, setUpdateFormView] = useState(false)
    const [selectedAccountId, setSelectedAccountId] = useState('')
    const [showBtns, setShowBtns] = useState(false)

    const handleDeleteaccount = (accountId) => {
    accDispatch({type: ACCOUNTS_ACTIONS.DELETE_ACCOUNT, payload: accountId})
    }

    const handleUpdateaccount = (id) => {
          setSelectedAccountId(id)
          setUpdateFormView(true)
        }

  return (
    <div >
          <div className='py-5'>

          <div className='relative'>
          <UpdateAccountForm accountFormView={updateFormView} setAccountFormView={setUpdateFormView} accountId={selectedAccountId}/>
         </div>
    

    


        <section className='flex justify-between items-center px-2 mb-2'>

         <span className='flex justify-between items-center w-fit flex-grow'>
                        <h1 className='font-semibold text-2xl text-center'>Your Accounts</h1>
                        <span className='font-semibold text-xl text-center mr-6 text-green-700'>
                           {allAccountsList ? allAccountsList
                           .filter(item => item.account_type == accountState)
                           .length : 0}
                        </span>
                     </span>
           
             <button className={`rounded-full bg-green-300 w-fit h-fit px-2 py-2 opacity-70`} onClick={()=> setAccountFormView(true)} >
                <img src={addNew} className='w-6 h-6'/>
             </button>
             
        </section>

        
          <div className={` flex justify-between items-center rounded-lg py-3 shadow-md overflow-y-scroll ${accountState == 'Saving Account' ? 'bg-blue-100 bg-opacity-20' : accountState == 'Credit Card' ? 'bg-custom-gold bg-opacity-20' : accountState == 'Debit Card' ?  'bg-custom-platinum bg-opacity-20' : 'bg-green-100 bg-opacity-20'}`}>

              
                 <section className='flex gap-1 dark:text-black'>

                 <button className= {`bg-green-100 rounded-lg py-1 px-3 font-semibold text-lg ${accountState == 'Cash' ? 'bg-green-300 shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Cash')}>Cash</button>

                    <button className= {`bg-custom-platinum rounded-lg py-1 px-3 font-semibold text-lg ${accountState == 'Debit Card' ? 'bg-custom-platinum shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Debit Card')}>Debit Card</button>

                    <button className= {`bg-custom-gold rounded-lg py-1 px-3 font-semibold text-lg ${accountState == 'Credit Card' ? 'bg-custom-gold shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Credit Card')}>Credit Card</button>

                    <button className= {`bg-blue-100 rounded-lg py-1 px-3 font-semibold text-lg ${accountState == 'Saving Account' ? 'bg-blue-300 shadow-lg border-4 border-black' : 'bg-transparent opacity-40'}`} onClick={() => setAccountState('Saving Account')}>Saving Account</button>

                 </section>

             </div>
     
    <ul className='py-2 px-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4 mt-4'>
  {allAccountsList && allAccountsList.filter(item => item.account_type == accountState).length > 0 ? allAccountsList
  .filter(item => item.account_type == accountState)
  .map(item => <li className={`shadow-2xl rounded-lg overflow-hidden p-2 w-64 h-40 relative `} key={item.id} style={{backgroundImage : item.account_color}}  >
            
            <span className='flex justify-center items-center flex-col w-full h-full p-1'>
                     <section className='flex items-start w-full h-1/2 justify-between'>
            
                       <div className='flex gap-1.5 w-full items-center ' onClick={() => setShowBtns(true)}>
                     <FontAwesomeIcon icon={item.account_icon ? JSON.parse(item.account_icon) : faCoffee} size="lg" /> 
                      <h1 className='font-semibold text-xs'>{item.account_name}</h1>
                     </div>

                     <h1 className='font-semibold text-xs'>{item.account_bank}</h1>

                     </section>

                    {accountState == 'Credit Card' ?<section className='w-full h-1/2 flex justify-between gap-0.5 items-end'>                        
                    <span className='flex flex-col bg-gray-100 rounded-lg px-1 py-1 bg-opacity-15'>
                      <h1 className='font-semibold text-xs italic'>{'Cut Day ' + item.account_cutDate}</h1>
                        <h1 className='font-semibold text-xs italic'>{'Pay Day ' + item.account_paymentDueDate }</h1>
                    </span>

                    <span className='flex gap-1'>
                      <h1 className='font-semibold text-lg'>{item.account_currency}</h1>
                        <h1 className='font-semibold text-lg'>{item.account_amount + '.00'}</h1>
                    </span>
                      
                     </section>  
                     
                     : 

                     <section className='w-full h-1/2 flex justify-end gap-0.5 items-end'>                        
                       <h1 className='font-semibold text-lg'>{item.account_currency}</h1>
                        <h1 className='font-semibold text-lg'>{parseFloat(item.account_amount)}</h1>
                     </section>}

                     
           
         {showBtns && <div className='absolute top-0 w-full h-full flex justify-center items-center bg-white bg-opacity-40'>
          
              <span className='flex flex-grow justify-end'>
                <button className='h-1/6' onClick={() => handleUpdateaccount(item.id)}>
               <img src={editImg} alt="edit" className='w-5 h-5' />
            </button>
            
             <button className='ml-3 h-1/6' onClick={() => handleDeleteaccount(item.id)}>
              <p className='rounded-full bg-red-400 px-2'>x</p>
            </button>
              </span>

                <span className='relative w-1/3 h-full' onClick={() => setShowBtns(false)}>
              <button onClick={() => setShowBtns(false)} className='absolute top-2 right-3 bg-black rounded-full px-2 text-white flex items-center justify-center'>x</button>
            </span>
           </div>}
           
          
            </span>
        </li>)  : <li style={{backgroundImage : 'linear-gradient(118deg, rgba(118,255,181,0.7441351540616247) 59%, rgba(1,204,60,0.6320903361344538) 77%)'}}>
            
            <span className='flex justify-center items-center flex-col w-full h-full p-1'>
                  <h1>none</h1>
               </span>
            </li>
}
    </ul>
    </div>
    </div>
  )
}

export default AccountsContainer