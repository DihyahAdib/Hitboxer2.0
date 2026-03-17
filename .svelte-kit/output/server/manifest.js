export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["icon.ico","icon.png","icons/mac/icon.icns","icons/png/1024x1024.png","icons/png/128x128.png","icons/png/16x16.png","icons/png/24x24.png","icons/png/256x256.png","icons/png/32x32.png","icons/png/48x48.png","icons/png/512x512.png","icons/png/64x64.png","icons/win/icon.ico","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.B80WKeE3.js",app:"_app/immutable/entry/app.DCrfWLX4.js",imports:["_app/immutable/entry/start.B80WKeE3.js","_app/immutable/chunks/CNgN5adM.js","_app/immutable/chunks/DDjwX8FY.js","_app/immutable/entry/app.DCrfWLX4.js","_app/immutable/chunks/DDjwX8FY.js","_app/immutable/chunks/VW5J7XtQ.js","_app/immutable/chunks/CDQQqgCD.js","_app/immutable/chunks/BgI4QsO0.js","_app/immutable/chunks/o14MCbrj.js","_app/immutable/chunks/BP1P6TUN.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
