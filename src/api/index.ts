import ky from "ky";

const api = ky.create({
  prefixUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  retry: {
    limit: 3,
    methods: ["GET", "POST", "PUT"],
    statusCodes: [500, 502, 503],
  },
});

export const fetchClients = async () => {
  try {
    const response = await api.get("clients");
    return await response.json();
  } catch (error) {
    console.error("Error fetching clients", error);
    throw error;
  }
};

export const createClient = async (data: { name: string; phone: string }) => {
  try {
    const response = await api.post("clients", {
      json: data,
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating client", error);
    throw error;
  }
};

export const updateClient = async ({
  id,
  data,
}: {
  id: string;
  data: { name?: string; phone?: string };
}) => {
  try {
    const response = await api.post(`clients/${id}`, {
      json: data,
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating client", error);
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  try {
    await api.delete(`clients/${id}`);
  } catch (error) {
    console.error("Error deleting client", error);
    throw error;
  }
};
