import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    base: "/skills-exchange-board/",
    build: {
        sourcemap: false,
    },
    plugins: [react()],
});
