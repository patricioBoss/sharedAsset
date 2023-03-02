import React from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Box,
  Stack,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function NotificationBlock() {
  const RegisterSchema = Yup.object().shape({
    email: Yup.boolean(),
    withdrawal: Yup.boolean(),
    approval: Yup.boolean(),
  });
  const formik = useFormik({
    initialValues: {
      email: false,
      withdrawal: true,
      approval: true,
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log(values);
      // navigate('/dashboard', { replace: true });
      return Promise.resolve();
    },
  });
  const { handleSubmit, handleChange, isSubmitting, values } = formik;

  return (
    <Box
      sx={{
        display: "grid",
        gap: 5,
        p: 3,
        borderRadius: 2,
        height: "100%",
        border: (theme) => ({ md: `dashed 1px ${theme.palette.divider}` }),
      }}
    >
      <Typography variant="subtitle1">Edit Profile</Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack direction="column" spacing={1}>
            <FormControlLabel
              control={<Switch />}
              name="approval"
              onChange={handleChange}
              checked={values.approval}
              label="Recieve notification when investment is approved"
            />
            <FormControlLabel
              control={
                <Switch
                  name="withdrawal"
                  onChange={handleChange}
                  checked={values.withdrawal}
                />
              }
              label="Notify when Withdrawal is ready"
            />
            <FormControlLabel
              control={
                <Switch
                  name="email"
                  onChange={handleChange}
                  checked={values.email}
                />
              }
              label="Enable email notification"
            />
          </Stack>
          <LoadingButton
            sx={{
              mt: 3,
            }}
            size="medium"
            type="submit"
            variant="outlined"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Form>
      </FormikProvider>
    </Box>
  );
}

export default NotificationBlock;
