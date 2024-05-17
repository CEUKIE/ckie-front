import {Meta, StoryObj} from '@storybook/react';
import Button from './Button';
import theme from '../../styles/theme';
import {ThemeProvider} from '@emotion/react';
import {Headline6} from './TextGroup';
import {Basic} from './Headline6.stories';
import {Alert} from 'react-native';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  decorators: [
    Story => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: <Headline6 {...Basic.args} color="white" />,
    onPress: () => Alert.alert('Press'),
  },
};
export const Outline: Story = {
  args: {
    varient: 'outline',
    onPress: () => Alert.alert('Press'),
    children: <Headline6 {...Basic.args} color="black" />,
  },
};

export const Text: Story = {
  args: {
    varient: 'text',
    onPress: () => Alert.alert('Press'),
    children: <Headline6 {...Basic.args} color="#black" />,
  },
};
