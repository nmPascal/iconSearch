import { Icon } from "@fluentui/react";
import { useAtom } from "jotai";
import React from "react";
import {
  iconFormatAtom,
  iconSizeAtom,
  myRecordsAtom,
  iconColorAtom,
} from "../../atoms";
import useDownloadZipFile from "../../hooks/useDownloadZipFile";
import CSS from "./style.module.css";

type Props = {
  children?: React.ReactChild;
};

const Download = ({ children }: Props) => {
  const [myRecords, setMyRecords] = useAtom(myRecordsAtom);
  const [iconSize] = useAtom(iconSizeAtom);
  const [iconColor] = useAtom(iconColorAtom);
  const [iconFormat] = useAtom(iconFormatAtom);

  const { downloadFiles } = useDownloadZipFile();

  const handleDownload = () => {
    if (!myRecords.length) {
      alert("No icons selected");
    } else {
      downloadFiles(myRecords, iconSize, iconColor, iconFormat);

      setMyRecords([]);
    }
  };
  return (
    <div className={CSS.download}>
      <button onClick={() => handleDownload()}>
        <Icon iconName="Download" />
      </button>
    </div>
  );
};

export default Download;
