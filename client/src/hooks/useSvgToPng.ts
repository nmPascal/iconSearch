import { Canvg } from "Canvg";

const useSvgToPng = () => {
  const convertSvgToPng = async (svgPath: string, size: number = 100) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let v: Canvg | null = null;

    v = await Canvg.from(ctx!, svgPath);

    v.resize(size, size);

    v.start();

    const img = canvas.toDataURL("img/png");

    return img;
  };

  return { convertSvgToPng };
};

export default useSvgToPng;
