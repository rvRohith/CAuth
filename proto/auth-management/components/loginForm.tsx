import React, { useContext } from "react";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  PaperProps,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import { AuthContext } from "./contexts/authContext";
import Router from "next/router";
import { LoginReq } from "../data/postUserAuthReq";

export function LoginForm(props: PaperProps) {
  const [formType, toggleFormType] = useToggle(["login", "register"]);
  const { setAuth } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const submitEvent = async (values: typeof form.values) => {
    let resData = await LoginReq(values.name, values.password);

    console.log(resData);
    if (resData) {
      localStorage.setItem("token", resData.token);
      localStorage.setItem("user_name", resData.user_name);
      setAuth({ userName: resData.user_name, token: resData.token });

      Router.push(`/dashboard`);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <form onSubmit={form.onSubmit(submitEvent)}>
        <Stack>
          {formType === "register" && (
            <TextInput
              required
              label="Email"
              placeholder="hellofromspace@gmail.com"
              value={form.values.email}
              onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
              error={form.errors.email && "Invalid email"}
            />
          )}

          <TextInput
            required
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 8 characters"}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggleFormType()}
            size="xs">
            {formType === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{formType}</Button>
        </Group>
      </form>
    </Paper>
  );
}
