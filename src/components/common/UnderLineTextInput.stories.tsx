import {Meta, StoryObj} from '@storybook/react';
import {ThemeProvider} from '@emotion/react';
import theme from '../../styles/theme';
import UnderLineTextInput from './UnderLineTextInput';

const meta: Meta<typeof UnderLineTextInput> = {
  title: 'UnderLineTextInput',
  component: UnderLineTextInput,
  parameters: {
    docs: {
      description: {
        component: 'fontSize를 제외한 나머지 props는 TextInput과 같음.',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UnderLineTextInput>;

export const Circle: Story = {
  args: {
    placeholder: '안녕?',
    fontSize: 16,
  },
};
