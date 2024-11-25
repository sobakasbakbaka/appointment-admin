import { useClients } from "../hooks/useClients.ts";
import { useAuth } from "../hooks/useAuth.ts";
import dayjs from "dayjs";
import { Box, Stack, Text } from "@mantine/core";

export const HomePage = () => {
  const { data } = useClients();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  console.log("DATA", data);

  return (
    <div>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
      <Stack>
        {data?.map((client) => (
          <Box key={client.id} pb={16}>
            <Text>Клиент: {client.name}</Text>
            <Text>Телефон: {client.phone}</Text>
            <Text>Дата: {dayjs(client.birthday).format("DD/MM/YYYY")}</Text>
            {client.telegram && <Text>Telegram: {client.telegram}</Text>}
            {client.whatsapp && <Text>Whatsapp: {client.whatsapp}</Text>}
          </Box>
        ))}
      </Stack>
    </div>
  );
};
