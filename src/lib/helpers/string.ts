export const toTitleCase = (name: string) => {
  return name
    .split(" ")
    .map(([s, ...rest]) =>
      (`${s.toUpperCase() + rest.join("")}`)).join(" ");
};
