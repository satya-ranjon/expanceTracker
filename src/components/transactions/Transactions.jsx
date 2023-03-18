import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../feature/transactions/transactionsSlice";
import Transaction from "./Transaction";

const Transactions = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, transactions } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Decided what to render
  let transaction;
  if (isLoading) {
    transaction = <h3>Loading....</h3>;
  }
  if (!isLoading && isError) {
    transaction = <h3>{error}</h3>;
  }
  if (!isLoading && !isError && transactions?.length === 0) {
    transaction = <h3>Your transactions is - 0 -</h3>;
  }
  if (!isLoading && !isError && transactions?.length > 0) {
    transaction = transactions?.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }

  return (
    <>
      <p className="second_heading">Your Transactions:</p>
      <div className="conatiner_of_list_of_transactions">
        <ul>{transaction}</ul>
      </div>
    </>
  );
};

export default Transactions;
