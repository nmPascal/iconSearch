import { downloadZip } from "client-zip";
import { IIcon } from "../interfaces/IIcon";
import useSvgToPng from "./useSvgToPng";
import useSVGHandler from "./useSVGHandler";

const useDownloadZipFile = () => {
  const { convertSvgToPng } = useSvgToPng();
  const { handleSVG } = useSVGHandler();

  const downloadFiles = async (
    files: IIcon[],
    size: number = 48,
    color: string = "#999",
    format: "svg" | "png" = "svg"
  ) => {
    const downloadObjects: (
      | Response
      | File
      | { name: string; lastModified?: Date; input: string }
    )[] = [];

    files.forEach(async (f, idx) => {
      const p = f.filePath.split("/");
      p[p.length - 1] = encodeURIComponent(p[p.length - 1]);
      const path = p.join("/");

      const svgFetch = await fetch(path);
      const svgTxt = await svgFetch.text();

      const svg = handleSVG(svgTxt, color, "download", size) as SVGElement;

      if (format === "svg") {
        const svgObj = {
          name: f.filePath.split("/").pop() || "",
          lastModified: new Date(),
          input: svg.outerHTML,
        };
        downloadObjects.push(svgObj);
      } else {
        const png = await convertSvgToPng(svg.outerHTML);

        const pngFetch = await fetch(png);
        const blob = await pngFetch.blob();
        const file = new File([blob], `${f.title}.png`, {
          type: "image/png",
        });
        downloadObjects.push(file);
      }

      if (idx === files.length - 1) {
        _initDownload(downloadObjects);
      }
    });
  };

  /**
   * Starts the download process for a dynamically
   * created zip file
   */
  const _initDownload = async (
    downloads: (
      | File
      | Response
      | { name: string; lastModified?: Date; input: string }
    )[],
    fileName: string = "nm-icons.zip"
  ) => {
    const blob = await downloadZip(downloads).blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
  };

  return {
    downloadFiles,
  };
};

export default useDownloadZipFile;
