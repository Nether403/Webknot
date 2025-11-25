import { Box, Text } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import DecayCard from '../../content/Components/DecayCard/DecayCard';
import { decayCard } from '../../constants/code/Components/decayCardCode';

const DecayCardDemo = () => {
  const propData = [
    {
      name: 'children',
      type: 'ReactNode',
      default: '',
      description: 'The content (JSX) to be rendered inside the card.'
    },
    {
      name: 'width',
      type: 'number',
      default: '200',
      description: 'The width of the card in pixels.'
    },
    {
      name: 'height',
      type: 'number',
      default: '300',
      description: 'The height of the card in pixels.'
    },
    {
      name: 'image',
      type: 'string',
      default: '',
      description: 'Allows setting the background image of the card.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" overflow="hidden">
          <DecayCard>
            <Text mixBlendMode="overlay">
              Decay
              <br />
              Card
            </Text>
          </DecayCard>
        </Box>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={decayCard} />
      </CodeTab>
    </TabsLayout>
  );
};

export default DecayCardDemo;
