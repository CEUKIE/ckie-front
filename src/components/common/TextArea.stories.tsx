import {Meta, StoryObj} from '@storybook/react';
import {ThemeProvider} from '@emotion/react';
import theme from '../../styles/theme';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'TextArea',
  component: TextArea,
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
type Story = StoryObj<typeof TextArea>;

export const Circle: Story = {
  args: {
    placeholder: '안녕?',
    fontSize: 24,
  },
};
