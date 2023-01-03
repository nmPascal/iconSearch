import { IIcon } from "./interfaces/IIcon";

export const loadAllRecords = async () => {
  try {
    const res = await fetch("./icons.json");
    const data = (await res.json()) as IIcon[];

    return {
      data,
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};
