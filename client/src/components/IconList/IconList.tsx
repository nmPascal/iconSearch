import React from "react";
import CSS from "./style.module.css";
import { useAtom } from "jotai";
import { allRecordsAtom, searchValAtom } from "../../atoms";
import Icon from "../Icon/Icon";

type Props = {
  children?: React.ReactChild;
};

const IconList = ({ children }: Props) => {
  const [allRecords] = useAtom(allRecordsAtom);
  const [searchVal] = useAtom(searchValAtom);

  return (
    <div className={CSS.iconList}>
      {allRecords &&
        allRecords
          .filter((val) => {
            if (!searchVal) return val;
            return val.title
              .toLowerCase()
              .includes(searchVal.toLowerCase().trim());
          })
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((record, idx) => <Icon key={idx} icon={record} />)}
    </div>
  );
};

export default IconList;
