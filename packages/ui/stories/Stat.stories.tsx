import { Meta } from '@storybook/react/types-6-0';
import Stack from '../src/stack';
import Stat from '../src/stat';

export default {
  title: 'UI/Stat',
  component: Stat,
} as Meta;

export const Demo = () => {
  return (
    <Stack direction="column" spacing={4}>
      <section>
        <Stack direction="row" align="center" spacing={2}>
          <Stat>
            <Stat.Label>Clicks</Stat.Label>
            <Stat.Number>100,000</Stat.Number>
            <Stat.HelpText>
              <Stat.UpArrow />
              0.10%
            </Stat.HelpText>
          </Stat>
          <Stat>
            <Stat.Label>Impressions</Stat.Label>
            <Stat.Number>100,000</Stat.Number>
            <Stat.HelpText>
              <Stat.DownArrow />
              0.10%
            </Stat.HelpText>
          </Stat>
          <Stat>
            <Stat.Label>Purchases</Stat.Label>
            <Stat.Number>100,000</Stat.Number>
            <Stat.HelpText>
              <Stat.Flat />
              0.00%
            </Stat.HelpText>
          </Stat>
        </Stack>
      </section>
    </Stack>
  );
};
