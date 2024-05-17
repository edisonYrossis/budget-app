import {createContext, useContext, useEffect, useReducer, useState} from 'react'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from 'firebase/firestore'
import {app} from '../database/firebase.config'


const budgetContext = createContext()

export function BudgetContextProvider({children}){


    const BUDGET_ACTIONS = {
        SET_BUDGET_ARRAY: 'SET_BUDGET_ARRAY',
        ADD_BUDGET : 'ADD_BUDGET',
        DELETE_BUDGET: 'DELETE_BUDGET',
        UPDATE_BUDGET: 'UPDATE_BUDGET',
    }
      
    const reducer = (state, action) => {
        switch(action.type){

      case BUDGET_ACTIONS.ADD_BUDGET: 
      const handleAddbudget = async () => {
        try {
          const db = getFirestore(app);
          const budgetRef = collection(db, 'budget');
          const newbudget = {
            budget_type: action.payload.budget_type,
            budget_amount: action.payload.budget_amount ,
            budget_extraAmount : action.payload.budget_extraAmount,
            budget_name:  action.payload.budget_name,
            budget_labels: action.payload.budget_labels,
            budget_category:action.payload.budget_category,
            budget_currency: action.payload.budget_currency,
          };
           await addDoc(budgetRef, newbudget);

        } catch (error) {
          console.error('Error al agregar categoría a Firestore', error.message);
          return state; // Devuelve el estado actual en caso de error
        }
      };
    
      // Invocamos la función async handleAddbudget y retornamos su resultado
     handleAddbudget();


break
         

        case BUDGET_ACTIONS.DELETE_BUDGET: 
            if(action.payload === undefined){
                return
                }
                const deletebudgetOfdb = async () => {
                    try {
                        const db = getFirestore(app)
                        const budgetRef = collection(db, 'budget')
                        await deleteDoc(doc(budgetRef, action.payload));
                    
                
                } catch (error) {
                    console.error('Error al eliminar tarea de Firestore', error.message);
                    }
                } 
            
            deletebudgetOfdb()
        
            return state.filter(budget => budget.id !== action.payload)
    
      
         case BUDGET_ACTIONS.UPDATE_BUDGET: 
         const handleUpdatebudget = async () => {
          try {
            const db = getFirestore(app);
            const budgetRef = doc(db, 'budget', action.payload.id)
            await updateDoc(budgetRef, {
                budget_type: action.payload.data.budget_type,
                budget_amount: action.payload.data.budget_amount ,
                budget_extraAmount : action.payload.data.budget_extraAmount,
                budget_name:  action.payload.data.budget_name,
                budget_labels: action.payload.data.budget_labels,
                budget_category:action.payload.data.budget_category,
                budget_currency: action.payload.data.budget_currency})
    
              } catch (error) {
                console.error('Error al actualizar la categoria a Firestore', error.message);
                return state; // Devuelve el estado actual en caso de error
              }
      } 
       const newArray = state.map(item => {
    
            if (item.id == action.payload.id) {
             return { ...item, 
                budget_type: action.payload.data.budget_type,
                budget_amount: action.payload.data.budget_amount ,
                budget_extraAmount : action.payload.data.budget_extraAmount,
                budget_name:  action.payload.data.budget_name,
                budget_labels: action.payload.data.budget_labels,
                budget_category:action.payload.data.budget_category,
                budget_currency: action.payload.data.budget_currency
          }
            }
            else {
              return item
            }
      })
    
      handleUpdatebudget()
      
       return newArray
      

         case BUDGET_ACTIONS.SET_BUDGET_ARRAY:
          return action.payload

          default: 
          return state
        } 
      }

      const [allBudgetList, dispatch] = useReducer(reducer, [])


useEffect(() => {
  const db = getFirestore(app);
  const budgetRef = collection(db, 'budget');
  const unsubscribe = onSnapshot(budgetRef, snapshot => {
    const fetchedbudget = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch({ type: BUDGET_ACTIONS.SET_BUDGET_ARRAY, payload: fetchedbudget });
  });

  return () => unsubscribe();
}, []); // La suscripción se ejecuta solo una vez al montar el componente


    const budgetContextFunction = () => {
        const budgetValues = useContext(budgetContext)
      return {
        ...budgetValues,
        allBudgetList,
        dispatch,
        BUDGET_ACTIONS,
       
    }
    }

    return <budgetContext.Provider value={{budgetContextFunction}} >
        {children}
    </budgetContext.Provider>
}

export const useBudgetContextAll = () => {
    const { budgetContextFunction } = useContext(budgetContext);
    return budgetContextFunction();
  };