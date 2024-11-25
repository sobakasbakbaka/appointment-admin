import { useParams } from "react-router-dom";
import { useMaster } from "../hooks/useMaster.ts";
import { Button, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import { FormEvent } from "react";

const addTimeToCurrentDate = (time: string) => {
  return dayjs()
    .hour(+time.split(":")[0])
    .minute(+time.split(":")[1])
    .second(0);
};

export const MasterPage = () => {
  const { id } = useParams();
  const {
    master,
    masterIsLoading,
    createMasterSchedule,
    removeMasterSchedule,
  } = useMaster(+id!);
  const form = useForm({
    mode: "controlled",
    initialValues: {
      workStartTime: "10:00",
      workEndTime: "21:00",
    },
    validate: {
      workStartTime: (value) =>
        value.trim() === "" ? "Начало смены не должно быть пустым" : null,
      workEndTime: (value) =>
        value.trim() === "" ? "Конец смены не должно быть пустым" : null,
    },
  });

  if (masterIsLoading) {
    return <div>Loading...</div>;
  }

  console.log(masterIsLoading);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validation = form.validate();

    if (validation.hasErrors) {
      return;
    }

    const startTime = addTimeToCurrentDate(form.values.workStartTime);
    const endTime = addTimeToCurrentDate(form.values.workEndTime);

    createMasterSchedule.mutateAsync({
      id: +id!,
      dto: {
        workEndTime: endTime,
        workStartTime: startTime,
      },
    });
  };

  return (
    <Stack>
      <Text>{master?.name}</Text>
      {master?.schedules.length ? (
        <div>
          {master.schedules.map((schedule) => {
            const handleRemoveSchedule = async () => {
              removeMasterSchedule.mutateAsync({
                id: +id!,
                scheduleId: schedule.id,
              });
            };

            return (
              <>
                <Text key={schedule.id}>
                  Расписание мастера:{" "}
                  <div>
                    <Text>
                      С{" "}
                      {dayjs(schedule.workStartTime).format("DD/MM/YYYY hh:mm")}
                    </Text>
                    <Text>
                      До{" "}
                      {dayjs(schedule.workEndTime).format("DD/MM/YYYY hh:mm")}
                    </Text>
                  </div>
                </Text>
                <Button onClick={handleRemoveSchedule}>
                  Удалить расписание
                </Button>
              </>
            );
          })}
        </div>
      ) : (
        <Stack gap={8} component={"form"} p={16} onSubmit={handleSubmit}>
          <TimeInput
            {...form.getInputProps("workStartTime")}
            label={"Начало рабочего дня"}
            error={form.errors.workStartTime}
          />
          <TimeInput
            {...form.getInputProps("workEndTime")}
            label={"Конец рабочего дня"}
            error={form.errors.workEndTime}
          />
          <Button type={"submit"}>Submit</Button>
        </Stack>
      )}
    </Stack>
  );
};
