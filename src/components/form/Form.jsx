import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransactions,
  editInActive,
  editTransactions,
} from "../../feature/transactions/transactionsSlice";
import InputRadio from "./InputRadio";
import InputText from "./InputText";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  name: "",
  type: "",
  amount: "",
};

const Form = () => {
  const [formValues, setFormValues] = useState(initialState);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, isError, error, isEditing, transactions } = useSelector(
    (state) => state.transactions
  );

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(createTransactions({ id: uuidv4(), ...formValues }));
    setFormValues(initialState);
  }

  const { id, name, amount, type } = isEditing || {};

  //listening edit
  useEffect(() => {
    if (id) {
      setFormValues({ name: name, amount, type });
      setEditing(true);
    } else {
      setFormValues(initialState);
      setEditing(false);
    }
  }, [isEditing]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(editTransactions({ id: id, data: formValues }));
    setFormValues(initialState);
    setEditing(false);
  };

  const cancelEdit = () => {
    setFormValues(initialState);
    dispatch(editInActive());
    setEditing(false);
  };

  return (
    <form className="form" onSubmit={editing ? handleUpdate : handleSubmit}>
      <h3>Add new transaction</h3>

      <InputText
        name="name"
        type="text"
        placeholder="My Salary"
        value={formValues.name}
        onChange={handleInputChange}
      />

      <div className="form-group radio">
        <label htmlFor="transaction_type">Type</label>
        <InputRadio
          label="Income"
          value="income"
          checked={formValues.type === "income"}
          onChange={handleInputChange}
        />
        <InputRadio
          label="Expense"
          value="expense"
          checked={formValues.type === "expense"}
          onChange={handleInputChange}
        />
      </div>

      <InputText
        name="amount"
        type="number"
        placeholder="300"
        value={formValues.amount}
        onChange={handleInputChange}
      />

      <button className="btn" disabled={isLoading}>
        {editing ? "Update Transaction " : " Add Transaction"}
      </button>

      {editing && (
        <button className="btn cancel_edit" onClick={cancelEdit}>
          Cancel Edit
        </button>
      )}

      {isError && !isLoading && <div className="error">{error}</div>}
    </form>
  );
};

export default Form;
