export const determineNavRoute = (route: string) => {
  const splitUrl = route.split(`/`);

  if (!splitUrl[1]) return `home`;

  const cleanedRoute = splitUrl[1].replace(/[-]/g, ` `).trim().toLowerCase();

  return cleanedRoute;
};

export const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);
