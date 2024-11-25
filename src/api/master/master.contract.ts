import { Dayjs } from "dayjs";

export interface Master {
  id: number;
  name: string;
  schedules: Schedule[];
  session: any[]; // TODO: fix that after create sessions
}

export interface Schedule {
  id: number;
  masterId: number;
  master: Master;
  workStartTime: Dayjs;
  workEndTime: Dayjs;
}

export interface CreateMasterDto {
  name: string;
}

export interface CreateScheduleDto {
  workStartTime: Dayjs;
  workEndTime: Dayjs;
}
