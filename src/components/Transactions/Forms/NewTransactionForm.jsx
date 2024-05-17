import { format } from "date-fns";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { useTransactionContextAll } from "../../../context/TransactionContext";
import { useCategoriesContextAll } from "../../../context/CategoriesContext";
import { useAccountsContextAll } from "../../../context/AccountsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker } from "antd";

function NewTransactionForm({ transactionView, setTransactionView }) {
  const {allTransactionsList , dispatch, TRANSACTIONS_ACTIONS } = useTransactionContextAll();
  const { allCategoriesList, labelsCategoryArray, setLabelsCategoryArray } =
    useCategoriesContextAll();
  const [selectedLabels, setSelectedLabels] = useState([]);

  const { allAccountsList, ACCOUNTS_ACTIONS, accDispatch } = useAccountsContextAll();

  const [transactionState, setTransactionState] = useState("expense");
  const [categoryState, setCategoryState] = useState("");
  const [accountState, setAccountState] = useState({});
  const [toAccountState, setToAccountState] = useState({});

  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)


  const [currentDateState, setCurrentDateState] = useState(new Date());
  const [transactionAmount, setTransactionAmount] = useState('')
  const [description, setDescription] = useState('')
  
  const currencyRef = useRef(null);

  const formatedDate = format(currentDateState, "EEEE dd MMM yyyy hh:mm").toUpperCase();

  const handleSelectLabel = (labelId) => {
    const foundedLabel = labelsCategoryArray.find(
      (label) => label.id == labelId
    );
    const isLabelSelected = selectedLabels.find(
      (label) => label.id === labelId
    );
    if (isLabelSelected) {
      return setSelectedLabels((prev) =>
        prev.filter((label) => label.id !== labelId)
      );
    }
    setSelectedLabels((prev) => [...prev, foundedLabel]);
  };

  const handleSelectedAccount = (accountId) => {
    const foundedAccount = allAccountsList.find(acc => acc.id == accountId)
    setAccountState(foundedAccount)
  }

  const handleSelecteCategory = (categoryId) => {
    const foundedCategory = allCategoriesList.find(cat => cat.id == categoryId)
    setCategoryState(foundedCategory)
  }

  const handleSelectedToAccount = (accountId) => {
    const foundedAccount = allAccountsList.find(acc => acc.id == accountId)
    setToAccountState(foundedAccount)
  }

  const handleUpdateAccountAmount = () => {
     
       accDispatch({type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT, payload: { 
        id: accountState.id,
        data: { 
          ...accountState,
          account_amount: transactionState == 'income' ? parseFloat(accountState.account_amount) + parseFloat(transactionAmount) : parseFloat(accountState.account_amount) - parseFloat(transactionAmount)
        }
      }})
  }

  const handleUpdateToAccountAmount = () => {
     
    accDispatch({type: ACCOUNTS_ACTIONS.UPDATE_ACCOUNT, payload: { 
     id: toAccountState.id,
     data: { 
       ...toAccountState,
       account_amount: parseFloat(toAccountState.account_amount) + parseFloat(transactionAmount)
     }
   }})
}



  const handleTransactionSubmit = () => {
    const currency = currencyRef.current.value;

    const new_transaction = {
      transaction_type: transactionState,
      transaction_amount: parseFloat(transactionAmount).toFixed(2),
      transaction_currency: currency,
      transaction_category:
        transactionState !== "transfer" ? categoryState.category_name : "none",
      transaction_account: {
        id: accountState.id,
        account_name: accountState.account_name,
        account_icon: accountState.account_icon,
        account_color: accountState.account_color,
      },
      transaction_accountDestination:
        transactionState == "transfer"
          ? {
              id: toAccountState.id,
              account_name: toAccountState.account_name,
              account_icon: toAccountState.account_icon,
              account_color: toAccountState.account_color,
            }
          : {},
      transaction_description: transactionState == "transfer" ? "none" : description !== '' ? description : `${selectedLabels.map(label => label.label_name)
        .join('-')}` ,
      transaction_date: currentDateState.toISOString(),
      transaction_labels: transactionState !== "transfer" ? selectedLabels : [],
    };

    dispatch({
      type: TRANSACTIONS_ACTIONS.ADD_TRANSACTION,
      payload: new_transaction,
    });

    setTransactionView(false);
    Swal.fire({
      title: "Done!",
      icon: "success",
    });

    setTransactionAmount(0)
   setDescription('')
    setAccountState({});
    setSelectedLabels([]);
    handleUpdateAccountAmount()

    if(transactionState == 'transfer'){
      handleUpdateToAccountAmount()
    }
  };



  useEffect(() => {
    if (categoryState == "" || categoryState == "select") {
      setLabelsCategoryArray([]);
      return;
    }
    const foundCategory = allCategoriesList.find(
      (item) => item.category_name == categoryState.category_name
    );
    const labels = foundCategory.category_labels;
    setLabelsCategoryArray(labels);
  }, [categoryState]);

  
