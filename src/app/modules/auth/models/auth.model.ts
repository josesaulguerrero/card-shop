export type AuthPlatform = {
	name: string;
	iconSrc: string;
};

export type LoginPlatform = AuthPlatform & {
	onLogin: () => void;
};
