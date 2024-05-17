import TransactionCard from '../../Helpers/Transactions/TransactionCard'


function TransactionList({transactionsList, dateFilter, dataFilter, typeFilter }) {

  
  return (
    <ul className='rounded-xl bg-white bg-opacity-55 shadow-xl px-3 py-5 flex flex-col gap-10 w-full mx-auto max-h-80 overflow-y-scroll dark:bg-gray-800 dark:bg-opacity-80'>
    {transactionsList ? transactionsList.length > 0 ?
    transactionsList.sort((a, b) => {
      const dateA = new Date(a.transaction_date);
      const dateB = new Date(b.transaction_date);
    
      return dateB - dateA;
    })
    .map(item => <TransactionCard transactionAmount={item.transaction_amount} transactionType={item.transaction_type} transactionId={item.id} transactionAccount={item.transaction_account} transactionCategory={item.transaction_category} transactionDate={item.transaction_date} transactionDescription={item.transaction_description} transactionLabels={item.transaction_labels} transactionCurrency={item.transaction_currency} transactionAccountDestination={item.transaction_accountDestination } key={item.id}/> ) :
 <h1>0 Elements :(</h1> 
 :  <h1>No Elements :(</h1> 
} 
 </ul> 
  )
}

export default TransactionList