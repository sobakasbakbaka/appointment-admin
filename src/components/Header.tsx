import { Button, Flex } from "@mantine/core";
import { useAuth } from "../hooks/useAuth.ts";

export const Header = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      logout.mutateAsync();
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex style={{ height: 40 }} p={8} justify={"flex-end"}>
      <Button variant={"light"} size={"xs"} onClick={handleLogout}>
        Logout
      </Button>
    </Flex>
  );
};
