import { useClients } from "../hooks/useClients.ts";
import { useAuth } from "../hooks/useAuth.ts";

export const HomePage = () => {
  const { data } = useClients();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <div>
      <div>
        <button onClick={handleLogout}>logout</button>
      </div>
      <code>{data && JSON.stringify(data, null, 2)}</code>
    </div>
  );
};
