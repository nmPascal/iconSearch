import { atom } from "jotai";
import { IIcon } from "./interfaces/IIcon";
import { atomWithStorage } from "jotai/utils";

export const allRecordsAtom = atom<IIcon[] | null>(null);
export const myRecordsAtom = atomWithStorage<IIcon[]>("MyRecords", []);
export const searchValAtom = atom<string>("");
export const isPanelOpenAtom = atom<boolean>(false);
export const isSettingsOpenAtom = atom<boolean>(false);
export const iconSizeAtom = atomWithStorage<number>("Icons_size", 48);
export const iconColorAtom = atomWithStorage<string>("Icons_color", "#999");
export const customColorAtom = atomWithStorage<string>(
  "Custom_color",
  "#D36CCF"
);
export const iconFormatAtom = atom<"svg" | "png">("svg");
