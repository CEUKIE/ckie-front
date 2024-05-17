import {Meta, StoryObj} from '@storybook/react';
import {Headline6} from './TextGroup';
import {ThemeProvider} from '@emotion/react';
import theme from '../../styles/theme';

const meta: Meta<typeof Headline6> = {
  title: 'Headline6',
  component: Headline6,
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Headline6>;

export const Basic: Story = {
  args: {
    children: 'Hello Snail!',
  },
};
