export const toTitleCase = (name: string) => {
  if (!name) {
    return name;
  }
  return name
    .split(" ")
    .map(([s, ...rest]) =>
      (`${s.toUpperCase() + rest.join("")}`)).join(" ");
};
