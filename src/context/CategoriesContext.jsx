import {createContext, useContext, useEffect, useReducer, useState} from 'react'
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from 'firebase/firestore'
import {app} from '../database/firebase.config'


const categoriesContext = createContext()

export function CategoriesContextProvider({children}){

const [labelsCategoryArray, setLabelsCategoryArray] = useState([])
const [currentColor, setCurrentColor] = useState('#E5797E'); // 


const predefinedColors = [{
  id: 'Rojo',
  main_color: '#E5797E',
  colors: ['#E5797E','#EB9297','#ED9FA3','#F2B9BC','#F0ACAF']
},
{
  id: 'Rosado',
  main_color: '#F8DBFA',
  colors: ['#F9E3FB','#FBEAFC', '#FBEDFC', '#FCF1FD', '#FDF4FD' ]
},
{
  id: 'Morado',
  main_color: '#A48DB5',
  colors: ['#B5A1C4','#BEACCB', '#C7B7D3', '#D0C2DA', '#E2D9E9' ]
},
{
  id: 'Gris',
  main_color: '#DAE0E7',
  colors: ['#DEE4EA','#E5EAEF', '#E9EDF1', '#ECF0F4', '#F0F3F6' ]
},
{
  id: 'Azul',
  main_color: '#5FB6E9',
  colors: ['#7DC4ED','#8CCBEF', '#9CD2F1', '#ACD9F4', '#BCE1F6' ]
},
{
  id: 'Marron',
  main_color: '#B5A294',
  colors: ['#C4B3A8','#CBBCB2', '#D3C5BC', '#DACFC6', '#E1D8D1' ]
},
{
  id: 'Orange',
  main_color: '#F7B071',
  colors: ['#F9C08D','#FAC79B', '#FBD7B7', '#FCDFC6', '#FDE7D4' ]
},
{
  id: 'Green',
  main_color: '#ACE2A1',
  colors: ['#B4E6AA','#C4EBBC', '#CCEEC5', '#D4F1CE', '#DCF4D8' ]
},
{
  id: 'Amarillo',
  main_color: '#FCF0B7',
  colors: ['#FDF2BF','#FDF4C6', '#FDF7D4', '#FEF8DB', '#FEF9E3' ]
},
{
  id: 'Blue Claro',
  main_color: '#BEDBE5',
  colors: ['#CBE3EB','#D1E6ED', '#D7EAF0', '#DEEDF2', '#EBF4F7' ]
},
{
  id: 'Verde azulado',
  main_color: '#9CF4C6',
  colors: ['#A6F5CC','#B1F6D2', '#BCF7D9', '#C7F9DF', '#D2FAE5' ]
},
{
  id: 'Morado Pastel',
  main_color: '#CCB0F2',
  colors: ['#D6C0F5','#DBC8F6', '#E0CFF7', '#E5D7F9', '#EADFFA' ]
},
{
  id: 'Rojo claro',
  main_color: '#FDA89D',
  colors: ['#FDB2A8','#FDBBB3', '#FDC5BE', '#FDC5BE', '#FECFC8' ]
},
{
  id: 'Azul fuerte',
  main_color: '#77A4ED',
  colors: ['#77A4ED','#87AFEF', '#97BAF1', '#A8C5F4', '#B9D0F6' ]
},
{
  id: 'Crema',
  main_color: '#FBEBDB',
  colors: ['#FAECDD','#FBEEE1', '#FBF0E5', '#FCF2E8', '#FCF4EC' ]
},
];

    const CATEGORIES_ACTIONS = {
        SET_CATEGORIES_ARRAY: 'SET_CATEGORIES_ARRAY',
        ADD_CATEGORY : 'ADD_CATEGORY',
        DELETE_CATEGORY: 'DELETE_CATEGORY',
        UPDATE_CATEGORY: 'UPDATE_CATEGORY',
        ADD_LABEL: 'ADD_LABEL',
        DELETE_LABEL: 'DELETE_LABEL'
    }
      
    const reducer = (state, action) => {
        switch(action.type){

      case CATEGORIES_ACTIONS.ADD_CATEGORY: 
      const handleAddCategory = async () => {
        try {
          const db = getFirestore(app);
          const categoryRef = collection(db, 'categories');
          const newCategory = {
            category_type: action.payload.category_type,
            category_name: action.payload.category_name,
            category_icon: action.payload.category_icon,
            category_color: action.payload.category_color,
            category_labels: action.payload.category_labels
          };
           await addDoc(categoryRef, newCategory);

        } catch (error) {
          console.error('Error al agregar categoría a Firestore', error.message);
          return state; // Devuelve el estado actual en caso de error
        }
      };
    
      // Invocamos la función async handleAddCategory y retornamos su resultado
     handleAddCategory();


break
         

        case CATEGORIES_ACTIONS.DELETE_CATEGORY: 
            if(action.payload === undefined){
                return
                }
                const deleteCategoryOfdb = async () => {
                    try {
                        const db = getFirestore(app)
                        const categoryRef = collection(db, 'categories')
                        await deleteDoc(doc(categoryRef, action.payload));
                    
                
                } catch (error) {
                    console.error('Error al eliminar tarea de Firestore', error.message);
                    }
                } 
            
            deleteCategoryOfdb()
        
            return state.filter(category => category.id !== action.payload)
    
      
         case CATEGORIES_ACTIONS.UPDATE_CATEGORY: 
         const handleUpdateCategory = async () => {
          try {
            const db = getFirestore(app);
            const categoryRef = doc(db, 'categories', action.payload.id)
            await updateDoc(categoryRef, {
              category_name: action.payload.data.category_name,
              category_icon: action.payload.data.category_icon,
              category_type: action.payload.data.category_type,
              category_color: action.payload.data.category_color,
              category_labels: action.payload.data.category_labels})
    
              } catch (error) {
                console.error('Error al actualizar la categoria a Firestore', error.message);
                return state; // Devuelve el estado actual en caso de error
              }
      } 
       const newArray = state.map(item => {
    
            if (item.id == action.payload.id) {
             return { ...item, 
            category_name: action.payload.data.category_name,
            category_icon: action.payload.data.category_icon,
            category_type: action.payload.data.category_type,
            category_color: action.payload.data.category_color,
            category_labels: action.payload.data.category_labels
          }
            }
            else {
              return item
            }
      })
    
      handleUpdateCategory()
      
       return newArray
      

         case CATEGORIES_ACTIONS.SET_CATEGORIES_ARRAY:
          return action.payload

          default: 
          return state
        } 
      }

      const [allCategoriesList, dispatch] = useReducer(reducer, [])


useEffect(() => {
  const db = getFirestore(app);
  const categoryRef = collection(db, 'categories');
  const unsubscribe = onSnapshot(categoryRef, snapshot => {
    const fetchedCategories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch({ type: CATEGORIES_ACTIONS.SET_CATEGORIES_ARRAY, payload: fetchedCategories });
  });

  return () => unsubscribe();
}, []); // La suscripción se ejecuta solo una vez al montar el componente


    const categoriesContextFunction = () => {
        const categoriesValues = useContext(categoriesContext)
      return {
        ...categoriesValues,
        allCategoriesList,
        predefinedColors,
        currentColor, 
        setCurrentColor,
        dispatch,
        CATEGORIES_ACTIONS,
        labelsCategoryArray,
        setLabelsCategoryArray
    }
    }

    return <categoriesContext.Provider value={{categoriesContextFunction}} >
        {children}
    </categoriesContext.Provider>
}

export const useCategoriesContextAll = () => {
    const { categoriesContextFunction } = useContext(categoriesContext);
    return categoriesContextFunction();
  };