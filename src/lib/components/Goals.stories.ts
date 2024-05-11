import type { Meta, StoryObj } from '@storybook/svelte';
import Goals from './Goals.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Goals',
  component: Goals,
  tags: ['autodocs'],
  argTypes: {
  },
} satisfies Meta<Goals>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
   
  },
};
