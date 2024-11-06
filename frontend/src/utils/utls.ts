export const determineNavRoute = (route: string) => {
  const splitUrl = route.split(`/`);

  if (!splitUrl[1]) return `home`;

  const cleanedRoute = splitUrl[1].replace(/[-]/g, ` `).trim().toLowerCase();

  return cleanedRoute;
};

export const isValidObjectId = (value: string) => /^[a-f\d]{24}$/i.test(value);

export const displayPriceRangeString = (value: number[]) => {
  const firstValue = value[0];

  switch (firstValue) {
    case 0:
      return `0-25$`;
    case 25:
      return `25-50$`;
    case 50:
      return `50-75$`;
    case 75:
      return `75$+`;
  }
};
