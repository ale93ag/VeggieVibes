//VeggieVibes\src\service\localStorage.jsx

export const getLocalStorageData = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
  
    const parsedData = JSON.parse(data);
    if (new Date().getTime() > parsedData.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return parsedData.value;
  };
  
  export const setLocalStorageData = (key, value, expiryInMinutes) => {
    const now = new Date();
    const expiry = now.getTime() + expiryInMinutes * 60 * 1000;
    const data = {
      value,
      expiry
    };
    localStorage.setItem(key, JSON.stringify(data));
  };