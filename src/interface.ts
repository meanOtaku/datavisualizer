import type { CardDataObject } from "./slice/appCardStateSlice";

export interface state {
    dialogState: { value: boolean };
}
export interface graphDataState {
    dataState: { value: [] };
}
export interface appCardDataState {
    cardDataState: { value: CardDataObject[] };
}
