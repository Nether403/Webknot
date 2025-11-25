import { useState } from 'react';
import { toast } from 'sonner';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

import useForceRerender from '../../hooks/useForceRerender';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import Dependencies from '../../components/code/Dependencies';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';

import { splitText } from '../../constants/code/TextAnimations/splitTextCode';
import SplitText from '../../content/TextAnimations/SplitText/SplitText';

const SplitTextDemo = () => {
  const [delay, setDelay] = useState(70);
  const [duration, setDuration] = useState(2);
  const [ease, setEase] = useState('elastic.out(1, 0.3)');
  const [splitType, setSplitType] = useState('chars');
  const [showCallback, setShowCallback] = useState(true);

  const [key, forceRerender] = useForceRerender();

  const propData = [
    {
      name: 'tag',
      type: 'string',
      default: '"p"',
      description: 'HTML tag to render: "h1", "h2", "h3", "h4", "h5", "h6", "p",'
    },
    { name: 'text', type: 'string', default: '""', description: 'The text content to animate.' },
    { name: 'className', type: 'string', default: '""', description: 'Additional class names to style the component.' },
    { name: 'delay', type: 'number', default: '100', description: 'Delay between animations for each letter (in ms).' },
    {
      name: 'duration',
      type: 'number',
      default: '0.6',
      description: 'Duration of each letter animation (in seconds).'
    },
    { name: 'ease', type: 'string', default: '"power3.out"', description: 'GSAP easing function for the animation.' },
    {
      name: 'splitType',
      type: 'string',
      default: '"chars"',
      description: 'Split type: "chars", "words", "lines", or "words, chars".'
    },
    {
      name: 'from',
      type: 'object',
      default: '{ opacity: 0, y: 40 }',
      description: 'Initial GSAP properties for each letter/word.'
    },
    {
      name: 'to',
      type: 'object',
      default: '{ opacity: 1, y: 0 }',
      description: 'Target GSAP properties for each letter/word.'
    },
    {
      name: 'threshold',
      type: 'number',
      default: '0.1',
      description: 'Intersection threshold to trigger the animation (0-1).'
    },
    { name: 'rootMargin', type: 'string', default: '"-100px"', description: 'Root margin for the ScrollTrigger.' },
    {
      name: 'textAlign',
      type: 'string',
      default: '"center"',
      description: "Text alignment: 'left', 'center', 'right', etc."
    },
    {
      name: 'onLetterAnimationComplete',
      type: 'function',
      default: 'undefined',
      description: 'Callback function when all animations complete.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" minH={400} overflow="hidden">
          <RefreshButton onClick={forceRerender} />
          <SplitText
            key={key}
            text="Hello, you!"
            delay={delay}
            duration={duration}
            ease={ease}
            splitType={splitType}
            className="split-text-demo"
            onLetterAnimationComplete={showCallback ? () => toast('✅ Animation Finished!') : undefined}
          />
        </Box>

        <Customize>
          <Flex gap={2} wrap="wrap">
            <Button
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: '#271E37' }}
              color="#fff"
              h={10}
              onClick={() => {
                setSplitType(splitType === 'chars' ? 'words' : splitType === 'words' ? 'lines' : 'chars');
                forceRerender();
              }}
            >
              Split Type: <Text color={'#a1a1aa'}>&nbsp;{splitType}</Text>
            </Button>
            <Button
              fontSize="xs"
              bg="#170D27"
              borderRadius="10px"
              border="1px solid #271E37"
              _hover={{ bg: '#271E37' }}
              color="#fff"
              h={10}
              onClick={() => {
                setEase(
                  ease === 'power3.out' ? 'bounce.out' : ease === 'bounce.out' ? 'elastic.out(1, 0.3)' : 'power3.out'
                );
                forceRerender();
              }}
            >
              Ease: <Text color={'#a1a1aa'}>&nbsp;{ease}</Text>
            </Button>
          </Flex>

          <PreviewSlider
            title="Stagger Delay (ms)"
            min={10}
            max={500}
            step={10}
            value={delay}
            onChange={val => {
              setDelay(val);
              forceRerender();
            }}
          />

          <PreviewSlider
            title="Duration (s)"
            min={0.1}
            max={2}
            step={0.1}
            value={duration}
            onChange={val => {
              setDuration(val);
              forceRerender();
            }}
          />

          <PreviewSwitch
            title="Show Completion Toast"
            isChecked={showCallback}
            onChange={checked => {
              setShowCallback(checked);
              forceRerender();
            }}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap', '@gsap/react']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={splitText} />
      </CodeTab>
    </TabsLayout>
  );
};

export default SplitTextDemo;
