module.exports = {
  stories: ['./stories/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
			name: '@storybook/addon-docs',
			options: { configureJSX: true },
		},
		'@storybook/addon-knobs',
		'@storybook/addon-storysource',
		'@storybook/addon-viewport',
		'@storybook/addon-a11y',
  ],
  
};
