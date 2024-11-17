import { useClients } from "./hooks/useClients.ts";
import { useEffect } from "react";

function App() {
  const { data, create } = useClients();

  useEffect(() => {
    if (data) {
      console.log("DATA", data);
    }
  }, [data]);

  const handleCreateClient = async () => {
    try {
      await create.mutateAsync({ name: "Test Name", phone: "+77773331122" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateClient}>Add Client</button>
    </div>
  );
}

export default App;
