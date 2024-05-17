import {createContext, useContext, useEffect, useReducer, useState} from 'react'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from 'firebase/firestore'
import {app} from '../database/firebase.config'

 const transactionContext = createContext()


export function TransactionProvider({children}) {

const [transactionView, setTransactionView] = useState(false)

const [incomesAmount, setIncomesAmount] = useState(0)
const [expensesAmount, setExpensesAmount] = useState(0)

const [incomesList, setIncomesList] = useState([])
const [expensesList, setExpensesList] = useState([])


useEffect(()=> {

  const root = document.querySelector('html')
 root.classList.add('dark')
 root.classList.remove('light')
 }, [])


const TRANSACTIONS_ACTIONS = {
  ADD_TRANSACTION: 'ADD_TRANSACTION',
  DELETE_TRANSACTION: 'DELETE_TRANSACTION',
  UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
  SET_TRANSACTIONS_ARRAY: 'SET_TRANSACTIONS_ARRAY'
}

const reducer = (state, action) => {
  switch(action.type){
    case TRANSACTIONS_ACTIONS.ADD_TRANSACTION: 
    const handleAddTransaction = async () => {
      try {
        const db = getFirestore(app);
        const transactionRef = collection(db, 'transactions');
         await addDoc(transactionRef, action.payload);

      } catch (error) {
        console.error('Error al agregar categoría a Firestore', error.message);
        return state; // Devuelve el estado actual en caso de error
      }
    };
  
    // Invocamos la función async handleAddCategory y retornamos su resultado
   handleAddTransaction();


break

    case TRANSACTIONS_ACTIONS.DELETE_TRANSACTION: 
    if(action.payload === undefined){
      return
      }
      const deleteTransactionOfDb = async () => {
          try {
              const db = getFirestore(app)
              const transactionRef = collection(db, 'transactions')
              await deleteDoc(doc(transactionRef, action.payload));
          
      
      } catch (error) {
          console.error('Error al eliminar transaction de Firestore', error.message);
          }
      } 
  
  deleteTransactionOfDb()

     return state.filter(category => category.id !== action.payload)

   case TRANSACTIONS_ACTIONS.UPDATE_TRANSACTION: 
 
  const handleUpdateTransaction = async () => {
      try {
        const db = getFirestore(app);
        const transactionRef = doc(db, 'transactions', action.payload.id)
        await updateDoc(transactionRef, {
            transaction_amount: action.payload.data.transaction_amount,
            transaction_description: action.payload.data.transaction_description})

          } catch (error) {
            console.error('Error al actualizar la transacccion a Firestore', error.message);
            return state; // Devuelve el estado actual en caso de error
          }
  } 
   const newArray = state.map(item => {

        if (item.id == action.payload.id) {
         return { ...item, 
        transaction_amount: action.payload.data.transaction_amount,
        transaction_description: action.payload.data.transaction_description,
      }
        }
        else {
          return item
        }
  })

  handleUpdateTransaction()
  
   return newArray

   case TRANSACTIONS_ACTIONS.SET_TRANSACTIONS_ARRAY:
    return action.payload

    default: 
    return transactions
  } 
}

const [allTransactionsList, dispatch] = useReducer(reducer, [])

useEffect(()=> {
  const db = getFirestore(app);
  const transactionRef = collection(db, 'transactions');
  const unsubscribe = onSnapshot(transactionRef, snapshot => {
    const fetchedTransactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch({ type: TRANSACTIONS_ACTIONS.SET_TRANSACTIONS_ARRAY, payload: fetchedTransactions });
  });

  return () => unsubscribe();

},[])


  useEffect(()=> {

    if(!allTransactionsList || allTransactionsList.length == 0){
      return
    }
  
  const incomesList = allTransactionsList.filter(t => t.transaction_type == 'income' )
  const expensesList = allTransactionsList.filter(t => t.transaction_type == 'expense' )

  const incomes = incomesList.reduce((acc, item) => {
    return parseFloat(item.transaction_amount) + acc
  } , 0)

  const expenses = expensesList.reduce((acc, item) => {
    return parseFloat(item.transaction_amount) + acc
  } , 0)

  setIncomesList(incomesList)
  setExpensesList(expensesList)

  setIncomesAmount(incomes)
  setExpensesAmount(expenses)


    },[allTransactionsList])

function transactionContextAll() {
    const transactionValues = useContext(transactionContext)
    return {
       ...transactionValues,
       transactionView,
       setTransactionView,
       allTransactionsList,
       dispatch,
       TRANSACTIONS_ACTIONS,
       incomesList,
       expensesList,
       incomesAmount,
       expensesAmount
    }
   }

  return (
    <transactionContext.Provider value={{transactionContextAll}}>
     {children}
    </transactionContext.Provider>
  )

}

export const useTransactionContextAll = () => {
    const { transactionContextAll } = useContext(transactionContext);
    return transactionContextAll();
  };