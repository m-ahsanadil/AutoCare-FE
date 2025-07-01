import * as Yup from "yup";

export const registerSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required"),
    password_confirmation: Yup.string().required("Confirm Password is required").oneOf([Yup.ref("password"), ""], "Passwords do not match"),
});

export const loginSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email format"),
    password: Yup.string().required("Password is required"),
});
