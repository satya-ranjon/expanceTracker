import Blanche from "./components/Blanche";
import Form from "./components/form/Form";
import Transactions from "./components/transactions/Transactions";
import Layout from "./layout/Layout";

function App() {
  return (
    <Layout>
      <Blanche />
      <Form />
      <Transactions />
    </Layout>
  );
}

export default App;
