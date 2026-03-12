import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const tunnelHost = process.env.VITE_PUBLIC_HOST;

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		allowedHosts: tunnelHost ? [tunnelHost] : [],
		hmr: tunnelHost
			? {
					clientPort: 443,
					host: tunnelHost,
					protocol: "wss",
				}
			: undefined,
		port: 5173,
		strictPort: true,
	},
});
