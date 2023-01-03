import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { useAtom } from "jotai";
import { isSettingsOpenAtom, searchValAtom } from "../../atoms";
import CSS from "./style.module.css";
import { PrimaryButton } from "@fluentui/react";
import Settings from "../Settings/Settings";
import { useState } from "react";

const NavBar = () => {
  const [searchVal, setSearchVal] = useAtom(searchValAtom);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  initializeIcons();
  return (
    <div className={CSS.nav}>
      <div className={CSS.navContent}>
        <SearchBox
          className={CSS.search}
          placeholder="Search"
          value={searchVal}
          onChange={(evt, newVal) => setSearchVal(newVal as string)}
          style={{ fontSize: "1.1rem" }}
        />
        <div className={CSS.settingsContainer}>
          <PrimaryButton
            className={CSS.navBtn}
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <i className="fa-solid fa-gear"></i>
          </PrimaryButton>
          <Settings isOpen={isSettingsOpen} setIsOpen={setIsSettingsOpen} />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
