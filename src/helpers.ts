export const seperateNameFromExtension = (name: string) => {
  const splitName = name.split(".");
  const nameWithoutExtension = splitName
    .filter((item) => item)
    .splice(0, splitName.length - 1)
    .join(".");
  const extension = splitName[splitName.length - 1];
  return [nameWithoutExtension, "." + extension];
};
