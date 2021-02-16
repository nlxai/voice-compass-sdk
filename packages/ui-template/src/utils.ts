export type RequestStatus<Data = {}> =
  | { type: "noRequest" }
  | { type: "pending" }
  | { type: "success"; payload?: Data }
  | { type: "error"; payload?: string };

export const noRequest: RequestStatus = {
  type: "noRequest",
};

export const pending: RequestStatus = {
  type: "pending",
};

export function success<Data>(data?: Data): RequestStatus<Data> {
  return {
    type: "success",
    payload: data,
  };
}

export function error(payload?: string) {
  return {
    type: "error",
    payload,
  };
}
