import {Meta, StoryObj} from '@storybook/react';
import {ThemeProvider} from '@emotion/react';
import theme from '../../styles/theme';
import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Avatar',
  component: Avatar,
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Circle: Story = {
  args: {
    uri: 'https://image.ckie.store/images/default-profile-image.png',
    size: 128,
  },
};

export const Rounded: Story = {
  args: {
    uri: 'https://image.ckie.store/images/default-profile-image.png',
    rounded: true,
    size: 128,
  },
};
