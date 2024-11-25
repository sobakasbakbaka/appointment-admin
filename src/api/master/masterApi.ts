import {
  CreateMasterDto,
  CreateScheduleDto,
  Master,
  Schedule,
} from "./master.contract.ts";
import { kyInstance } from "../kyInstance.ts";

export const fetchMasters = async (): Promise<Master[]> => {
  try {
    const response = await kyInstance.get("master");
    return await response.json();
  } catch (error) {
    console.error("Error fetching Master", error);
    throw error;
  }
};

export const fetchMasterById = async (id: number): Promise<Master> => {
  try {
    const response = await kyInstance.get(`master/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching Master", error);
    throw error;
  }
};

export const createMaster = async (dto: CreateMasterDto): Promise<Master> => {
  try {
    const response = await kyInstance.post("master", {
      json: dto,
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating Master", error);
    throw error;
  }
};

export const deleteMaster = async (id: number): Promise<void> => {
  try {
    const response = await kyInstance.delete(`master/${id}`);
    return await response.json();
  } catch (error) {
    console.error("Error deleting Master", error);
    throw error;
  }
};

export const createSchedule = async ({
  id,
  dto,
}: {
  id: number;
  dto: CreateScheduleDto;
}): Promise<Schedule> => {
  try {
    const response = await kyInstance.post(`master/${id}/schedule`, {
      json: dto,
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating Schedule", error);
    throw error;
  }
};

export const deleteSchedule = async ({
  id,
  scheduleId,
}: {
  id: number;
  scheduleId: number;
}): Promise<void> => {
  try {
    const response = await kyInstance.delete(
      `master/${id}/schedule/${scheduleId}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error deleting Schedule", error);
    throw error;
  }
};
