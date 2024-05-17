import {createContext, useContext, useEffect, useReducer, useState} from 'react'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from 'firebase/firestore'
import {app} from '../database/firebase.config'

 const accountsContext = createContext()

export function AccountsProvider({children}) {

const ACCOUNTS_ACTIONS = {
  ADD_ACCOUNT: 'ADD_ACCOUNT',
  DELETE_ACCOUNT: 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT: 'UPDATE_ACCOUNT',
  SET_ACCOUNT_ARRAY: 'SET_ACCOUNT_ARRAY'
}

const reducer = (state, action) => {
  switch(action.type){
    case ACCOUNTS_ACTIONS.ADD_ACCOUNT: 
    const handleAddAccount = async () => {
      try {
        const db = getFirestore(app);
        const accountRef = collection(db, 'accounts');
         await addDoc(accountRef, action.payload);

      } catch (error) {
        console.error('Error al agregar account a Firestore', error.message);
        return state; // Devuelve el estado actual en caso de error
      }
    };
  
    // Invocamos la función async handleAddCategory y retornamos su resultado
   handleAddAccount();


break

    case ACCOUNTS_ACTIONS.DELETE_ACCOUNT: 
    if(action.payload === undefined){
      return
      }
      const deleteAccountOfDB = async () => {
          try {
              const db = getFirestore(app)
              const accountRef = collection(db, 'accounts')
              await deleteDoc(doc(accountRef, action.payload));
          
      
      } catch (error) {
          console.error('Error al eliminar transaction de Firestore', error.message);
          }
      } 
  
  deleteAccountOfDB()

     return state.filter(category => category.id !== action.payload)

   case ACCOUNTS_ACTIONS.UPDATE_ACCOUNT: 
 
  const handleUpdateAccount = async () => {
      try {
        const db = getFirestore(app);
        const accountRef = doc(db, 'accounts', action.payload.id)
        await updateDoc(accountRef, {
            account_amount: action.payload.data.account_amount,
            account_name: action.payload.data.account_name,
            account_type: action.payload.data.account_type,
            account_currency: action.payload.data.account_currency,
            account_bank: action.payload.data.account_bank,
            account_color: action.payload.data.account_color,
            account_icon: action.payload.data.account_icon,
            account_annualInterest: action.payload.data.account_annualInterest,
            account_description: action.payload.data.account_description,
            account_paymentDueDate: action.payload.data.account_paymentDueDate,
            account_cutDate: action.payload.data.account_cutDate

        })

          } catch (error) {
            console.error('Error al actualizar la cuenta a Firestore', error.message);
            return state; // Devuelve el estado actual en caso de error
          }
  } 
   const newArray = state.map(item => {

        if (item.id == action.payload.id) {
         return { ...item, 
            account_amount: action.payload.data.account_amount,
            account_name: action.payload.data.account_name,
            account_type: action.payload.data.account_type,
            account_currency: action.payload.data.account_currency,
            account_bank: action.payload.data.account_bank,
            account_color: action.payload.data.account_color,
            account_icon: action.payload.data.account_icon,
            account_annualInterest: action.payload.data.account_annualInterest,
            account_description: action.payload.data.account_description,
            account_paymentDueDate: action.payload.data.account_paymentDueDate,
            account_cutDate: action.payload.data.account_cutDate

      }
        }
        else {
          return item
        }
  })

  handleUpdateAccount()
  
   return newArray

   case ACCOUNTS_ACTIONS.SET_ACCOUNT_ARRAY:
    return action.payload

    default: 
    return state
  } 
}

const [allAccountsList, accDispatch] = useReducer(reducer, [])

useEffect(()=> {
  const db = getFirestore(app);
  const transactionRef = collection(db, 'accounts');
  const unsubscribe = onSnapshot(transactionRef, snapshot => {
    const fetchedAccounts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    accDispatch({ type: ACCOUNTS_ACTIONS.SET_ACCOUNT_ARRAY, payload: fetchedAccounts });
  });

  return () => unsubscribe();

},[])


function accountContextAll() {
    const accountsValues = useContext(accountsContext)
    return {
       ...accountsValues,
      allAccountsList,
      ACCOUNTS_ACTIONS,
      accDispatch
    }
   }

  return (
    <accountsContext.Provider value={{accountContextAll}}>
     {children}
    </accountsContext.Provider>
  )

}

export const useAccountsContextAll = () => {
    const { accountContextAll } = useContext(accountsContext);
    return accountContextAll();
  };