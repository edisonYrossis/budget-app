import React, { useState } from 'react'
import AccountForm from '../components/Accounts/Forms/AccountForm'
import AccountsContainer from '../components/Accounts/AccountsContainer'

function AccountsPage() {

    const [accountFormView, setAccountFormView] = useState(false)

  return (
    <div className='relative'>
         <AccountsContainer setAccountFormView={setAccountFormView}/>
{       <AccountForm accountFormView={accountFormView} setAccountFormView={setAccountFormView}/>
}       

    </div>
  )
}

export default AccountsPage