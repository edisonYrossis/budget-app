import { format } from "date-fns";
import React, { useEffect } from "react";
import { useTransactionContextAll } from "../../../context/TransactionContext";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useCategoriesContextAll } from "../../../context/CategoriesContext";

function TransactionCard({
  transactionId,
  transactionType,
  transactionAmount,
  transactionAccount,
  transactionCategory,
  transactionLabels,
  transactionDate,
  transactionDescription,
  transactionAccountDestination,
  transactionCurrency,
}) {
  const { dispatch, TRANSACTIONS_ACTIONS } = useTransactionContextAll();

  const { allCategoriesList } = useCategoriesContextAll();

  const currentDate = new Date(transactionDate);

  const formattedDate = format(currentDate, "EE MMM dd, yyyy");

  const handleDeleteTransaction = (id) => {
    Swal.fire({
      title: "Delete transaction?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "", "success");
        return dispatch({
          type: TRANSACTIONS_ACTIONS.DELETE_TRANSACTION,
          payload: id,
        });
      }
    });
  };

  const handleCategoryFound = (categoryId) => {
    const foudnedCategory = allCategoriesList.find(
      (item) => item.category_name === categoryId
    );
    return foudnedCategory;
  };

  useEffect(() => {
    handleCategoryFound(transactionCategory);
  }, []);

  return (
    <li className="flex justify-between w-full items-start ">
      <section className="text-left text-xs flex gap-1 items-center">
        <span className="flex flex-col gap-1.5">
          <span className="flex flex-col ">
            <h1 className="font-semibold">{transactionType == 'transfer' ?  `From ${transactionAccount.account_name} to ${transactionAccountDestination.account_name}`  : transactionDescription}</h1>

            <span className="flex gap-1 items-center">
              <div
                className="w-5 h-5 flex rounded-full justify-center items-center opacity-70"
                style={{
                  backgroundColor:
                    transactionType == "transfer"
                      ? "#3bec57"
                      : handleCategoryFound(transactionCategory).category_color,
                }}
              >
                <FontAwesomeIcon
                  icon={
                    transactionType == "transfer"
                      ? faMoneyBillTransfer
                      : JSON.parse(
                          handleCategoryFound(transactionCategory).category_icon
                        )
                  }
                  size="sm"
                />
              </div>
             {transactionType !== 'transfer' ? <h1 className="font-semibold opacity-40">
                {transactionCategory}
              </h1> : <h1 className="font-semibold opacity-50">Account Transfer</h1>
              
              }
            </span>
          </span>

            { transactionType !== 'transfer' ? <section className="flex gap-2  w-full">
            {transactionLabels.map((label) => (
              <p
                key={label.id}
                className={`rounded-md py-0.5 px-0.5 font-semibold shadow-lg border border-black dark:text-black dark:opacity-50`}
                style={{ backgroundColor: label.label_color, fontSize: "9px" }}
              >
                {label.label_name}
              </p>
            ))}
          </section> : ''
          }
        </span>
      </section>

      {
        <section className="text-right text-sm ">
          <h1
            className={`font-semibold ${
              transactionType == "income" ? "text-green-500" : "text-red-500"
            }`}
          >{`${
            transactionType == "income" ? " + " : " ~ "
          }${transactionCurrency} ${transactionAmount}`}</h1>
          <h1 className="text-xs font-medium">{formattedDate}</h1>


          { transactionType == 'transfer' ?
          
          <section className="flex justify-center items-center mt-1 gap-1 h-full w-full">

            <span className="flex justify-end items-center mt-1 text-black">
                <span
                style={{ backgroundImage: transactionAccountDestination.account_color }}
                className="opacity-90 py-0.5 px-1.5 flex gap-1 items-center w-fit rounded-md"
                >
                <FontAwesomeIcon
                    icon={JSON.parse(transactionAccountDestination.account_icon)}
                    size="xs"
                />
                <h1 className="text-xs font-semibold">
                    {transactionAccountDestination.account_name}
                </h1>
                </span>
            </span> 

           <span className="flex items-center">
            <FontAwesomeIcon
                    icon={faRightLeft}
                    size="xs"
                />
            </span> 

            <span className="flex justify-end items-center mt-1 text-black">
            <span
              style={{ backgroundImage: transactionAccount.account_color }}
              className="opacity-90 py-0.5 px-1.5 flex gap-1 items-center w-fit rounded-md"
            >
              <FontAwesomeIcon
                icon={JSON.parse(transactionAccount.account_icon)}
                size="xs"
              />
              <h1 className="text-xs font-semibold">
                {transactionAccount.account_name}
              </h1>
            </span>
          </span> 
        
         </section>
          
          : 

          <section className="flex justify-end items-end mt-1 dark:text-black">
          <span
            style={{ backgroundImage: transactionAccount.account_color }}
            className="opacity-90 py-0.5 px-1.5 flex gap-1 items-center w-fit rounded-md"
          >
            <FontAwesomeIcon
              icon={JSON.parse(transactionAccount.account_icon)}
              size="xs"
            />
            <h1 className="text-sm font-semibold">
              {transactionAccount.account_name}
            </h1>
          </span>
        </section>
          }

<button onClick={()=> handleDeleteTransaction(transactionId)}>x</button> 

        </section>
      }
    </li>
  );
}

export default TransactionCard;
