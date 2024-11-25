import { useClients } from "../hooks/useClients.ts";
import dayjs from "dayjs";
import { Box, Stack, Text } from "@mantine/core";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { data } = useClients();

  return (
    <div>
      <Stack p={16}>
        <Link to="/masters">Master's list</Link>
      </Stack>
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
