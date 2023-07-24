/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "moderate-blue": "hsl(238, 40%, 52%)",
        "grayish-blue": "hsl(211, 10%, 45%)",
        "light-grayish-blue": "hsl(239, 57%, 85%)",
        "dark-blue": "hsl(212, 24%, 26%)",
        "pale-red": "hsl(357, 100%, 86%)",
        "soft-red": "hsl(358, 79%, 66%)",
        "light-grey": "hsl(223, 19%, 93%)",
        "very-light-grey": "hsl(228, 33%, 97%)",
      },

      screens: {
        phone: "375px",
        bigPhone: "475px",
        tablet: "650px",
        // => @media (min-width: 375px)

        // md: { max: "700px" },
      },
    },
  },
  plugins: [],
}
