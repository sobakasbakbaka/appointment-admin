import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import {
  Button,
  Center,
  Fieldset,
  Group,
  InputError,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

export const LoginPage = () => {
  const [error, setError] = useState("");
  const { login } = useAuth();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        value.trim() === "" ? "Поле Email не должно быть пустым" : null,
      password: (value) =>
        value.trim() === "" ? "Поле Password не должно быть пустым" : null,
    },
    validateInputOnBlur: true,
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const validation = form.validate();

    if (validation.hasErrors) {
      return;
    }

    try {
      await login.mutateAsync({
        email: form.values.email,
        password: form.values.password,
      });
      window.location.href = "/";
    } catch (error) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Fieldset
        legend={"Авторизация"}
        variant={"filled"}
        style={{ width: 300 }}
      >
        <Stack
          gap={8}
          component={"form"}
          onSubmit={handleLogin}
          id={"login-form"}
        >
          <TextInput
            label="Email"
            placeholder={"Email"}
            {...form.getInputProps("email")}
            error={form.errors.email}
          />
          <TextInput
            label="Password"
            placeholder={"Password"}
            {...form.getInputProps("password")}
            error={form.errors.password}
            type="password"
          />
          {error && <InputError>{error}</InputError>}
        </Stack>
        <Group justify="flex-end" mt="md">
          <Button
            type={"submit"}
            variant="light"
            color="gray"
            form={"login-form"}
          >
            Авторизоваться
          </Button>
        </Group>
      </Fieldset>
    </Center>
  );
};
