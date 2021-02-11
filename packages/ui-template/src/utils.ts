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
