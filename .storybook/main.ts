module.exports = {
  stories: [
    '../src/welcome.stories.tsx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-actions/register',
    '@storybook/preset-create-react-app',
  ],
}
