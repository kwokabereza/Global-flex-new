/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'layouts/**/*.htm',
        'pages/**/*.htm',
        'partials/**/*.htm',
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        screens: {
            xxs: '400px',
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
            '3xl': '1700px'
        },
        extend: {
            maxWidth: {
                '25': '25%',
                '50': '50%',
            },
            colors: {
                'lightgray': '#dee2e6',
                'gray': '#929294',
                'lightgreen': '#9cc917',
                'black': '#000000',
                'red': '#fe0000',
            },
            boxShadow: {
                // 'in': '0 0 0 1px #ebecec',
                'out' : '0 0 10px rgba(0, 0, 0, 0.3)',
                // 'card' : '0 0 20px rgba(146,145,145,.4)'
            },
            fontFamily: {
                'sans': ['VK Sans Display Regular'],
            },
            fontSize: {
                '2xs': ['0.5rem'],
                '10xl': ['16rem', { lineHeight: '1' }],
            },
            spacing: {
                '18': '4.5rem',
                '34': '8.5rem',
                '38': '9.5rem',
                '42': '10.5rem',
                '68': '17rem',
                '88': '22rem',
                '100': '25rem',
                '104': '26rem',
                '108': '27rem',
                '112': '28rem',
                '114': '28.5rem',
                '116': '29rem',
                '128': '32rem',
                '144': '36rem',
            }
        },
        container: {
            padding: {
                DEFAULT: '0',
                xs: '1rem',
                sm: '1rem',
                lg: '1rem',
                xl: '2rem',
                '2xl': '2.5rem',
                '3xl': '3rem',
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
}

