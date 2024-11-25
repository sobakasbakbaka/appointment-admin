import { useForm } from "@mantine/form";
import { Button, Stack, TextInput } from "@mantine/core";
import { FormEvent } from "react";
import { useClients } from "../hooks/useClients.ts";
import { DateInput } from "@mantine/dates";

export const CreatePage = () => {
  const { create } = useClients();
  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      phone: "",
      birthday: "",
      telegram: "",
      whatsapp: "",
    },
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    create.mutateAsync(form.values);
    console.log(form.values);
  };

  return (
    <Stack gap={8} component={"form"} p={16} onSubmit={handleSubmit}>
      <TextInput
        {...form.getInputProps("name")}
        label="Name"
        placeholder={"Name"}
      />
      <TextInput
        {...form.getInputProps("phone")}
        label="Phone"
        placeholder={"Phone"}
      />
      <DateInput
        label="birthday"
        placeholder={"birthday"}
        {...form.getInputProps("birthday")}
      />
      <TextInput
        {...form.getInputProps("telegram")}
        label="Telegram"
        placeholder={"Telegram"}
      />
      <TextInput
        {...form.getInputProps("whatsapp")}
        label="whatsapp"
        placeholder={"whatsapp"}
      />
      <Button type={"submit"}>Submit</Button>
    </Stack>
  );
};