useEffect(()=> {
  setCurrentDateState(new Date())
}, [transactionView])


  return (
    <div
      className={
        transactionView
          ? "fixed top-0 left-0 w-full h-screen backdrop-blur-sm bg-black bg-opacity-20 flex justify-center items-start py-16 z-50"
          : "hidden"
      }
    >
      <main className="relative bg-gray-100 rounded-xl shadow-2xl h-4/5 w-full md:w-fit mx-4 flex flex-col justify-center items-center  px-8 overflow-y-scroll overflow-x-hidden mt-4 dark:bg-[#272727] dark:text-black">
        <h1 className="absolute top-3 font-bold text-xl dark:text-white">Transaction</h1>

        <div
          className="flex flex-col gap-3 h-4/5 w-full items-center"
        >
        

          <section  className="flex overflow-x-scroll gap-2 w-full min-h-24 min-w-44 px-2 py-6 rounded-md  ">
            <button
              className={`bg-red-100 rounded-lg py-2 px-4 font-semibold text-2xl ${
                transactionState == "expense"
                  ? "bg-red-400"
                  : "bg-red-100 opacity-50"
              }`}
              onClick={() => setTransactionState("expense")}
            >
              Expense
            </button>
            <button
              className={`bg-green-100 rounded-lg py-2 px-4 font-semibold text-2xl ${
                transactionState == "income"
                  ? "bg-green-400"
                  : "bg-green-100 opacity-50"
              }`}
              onClick={() => setTransactionState("income")}
            >
              Income
            </button>
            <button
              className={`bg-cyan-100 rounded-lg py-2 px-4 font-semibold text-2xl ${
                transactionState == "transfer"
                  ? "bg-cyan-300"
                  : "bg-cyan-100 opacity-50"
              }`}
              onClick={() => setTransactionState("transfer")}
            >
              Transfer
            </button>
          </section> 
          
           <span className="flex items-center gap-2">
            <select
              className="block appearance-none w-fit h-fit  bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-xl shadow leading-tight focus:outline-none focus:shadow-outline text-2xl"
              ref={currencyRef}
            >
              <option value="DOP">DOP</option>
            </select>

            <input
              type="number"
              name="amount"
              step={"00.01"}
              value={transactionAmount}
              onChange={(e)=> setTransactionAmount(e.target.value)}
              className="min-h-24 w-4/5 shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-lg text-4xl text-center placeholder:text-3xl placeholder:opacity-45 placeholder:text-black dark:bg-opacity-30 "
              placeholder="RD$00.00"
            />
          </span>

          {transactionState == "expense" ? (
            <>

      {/*  lista de cuentas  */}             
              <ul className="flex overflow-x-scroll gap-2 w-full min-h-36 min-w-44 bg-gray-200 dark:bg-opacity-30 px-4 py-6 rounded-md bg-opacity-60">
                {allAccountsList && allAccountsList.length > 0 ? (
                  allAccountsList
                  .filter(ac => ac.account_type !== 'Saving Account')
                  .sort((a, b)=> {
                    if(a.account_type === 'Cash'){
                      return -1 
                    }
                    else if(b.account_type === 'Cash'){
                      return 1 
                    }
                    else { 
                      return 0
                    }

                  })
                  .map((account) => (
                    <li
                      key={account.id}
                      style={{ backgroundImage: account.account_color }}
                      onClick={() => handleSelectedAccount(account.id)}
                      className={`py-3 min-w-28 min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between
                        ${
                          accountState.id === account.id
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                     
                     <span className="w-full flex justify-between items-center">
                        <FontAwesomeIcon 
                      icon={JSON.parse(account.account_icon)}
                      size="xs" />

                      <p className="text-sm">{account.account_name}</p>
                     </span>
                    

                      <span className="flex place-content-center w-full gap-1 text-lg bg-gray-200 rounded-md bg-opacity-40 px-2">
                      <p>{account.account_currency}</p>
                      <p>{account.account_amount}</p>
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>

                 {/*  lista de categorias  */}             
       <ul className="flex overflow-x-scroll gap-2 w-full min-h-24 min-w-44 dark:bg-opacity-30 bg-gray-200 px-4 py-6 rounded-md bg-opacity-60">
                {allCategoriesList && allCategoriesList.length > 0 ? (
                  allCategoriesList
                  .filter(cat => cat.category_type === transactionState)
                  .map((category) => (
                    <li
                      key={category.id}
                      style={{ backgroundColor: category.category_color }}
                      onClick={() => handleSelecteCategory(category.id)}
                      className={`py-3 min-w-fit min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between
                        ${
                          categoryState.id === category.id
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                     
                     <span className="w-full flex justify-between items-center gap-2">
                        <FontAwesomeIcon 
                      icon={JSON.parse(category.category_icon)}
                      size="xs" />

                      <p className="text-sm">{category.category_name}</p>
                     </span>
                    
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>

                        {/*  lista de labels  */}    

    <section className="flex flex-col items-center">
              <label className="text-center w-full font-semibold text-lg my-2  dark:text-white">
                Labels List
              </label>
              <ul className="flex overflow-x-scroll gap-2 w-4/6 min-w-44 bg-gray-200 dark:bg-opacity-30 px-6 py-6 rounded-md bg-opacity-60">
                {labelsCategoryArray && labelsCategoryArray.length > 0 ? (
                  labelsCategoryArray.map((label) => (
                    <li
                      key={label.id}
                      style={{ backgroundColor: label.label_color }}
                      onClick={() => handleSelectLabel(label.id)}
                      className={`py-1.5 px-3 text-medium font-semibold rounded-lg flex justify-between items-center shadow-lg 
                        ${
                          selectedLabels.find((item) => item.id == label.id)
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                      <p>{label.label_name}</p>{" "}
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>
            </section>         


            </>
          ) : transactionState == "income" ? (
            <>
         

           {/*  lista de cuentas  */}             
              <ul className="flex gap-2 overflow-x-scroll w-full min-h-36 min-w-44 bg-gray-200 px-4 py-6 rounded-md bg-opacity-60">
                {allAccountsList && allAccountsList.length > 0 ? (
                  allAccountsList
                  .filter(ac => ac.account_type !== 'Saving Account')
                  .sort((a, b)=> {
                    if(a.account_type === 'Cash'){
                      return -1 
                    }
                    else if(b.account_type === 'Cash'){
                      return 1 
                    }
                    else { 
                      return 0
                    }

                  })
                  .map((account) => (
                    <li
                      key={account.id}
                      style={{ backgroundImage: account.account_color }}
                      onClick={() => handleSelectedAccount(account.id)}
                      className={`py-3 min-w-28 min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between
                        ${
                          accountState.id === account.id
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                     
                     <span className="w-full flex justify-between items-center">
                        <FontAwesomeIcon 
                      icon={JSON.parse(account.account_icon)}
                      size="xs" />

                      <p className="text-sm">{account.account_name}</p>
                     </span>
                    

                      <span className="flex place-content-center w-full gap-1 text-lg bg-gray-200 rounded-md bg-opacity-40 px-2">
                      <p>{account.account_currency}</p>
                      <p>{account.account_amount}</p>
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>

                 {/*  lista de categorias  */}             
       <ul className="flex overflow-x-scroll gap-2 w-full min-h-24 min-w-44 bg-gray-200 px-4 py-6 rounded-md bg-opacity-60">
                {allCategoriesList && allCategoriesList.length > 0 ? (
                  allCategoriesList
                  .filter(cat => cat.category_type === transactionState)
                  .map((category) => (
                    <li
                      key={category.id}
                      style={{ backgroundColor: category.category_color }}
                      onClick={() => handleSelecteCategory(category.id)}
                      className={`py-3 min-w-fit min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between
                        ${
                          categoryState.id === category.id
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                     
                     <span className="w-full flex justify-between items-center gap-2">
                        <FontAwesomeIcon 
                      icon={JSON.parse(category.category_icon)}
                      size="xs" />

                      <p className="text-sm">{category.category_name}</p>
                     </span>
                    
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>

          {/*  lista de labels  */}

          <section className="flex flex-col items-center">
              <label className="text-center w-full font-semibold text-lg my-2 dark:text-white ">
                Labels List
              </label>
              <ul className="flex overflow-x-scroll gap-2 w-4/6 min-w-44 bg-gray-200 px-6 py-6 rounded-md bg-opacity-60">
                {labelsCategoryArray && labelsCategoryArray.length > 0 ? (
                  labelsCategoryArray.map((label) => (
                    <li
                      key={label.id}
                      style={{ backgroundColor: label.label_color }}
                      onClick={() => handleSelectLabel(label.id)}
                      className={`py-1.5 px-3 text-medium font-semibold rounded-lg flex justify-between items-center shadow-lg 
                        ${
                          selectedLabels.find((item) => item.id == label.id)
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                      <p>{label.label_name}</p>{" "}
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>
            </section>

            </>
          ) : (
            <>

            <section className="flex flex-col gap-2 min-h-96 w-full min-w-44 px-4 py-6 rounded-md " >
          
                <label htmlFor="" className="font-semibold dark:text-white"> From: </label>

                <ul className="flex overflow-x-scroll gap-2 w-full min-h-36 min-w-44 bg-blue-100 px-4 py-6 rounded-md bg-opacity-60">
                  {allAccountsList && allAccountsList.length > 0 ? (
                    allAccountsList
                    .sort((a, b)=> {
                      if(a.account_type === 'Cash'){
                        return -1 
                      }
                      else if(b.account_type === 'Cash'){
                        return 1 
                      }
                      else { 
                        return 0
                      }

                    })
                    .map((account) => (
                      <li
                        key={account.id}
                        style={{ backgroundImage: account.account_color }}
                        onClick={() => handleSelectedAccount(account.id)}
                        className={`py-3 min-w-28 min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between
                          ${
                            accountState.id === account.id
                              ? "opacity-100"
                              : "opacity-30"
                          }`}
                      >
                      
                      <span className="w-full flex justify-between items-center">
                          <FontAwesomeIcon 
                        icon={JSON.parse(account.account_icon)}
                        size="xs" />

                        <p className="text-sm">{account.account_name}</p>
                      </span>
                      

                        <span className="flex place-content-center w-full gap-1 text-lg bg-gray-200 rounded-md bg-opacity-40 px-2">
                        <p>{account.account_currency}</p>
                        <p>{account.account_amount}</p>
                        </span>
                      </li>
                    ))
                  ) : (
                    <li>No Elements</li>
                  )}
                </ul>
          

            
      <label htmlFor="" className="font-semibold dark:text-white"> To: </label>

              <ul className="flex overflow-x-scroll gap-2 w-full min-h-36 min-w-44 bg-gray-200 px-4 py-6 rounded-md bg-opacity-60">
                {allAccountsList && allAccountsList.length > 0 ? (
                  allAccountsList
                  .sort((a, b)=> {
                    if(a.account_type === 'Cash'){
                      return -1 
                    }
                    else if(b.account_type === 'Cash'){
                      return 1 
                    }
                    else { 
                      return 0
                    }

                  })
                  .map((account) => (
                    <li
                      key={account.id}
                      style={{ backgroundImage: account.account_color }}
                      onClick={() => handleSelectedToAccount(account.id)}
                      className={`py-3 min-w-28 min-h-full px-3 text-xs font-semibold rounded-lg flex flex-col gap-1 items-center shadow-lg justify-between
                        ${
                          toAccountState.id === account.id
                            ? "opacity-100"
                            : "opacity-30"
                        }`}
                    >
                    
                    <span className="w-full flex justify-between items-center">
                        <FontAwesomeIcon 
                      icon={JSON.parse(account.account_icon)}
                      size="xs" />

                      <p className="text-sm">{account.account_name}</p>
                    </span>
                    

                      <span className="flex place-content-center w-full gap-1 text-lg bg-gray-200 rounded-md bg-opacity-40 px-2">
                      <p>{account.account_currency}</p>
                      <p>{account.account_amount}</p>
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No Elements</li>
                )}
              </ul>
          

            </section>
             

             
            </>
          )}


    <p className="px-2 py-1 my-4 rounded-lg bg-gray-300 font-semibold text-xl">
                {formatedDate}
              </p>
              

              <div className="bg-gray-200 bg-opacity-35 py-3 px-2">
                <span className="flex gap-2 mb-4">
                  <button 
                  className={`font-semibold bg-gray-200 rounded-lg px-1 py-2 text-lg shadow-md ${currentDateState.toDateString() == yesterday.toDateString() ? 'opacity-100' : 'opacity-40'}`}
                  onClick={()=> {
                    const dd = new Date()
                    dd.setDate(dd.getDate() - 1)
                    setCurrentDateState(dd)
                  }}
                  >
                  Yesterday
                  </button>

                  <button
                   className={`font-semibold bg-gray-200 rounded-lg px-1 py-2 text-lg shadow-md ${currentDateState.toDateString() == today.toDateString() ? 'opacity-100' : 'opacity-40'}`}
                   onClick={()=> {
                     const dd = new Date()
                     setCurrentDateState(dd)
                   }}
                  >
                  Today
                  </button>
                </span>


              <DatePicker onChange={(date) => {
                setCurrentDateState(date == null ? new Date() : date.toDate())
              }} />
          
              </div>
           


          {transactionState !== "transfer" && (

            <span className="pb-16 flex justify-start w-full">
              <input
              type="text"
              name="description"
              className="min-h-24 w-full shadow-lg bg-gray-50 bg-opacity-60 outline-none rounded-md text-3xl text-center placeholder:text-3xl placeholder:opacity-45 placeholder:text-black"
              placeholder="Description(optional)"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
            />
            </span>
           
          )}

         
        </div>

        <span
          className="absolute left-3 top-3 px-3 py-2 rounded-md bg-red-300"
          onClick={() => setTransactionView(false)}
        >
          <h2 className="font-bold text-xs">Cancel</h2>
        </span>

        <span  className="absolute right-3 top-3 px-3 py-1.5 rounded-md bg-blue-400 text-sm font-semibold text-white"
                onClick={handleTransactionSubmit}
              >
                save
          </span>
      </main>
    </div>
  );
}

export default NewTransactionForm;
