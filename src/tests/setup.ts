import '@testing-library/jest-dom/vitest';

// Mock window.matchMedia for jsdom
if (!window.matchMedia) {
	window.matchMedia = function () {
		return {
			matches: false,
			media: '',
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		};
	};
}
