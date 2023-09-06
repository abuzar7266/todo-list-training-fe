import * as yup from "yup";

export const schemaSignup = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must contain atleast 5 characters")
      .max(16, "Username must not exceed 16 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must contain atleast 5 characters")
      .max(16, "Username must not exceed 16 characters"),
    email: yup
      .string()
      .required("Email Address is required")
      .email("Email Address must be valid"),
    firstName: yup
      .string()
      .required("First Name is required")
      .min(5, "First Name must contain atleast 5 characters")
      .max(30, "First Name must not exceed 30 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .min(5, "Last Name must contain atleast 5 characters")
      .max(30, "Last Name must not exceed 30 characters"),
  })
  .required();

export const schemaLogin = yup
  .object({
    username: yup
      .string()
      .required("Username is required")
      .min(5, "Username must contain atleast 5 characters")
      .max(16, "Username must not exceed 16 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(5, "Password must contain atleast 5 characters")
      .max(16, "Username must not exceed 16 characters"),
  })
  .required();

export const listItemSchema = yup
  .object({
    description: yup
      .string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters")
      .max(30, "Description must not exceed 30 characters"),
  })
  .required();

export const schemaTodo = yup
  .object({
    description: yup
      .string()
      .required("Description is required")
      .min(5, "Description must be at least 5 characters")
      .max(30, "Description must not exceed 30 characters"),
  })
  .required();
