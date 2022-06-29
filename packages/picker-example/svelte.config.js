import adapter from "@sveltejs/adapter-static";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},
	    package: {
			emitTypes: false,
	    },
	},
	preprocess: [
    	preprocess({ postcss: true, }),
	],
};

export default config;
