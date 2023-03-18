import React from "react";
import { useSelector } from "react-redux";
import numberWithCommas from "../utils/numberWithCommas";

const Blanche = () => {
  const { transactions } = useSelector((state) => state.transactions);

  const balanceCalculate = () => {
    let balance = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }
    });
    return balance;
  };

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span>{" "}
        {transactions?.length > 0 ? (
          <span> {numberWithCommas(balanceCalculate(transactions))}</span>
        ) : (
          <span> 0</span>
        )}
      </h3>
    </div>
  );
};

export default Blanche;
