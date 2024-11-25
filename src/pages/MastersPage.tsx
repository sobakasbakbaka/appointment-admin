import { Box } from "@mantine/core";
import { useMaster } from "../hooks/useMaster.ts";
import { Link } from "react-router-dom";

export const MastersPage = () => {
  const { masters, mastersIsLoading } = useMaster();

  console.log(masters);

  if (mastersIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {masters?.map((master) => (
        <Box key={master.id}>
          <Link to={`/master/${master.id}`}>{master.name}</Link>
        </Box>
      ))}
    </Box>
  );
};
