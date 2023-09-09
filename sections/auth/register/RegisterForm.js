import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useFormik, Form, FormikProvider } from "formik";
import { useRouter } from "next/router";
// import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
// component
import Iconify from "../../../components/Iconify";

import { CountryRegionData } from "react-country-region-selector";

// ----------------------------------------------------------------------

// const StateSelection = (props) => {
//   const {getFieldProps}=props
//   const {
//     values: {state},
//     touched,
//     errors
//   } = useFormikContext();
//   const [field, meta] = useField(props);
//   return (
//     <TextField
//       fullWidth
//       select
//       label="State"
//       {...field}
//       {...getFieldProps('state')}
//       error={Boolean(touched.state && errors.state)}
//       helperText={touched.state && errors.state}
//     >
//       {props.country.map((option) => (
//         <MenuItem key={option[0]} value={option[0]}>
//           {option[0]}
//         </MenuItem>
//       ))}
//     </TextField>
//   );
// };

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentCountry, setCurrentCountry] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    country: Yup.string().required("country is required"),
    state: Yup.string().required("state is required"),
    password: Yup.string()
      .min(5, "must have atleast 5 char long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      state: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post("/api/user", values)
        .then(function () {
          setIsSubmitting(false);
          toast.success("registration successful");
          router.push("/login");
        })
        .catch(function (err) {
          setIsSubmitting(false);
          if (err.response) {
            toast.error(err.response.data.message);
          } else {
            toast.error(err.message);
          }
        });
    },
  });

  const handleCountryChange = () => {};
  const handleSelectClick = (index) => {
    setCurrentCountry(CountryRegionData[index]);
  };

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              select
              label="Country"
              onChange={handleCountryChange}
              {...getFieldProps("country")}
              error={Boolean(touched.country && errors.country)}
              helperText={touched.country && errors.country}
            >
              {CountryRegionData.map((option, i) => (
                <MenuItem
                  key={option[0]}
                  value={option[0]}
                  onClick={() => handleSelectClick(i)}
                >
                  {option[0]}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="State"
              {...getFieldProps("state")}
              error={Boolean(touched.state && errors.state)}
              helperText={touched.state && errors.state}
            >
              {currentCountry[2]?.split("|").map((value) => (
                <MenuItem key={value.split("~")[0]} value={value.split("~")[0]}>
                  {value.split("~")[0]}
                </MenuItem>
              ))}
            </TextField>
            {/* <StateSelection country={currentCountry} name={"state"} /> */}
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          {/* passwords section */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              {...getFieldProps("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                    >
                      <Iconify
                        icon={
                          showConfirmPassword
                            ? "eva:eye-fill"
                            : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
