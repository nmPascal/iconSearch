import {
  ColorPicker,
  DefaultButton,
  Icon,
  Modal,
  PrimaryButton,
  Slider,
} from "@fluentui/react";
import React, { useCallback, useRef, useState } from "react";
import CSS from "./style.module.css";
import { useAtom } from "jotai";
import {
  customColorAtom,
  iconColorAtom,
  iconFormatAtom,
  iconSizeAtom,
} from "../../atoms";

const styles = {
  modal: {
    main: {
      minWidth: "300px",
      backgroundColor: "#303030",
      padding: "1rem",
      color: "#ccc",
      userSelect: "none",
    },
  },
};

const colors = ["#fff", "#999", "#000"];
const formats = ["svg", "png"];

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const Settings = ({ isOpen, setIsOpen }: Props) => {
  const [customColor, setCustomColor] = useAtom(customColorAtom);
  const [iconColor, setIconColor] = useAtom(iconColorAtom);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [newColor, setNewColor] = useState<string>(customColor);
  const [iconSize, setIconSize] = useAtom(iconSizeAtom);
  const [iconFormat, setIconFormat] = useAtom(iconFormatAtom);

  const handleNewColor = (req: "s" | "c") => {
    if (req === "s") {
      setCustomColor(newColor);
      setIconColor(newColor);
      setIsColorPickerOpen(false);
    } else {
      setIsColorPickerOpen(false);
    }
  };

  console.log(iconFormat);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        styles={styles.modal}
      >
        <div className={CSS.modalHeader}>
          <h2>Settings</h2>
          <button onClick={() => setIsOpen(false)}>
            <Icon iconName="Cancel" />
          </button>
        </div>
        <div className={CSS.modalMain}>
          <div className={CSS.colors}>
            <h3>Choose your color</h3>
            <div className={CSS.colorInputs}>
              {colors.map((c, idx) => (
                <div
                  className={CSS.input}
                  key={idx}
                  style={{
                    backgroundColor: c,
                    border: c === iconColor ? "3px solid #5185da" : "none",
                  }}
                >
                  <input
                    type="radio"
                    name="color"
                    id={c}
                    value={c}
                    onClick={() => setIconColor(c)}
                  />
                </div>
              ))}
              <button
                className={CSS.newColor}
                onClick={() => setIsColorPickerOpen(true)}
                style={{
                  border:
                    customColor === iconColor ? "3px solid #5185da" : "none",
                }}
              >
                <Icon iconName="Edit" />
              </button>
            </div>
          </div>
          <div className={CSS.size}>
            <h3>Choose your size</h3>
            <div className={CSS.sizeInputs}>
              <input
                type="range"
                min={12}
                max={512}
                value={iconSize}
                onChange={(ev) => setIconSize(parseInt(ev.target.value))}
              />
              <p>{iconSize}</p>
            </div>
          </div>
          <div className={CSS.formats}>
            <h3>Choose your formats</h3>
            <div className={CSS.formatsInputs}>
              {formats.map((f, idx) =>
                f === iconFormat ? (
                  <PrimaryButton key={idx}>{f}</PrimaryButton>
                ) : (
                  <DefaultButton
                    key={idx}
                    onClick={() => setIconFormat(f as "png" | "svg")}
                    style={{ backgroundColor: "transparent", color: "#fff" }}
                  >
                    {f}
                  </DefaultButton>
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={isColorPickerOpen} styles={styles.modal}>
        <div className={CSS.modalHeader}>
          <h2>Settings</h2>
          <button onClick={() => setIsColorPickerOpen(false)}>
            <Icon iconName="Cancel" />
          </button>
        </div>
        <ColorPicker
          color={newColor}
          onChange={(ev, color) => setNewColor(color.str)}
          showPreview={true}
        />
        <div className={CSS.modalFooter}>
          <PrimaryButton text="Save" onClick={() => handleNewColor("s")} />
          <DefaultButton text="Cancel" onClick={() => handleNewColor("c")} />
        </div>
      </Modal>
    </>
  );
};

export default Settings;
