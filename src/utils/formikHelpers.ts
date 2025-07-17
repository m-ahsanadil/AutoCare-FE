import { getIn } from "formik";

export const getFieldError = (touched: any, errors: any, field: string) => {
  const isTouched = getIn(touched, field);
  const error = getIn(errors, field);
  return isTouched && error ? error : undefined;
};
