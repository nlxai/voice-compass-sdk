export const isValidEmail = (str: string) => {
  // eslint-disable-next-line
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(str);
};

export type RequestStatus =
  | { type: "none" }
  | { type: "pending" }
  | { type: "success" }
  | { type: "error"; payload: string };

export const none: RequestStatus = {
  type: "none",
};

export const pending: RequestStatus = {
  type: "pending",
};

export const success: RequestStatus = {
  type: "success",
};

export const error = (payload: string): RequestStatus => ({
  type: "error",
  payload,
});
