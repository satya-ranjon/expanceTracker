import React from "react";
import Edit from "../../assets/edit.svg";
import Delete from "../../assets/delete.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  editActive,
  editInActive,
  removeTransactions,
} from "../../feature/transactions/transactionsSlice";

const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();

  const { isEditing } = useSelector((state) => state.transactions);

  function removeTransaction() {
    if (isEditing.id === transaction.id) {
      dispatch(editInActive());
    }
    dispatch(removeTransactions(transaction.id));
  }

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  return (
    <li
      className={`transaction ${
        transaction.type === "income" ? "income" : "expense"
      }`}>
      <p>{transaction.name}</p>
      <div className="right">
        <p>৳ {transaction.amount}</p>

        <button className="link" onClick={handleEdit}>
          <img className="icon" src={Edit} />
        </button>
        <button className="link" onClick={removeTransaction}>
          <img className="icon" src={Delete} />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
