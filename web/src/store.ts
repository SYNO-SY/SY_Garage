import { atom } from "recoil";

export interface ItemData {
  title: string;
  plate: string;
  speed: number;
  body: number;
  engine: number;
  fuel: number;
  status: string;
  props: [];
  fine: number;
}

export const vehicleDataAtom = atom<ItemData[]>({
  key: "vehicleData",
  default: [],
});

export const selectedVehicleAtom = atom<ItemData | null>({
  key: "selectedVehicleAtom",
  default: null,
});

export const SpawnPoint = atom({
  key: "SpawnPoint",
  default: null,
});

export const iv_Props = atom({
  key: "iv_props",
  default: {},
});

export const iv_Plate = atom({
  key: "iv_plate",
  default: "",
});

export const iv_Vehicle = atom({
  key: "iv_vehicle",
  default: null,
});

export const ui_State = atom({
  key: "ui_state",
  default: "garage",
});

export interface RemainingData {
  time: number;
  string: string;
}
export const iv_RemainingTime = atom<RemainingData>({
  key: "iv_remainingTime",
  default: {
    time: 0,
    string: "",
  },
});
