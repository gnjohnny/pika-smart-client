export const extractNameFromEmail = (email: string): string => {
  return email
    ? email.split("@")[0].replace(/^./, (c: string) => c.toUpperCase())
    : "";
};
