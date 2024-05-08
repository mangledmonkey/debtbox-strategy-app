import type { Meta, StoryObj } from '@storybook/svelte';
import CompoundsChart from './CompoundsChart.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Compounds Chart',
  component: CompoundsChart,
  tags: ['autodocs'],
  argTypes: {
    walletTotals: { control: 'text' },
  },
} satisfies Meta<CompoundsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    walletTotals: {
      "totalNfts": 15,
      "stakedNfts": 15,
      "unstakedNfts": 0,
      "dailyReturns": 2.1896253662975997,
      "walletBalance": 21.212659,
      "rewardsBalance": 150.76000000000002,
      "avgDailyNftReturn": 0.14597502441983998
    },
  },
};
