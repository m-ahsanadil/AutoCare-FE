import * as Yup from "yup";
import { UserRole, UserRoleValues } from "../enum";

export const registerSchema = Yup.object({
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username can't be more than 20 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),

    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),

    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Must contain uppercase, lowercase, and number"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    firstName: Yup.string()
        .max(50, "First name can’t exceed 50 characters")
        .optional(),

    lastName: Yup.string()
        .max(50, "Last name can’t exceed 50 characters")
        .optional(),
    phone: Yup
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number can't exceed 15 digits"),
    role: Yup.mixed<UserRole>()
        .oneOf(UserRoleValues, "Invalid role")
        .required("role is required"),
});

export const loginSchema = Yup.object({
    usernameOrEmail: Yup.string().required("Username or email is required"),
    password: Yup.string().required("Password is required"),
});
