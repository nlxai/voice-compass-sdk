import adapter from 'sveltekit-adapter-chrome-extension';

const config = {
	kit: {
		adapter: adapter(),
		appDir: "app",
		prerender: {
			default: true,
		},
	}
};

export default config;
