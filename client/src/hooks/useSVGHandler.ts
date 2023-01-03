const useSVGHandler = () => {
  const handleSVG = (
    fileTxt: string,
    color: string,
    useTo: "download" | "view",
    size?: number
  ) => {
    const svg = fileTxt
      .replace(/<\?xml.*\?>/, "")
      .replace(/<!--.*-->/, "")
      .trim();

    const tmpDiv = document.createElement("div");
    tmpDiv.innerHTML = svg;

    const svgElem = tmpDiv.firstChild as SVGElement;

    const svgChildNodes = svgElem.childNodes;
    const children = _getAllChildElems(svgChildNodes);
    children.forEach((c) => {
      if (c.getAttribute("fill") === "none") return;
      if (c.hasAttribute("fill")) c.setAttribute("fill", color);
    });

    if (useTo === "view") {
      svgElem.setAttribute("width", "48px");
      svgElem.setAttribute("height", "48px");

      const svgStr = new XMLSerializer().serializeToString(svgElem);

      return svgStr;
    } else {
      svgElem.setAttribute("width", "" + size);
      svgElem.setAttribute("height", "" + size);

      return svgElem;
    }
  };

  const _getAllChildElems = (elem: NodeListOf<ChildNode>) => {
    const children: HTMLElement[] = [];
    for (let i = 0; i < elem.length; i++) {
      if (
        elem[i].nodeType === 1 &&
        elem[i].nodeName !== "defs" &&
        elem[i].nodeName !== "title" &&
        elem[i].nodeName !== "desc"
      ) {
        children.push(elem[i] as HTMLElement);
        children.push(..._getAllChildElems(elem[i].childNodes));
      }
    }
    return children;
  };

  return {
    handleSVG,
  };
};

export default useSVGHandler;
