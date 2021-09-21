import { seperateNameFromExtension } from "../helpers";

export enum extensionType {
  text = "TEXT",
  ppt = "PPT",
  pdf = "PDF",
  doc = "DOC",
  folder = "FOLDER",
  unknown = "UNKNOWN",
}

export const getExtensionFromFileName = (fileName: string) => {
  const [name, extension] = seperateNameFromExtension(fileName);
  if (extension === ".txt") return extensionType.text;
  else if (extension === ".doc" || extension === ".docx")
    return extensionType.doc;
  else if (extension === ".ppt" || extension === ".pptx")
    return extensionType.ppt;
  else if (extension === ".pdf") return extensionType.pdf;
  else return extensionType.unknown;
};

class Entity {
  name;
  type;
  fileType: extensionType;
  path;
  constructor(name: string, type: "file" | "folder", path: string) {
    this.name = name;
    this.type = type;
    this.path = path;
    if (type === "file") this.fileType = getExtensionFromFileName(name);
    else this.fileType = extensionType.folder;
  }
}

export default Entity;
