import { useEffect, useState } from "react";
import CSS from "./style.module.css";
import { IIcon } from "./../../interfaces/IIcon";
import { useAtom } from "jotai";
import { iconColorAtom, myRecordsAtom } from "../../atoms";
import useSVGHandler from "./../../hooks/useSVGHandler";

type Props = {
  icon: IIcon;
};

const Icon = ({ icon }: Props) => {
  const [svg, setSvg] = useState<string>("");
  const { handleSVG } = useSVGHandler();
  const [myRecords, setMyRecords] = useAtom(myRecordsAtom);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [iconColor] = useAtom(iconColorAtom);
  

  useEffect(() => {
    (async () => {
      try {
        const p = icon.filePath.split("/");
        p[p.length - 1] = encodeURIComponent(p[p.length - 1]);
        const path = p.join("/");

        const res = await fetch(path);
        if (res.status !== 200) {
          throw new Error(":: error: failed to fetch data.");
        }

        const data = await res.text();
        const view = handleSVG(data, iconColor, "view");
        setSvg(view as string);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [icon, iconColor]);

  const handleSelectedRecords = (icon: IIcon) => {
    const stored = myRecords.find((rec) => rec.title === icon.title);
    if (stored === undefined) {
      setMyRecords([...myRecords, icon]);
    } else {
      setMyRecords(myRecords.filter((rec) => rec.title !== icon.title));
    }
  };

  useEffect(() => {
    const sel = myRecords.find((rec) => rec.title === icon.title);
    if (sel === undefined) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
  }, [myRecords, icon]);

  return (
    <div
      className={CSS.icon + " " + (isSelected ? CSS.selected : "")}
      title={`Add (${icon.title})`}
      onClick={() => handleSelectedRecords(icon)}
    >
      {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}

      <p>{icon.title}</p>
    </div>
  );
};

export default Icon;
