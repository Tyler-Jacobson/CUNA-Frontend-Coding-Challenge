import { UseFormRegister, FieldValues } from "react-hook-form";

export interface userData {
    price: number,
    make: string,
    model: string,
    income: number,
    credit: number,
    username: string
}

export interface userAction {
    payload: userData,
    type: string
}

export interface signupData {
    username: string,
    password: string,
    confirmPassword: string
}

export interface request {
    body: userData,
    method: string
}

export interface formCreation {
    labelText: string,
    placeholder: string,
    name: string,
    type: string,
    registerFunction: UseFormRegister<FieldValues>,
    [errorMessages: string]: any;
}

export interface qualifiedOptions {
    isQualified: string,
    message: string
}

export interface qualifiedAction {
    payload: qualifiedOptions,
    type: string
}