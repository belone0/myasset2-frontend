import { defineStore } from "pinia";

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: localStorage.getItem("theme") || "light",
    }),
    actions: {
        toggleTheme() {
            this.theme = this.theme === "light" ? "dark" : "light";
            localStorage.setItem("theme", this.theme);
            document.documentElement.classList.toggle('dark', this.theme === 'dark');
        },
        initializeTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            this.theme = savedTheme;
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        },

    },

});


