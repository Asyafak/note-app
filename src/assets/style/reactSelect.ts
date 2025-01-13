import { StylesConfig } from "react-select";

type MyOptions = {
  value: string
  label: string
}

export function getCostumeStyles(dark: boolean) {
  return dark ? darkMode : lightMode
}

const darkMode: StylesConfig<MyOptions> = {
    control: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      border: "2px solid #fff", 
      borderRadius: "0.25rem",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#1e293b",
      border: "1px solid #0f172a",
      borderRadius: "0.25rem",
      marginTop: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow-lg
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#020617"
        : state.isFocused
        ? "#0f172a"
        : "#1e293b",
      color: state.isSelected ? "#1e293b" : "#fff",
      padding: "0.5rem",
    }),
  };

  const lightMode: StylesConfig<MyOptions> = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      border: "2px solid #e2e8f0", 
      borderRadius: "0.25rem",
      boxShadow: "none",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      border: "1px solid #0f172a",
      borderRadius: "0.25rem",
      marginTop: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow-lg
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#fff"
        : state.isFocused
        ? "#e2e8f0"
        : "#fff",
      color: state.isSelected ? "#1e293b" : "#000",
      padding: "0.5rem",
    }),
  };