import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        // dark: true,
        options: { customProperties: true },
        themes: {
            light: {
                primary: '#d44c6b',
                secondary: "#5887fa",
                black2: '#1D3557',
                red: '#FF1F1F',
                green: '#27AE62',
                yellow: '#EBB000',
                orangeRed: '#FF7C81',
                purple: '#6E38DD',
                darkRed: '#EF5645',
                Gray1: '#F1F1F1',
            }
        },
    }
});
