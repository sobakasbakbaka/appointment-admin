import { Client, CreateClientDto, UpdateClientDto } from "./client.contract.ts";

import { kyInstance } from "../kyInstance.ts";

export const fetchClients = async (): Promise<Client[]> => {
  try {
    const response = await kyInstance.get("clients");
    return await response.json();
  } catch (error) {
    console.error("Error fetching clients", error);
    throw error;
  }
};

export const createClient = async (data: CreateClientDto): Promise<Client> => {
  try {
    const response = await kyInstance.post("clients", {
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
  data: UpdateClientDto;
}): Promise<Client> => {
  try {
    const response = await kyInstance.put(`clients/${id}`, {
      json: data,
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating client", error);
    throw error;
  }
};

export const deleteClient = async (id: string): Promise<void> => {
  try {
    await kyInstance.delete(`clients/${id}`);
  } catch (error) {
    console.error("Error deleting client", error);
    throw error;
  }
};
