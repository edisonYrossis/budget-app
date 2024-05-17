import Nav from "./components/nav/Nav";
import "./css/App.css";
import { TransactionProvider } from "./context/TransactionContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoriesPage from "./pages/CategoriesPage";
import { CategoriesContextProvider } from "./context/CategoriesContext";
import AccountsPage from "./pages/AccountsPage";
import { AccountsProvider } from "./context/AccountsContext";
import BudgetPage from "./pages/BudgetPage";
import { BudgetContextProvider } from "./context/BudgetContext";
import DownNav from "./components/nav/DownNav";

function App() {


  return (
    <div className=" app relative">
      <BrowserRouter>
        <TransactionProvider>
          <CategoriesContextProvider>
                     <AccountsProvider>
                        <BudgetContextProvider >

     <Nav />      
      <div className="px-3 py-10 pb-32" style={{WebkitTapHighlightColor: "transparent"}}>
         <Routes>
                <Route path="/" element={<Home />} />

                <Route
                  path="/transactions-categories"
                  element={<CategoriesPage />}
                />

                <Route
                  path="/transactions-accounts"
                  element={<AccountsPage />}
                />

                <Route
                  path="/transactions-budget"
                  element={<BudgetPage />}
                />
              </Routes>
      </div>
             


                            <DownNav />

                        </BudgetContextProvider>
                      </AccountsProvider>
          </CategoriesContextProvider>
        </TransactionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
