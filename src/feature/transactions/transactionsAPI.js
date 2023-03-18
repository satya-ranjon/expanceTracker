import axios from "../../utils/axios";

export const getTransactions = async () => {
  const response = await axios.get("transactions");
  return response.data;
};

export const postTransactions = async (data) => {
  const response = await axios.post("transactions", {
    ...data,
    amount: Number(data.amount),
  });
  return response.data;
};

export const putTransactions = async (id, data) => {
  const updateData = { id: id, ...data };
  const response = await axios.put(`transactions/${id}`, updateData);
  return response.data;
};
export const deleteTransactions = async (id) => {
  const response = await axios.delete(`transactions/${id}`);
  return response.data;
};
