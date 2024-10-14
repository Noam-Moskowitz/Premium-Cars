export const retrieveUsers = () => {
  return localStorage.getItem("users");
};

export const addToSavedUsers = (email: string) => {
  const usersList = retrieveUsers();

  if (!usersList) return localStorage.setItem("users", JSON.stringify([email]));
  if (usersList.includes(email)) return;

  const updatedUsers = [...JSON.parse(usersList), email];
  localStorage.setItem("users", JSON.stringify(updatedUsers));
};

export const deleteUser = (index: number) => {
  const usersList: any = retrieveUsers();

  if (!usersList) return;

  const updatedUsersList = JSON.parse(usersList).filter((_, i: number) => i !== index);

  if (updatedUsersList.length === 0) {
    localStorage.removeItem(`users`);
    return null;
  }

  localStorage.setItem("users", JSON.stringify(updatedUsersList));

  return updatedUsersList;
};
