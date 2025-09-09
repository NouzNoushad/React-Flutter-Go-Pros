/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
            colors: {
                backgroundColor: '#050011',
                primaryColor: '#0C0028',
                secondaryColor: '#11053D',
                hintColor: '#79787B',
                whiteColor: '#fff',
            }
        },
    },
    plugins: [],
}

