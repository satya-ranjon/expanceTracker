import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteTransactions,
  getTransactions,
  postTransactions,
  putTransactions,
} from "./transactionsAPI";

const initialState = {
  isLoading: false,
  isError: false,
  transactions: [],
  error: "",
  isEditing: {},
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return await getTransactions();
  }
);

export const createTransactions = createAsyncThunk(
  "transactions/createTransactions",
  async (data) => {
    return await postTransactions(data);
  }
);
export const editTransactions = createAsyncThunk(
  "transactions/editTransactions",
  async ({ id, data }) => {
    return await putTransactions(id, data);
  }
);
export const removeTransactions = createAsyncThunk(
  "transactions/removeTransactions",
  async (id) => {
    return await deleteTransactions(id);
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.isEditing = action.payload;
    },
    editInActive: (state) => {
      state.isEditing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.transactions = [];
      })
      .addCase(createTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.transactions.push(action.payload);
      })
      .addCase(createTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(removeTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(editTransactions.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(editTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );
        if (indexToUpdate !== -1) {
          state.transactions[indexToUpdate] = action.payload;
        }
      })
      .addCase(editTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { editActive, editInActive } = transactionsSlice.actions;
export default transactionsSlice.reducer;
