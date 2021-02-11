export enum StatusType {
  Active = "active",
  Disabled = "disabled",
  Pending = "pending",
  Error = "error",
}

export interface Status {
  type: StatusType;
  msg?: string;
}

export const active: Status = {
  type: StatusType.Active,
};

export const disabled: Status = {
  type: StatusType.Disabled,
};

export const pending: Status = {
  type: StatusType.Pending,
};

export const error = (msg?: string): Status => ({
  type: StatusType.Error,
  msg,
});
