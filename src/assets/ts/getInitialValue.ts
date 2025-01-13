export const getInitialValue = <T>(key: string, initialValue: T): T => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue == null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } else {
      return JSON.parse(jsonValue);
    }
  };