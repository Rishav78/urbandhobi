import {FormField} from "../../@types";

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

export class Validator {
  email = (email: string) => {
    if (!email) {
      throw new Error("email field is required");
    }
    if (!emailRegex.test(email)) {
      throw new Error("invalid email");
    }
    return this;
  }

  password = (password: string) => {
    if (!password) {
      throw new Error("password field is required");
    }
    if (!passwordRegex.test(password)) {
      throw new Error("password must be of min 8 characters and should contain a digit and sepcial charactor");
    }
    return this;
  }

  comparePassword = (password: string, confirmPassword: string) => {
    if (!confirmPassword) {
      throw new Error("confirm password field is required");
    }
    if (password !== confirmPassword) {
      throw new Error("password does not match");
    }
    return this;
  }

  validate = (value: any, type: FormField) => {
    switch (type) {
      case "email": return this.email(value);
      case "password": return this.password(value);
    }
  }
}

export const getValidator = () => {
  return new Validator();
};
