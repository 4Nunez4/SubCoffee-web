/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto-thin": ["Roboto Thin", "sans-serif"],
        "roboto-light": ["Roboto Light", "sans-serif"],
        "roboto-regular": ["Roboto", "sans-serif"],
        "roboto-medium": ["Roboto Medium", "sans-serif"],
        "roboto-bold": ["Roboto Bold", "sans-serif"],
        "roboto-black": ["Roboto Black", "sans-serif"],
        // variantes italic
        "roboto-thin-italic": ["Roboto Thin Italic", "sans-serif"],
        "roboto-light-italic": ["Roboto Light Italic", "sans-serif"],
        "roboto-regular-italic": ["Roboto Italic", "sans-serif"],
        "roboto-medium-italic": ["Roboto Medium Italic", "sans-serif"],
        "roboto-bold-italic": ["Roboto Bold Italic", "sans-serif"],
        "roboto-black-italic": ["Roboto Black Italic", "sans-serif"],
      },
    },
    colors: {
      verdeSena1: "#3daf04",
      verdeSena2: "#39A800",
      naranjaSena: "#F27323",
      blanco: "#ffffff",
      blancoMedio: "#f5f5f5",
      blancoMedio1: "#eaeaea",
      grisClaro: "#dddddd",
      grisMedio: "#cccccc",
      gridMedio1: "#b4b4b4",
      grisMedio2: "#999999",
      grisMedio3: "#767676",
      grisOscuro: "#555555",
      cafeOscuroLogo: "#4A3621",
      cafeClaroLogo: "#DEBFA8",
      negro: "#000",
      rojo: "#FF0000",
      marrom: "#800000",
    },
  },
  plugins: [],
};
