import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import { plasma } from '../../constants/code/Backgrounds/plasmaCode';
import Plasma from '../../ts-default/Backgrounds/Plasma/Plasma';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

const PlasmaDemo = () => {
  const [color, setColor] = useState('#B19EEF');
  const [speed, setSpeed] = useState(1.0);
  const [direction, setDirection] = useState('forward');
  const [scale, setScale] = useState(1.0);
  const [opacity, setOpacity] = useState(1.0);
  const [mouseInteractive, setMouseInteractive] = useState(false);
  const propData = [
    {
      name: 'color',
      type: 'string',
      default: 'undefined',
      description: 'Optional hex color to tint the plasma effect. If not provided, uses original colors.'
    },
    {
      name: 'speed',
      type: 'number',
      default: '1.0',
      description: 'Animation speed multiplier. Higher values = faster animation.'
    },
    {
      name: 'direction',
      type: "'forward' | 'reverse' | 'pingpong'",
      default: "'forward'",
      description: "Animation direction. 'pingpong' oscillates back and forth."
    },
    {
      name: 'scale',
      type: 'number',
      default: '1.0',
      description: 'Zoom level of the plasma pattern. Higher values zoom in.'
    },
    {
      name: 'opacity',
      type: 'number',
      default: '1.0',
      description: 'Overall opacity of the effect (0-1).'
    },
    {
      name: 'mouseInteractive',
      type: 'boolean',
      default: 'false',
      description: 'Whether the plasma responds to mouse movement.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <Plasma
            color={color}
            speed={speed}
            direction={direction}
            scale={scale}
            opacity={opacity}
            mouseInteractive={mouseInteractive}
          />
          <BackgroundContent pillText="New Background" headline="Minimal plasma waves that soothe the eyes" />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Color
            </Text>
            <Input
              type="color"
              value={color}
              onChange={e => {
                setColor(e.target.value);
              }}
              width="50px"
            />
          </Flex>

          <PreviewSelect
            title="Direction"
            options={[
              { value: 'forward', label: 'Forward' },
              { value: 'reverse', label: 'Reverse' },
              { value: 'pingpong', label: 'Ping Pong' }
            ]}
            value={direction}
            onChange={setDirection}
            width={120}
          />

          <PreviewSlider title="Speed" min={0.1} max={3.0} step={0.1} value={speed} onChange={setSpeed} />

          <PreviewSlider title="Scale" min={0.5} max={3.0} step={0.1} value={scale} onChange={setScale} />

          <PreviewSlider title="Opacity" min={0.1} max={1.0} step={0.1} value={opacity} onChange={setOpacity} />

          <PreviewSwitch title="Mouse Interactive" isChecked={mouseInteractive} onChange={setMouseInteractive} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={plasma} />
      </CodeTab>
    </TabsLayout>
  );
};

export default PlasmaDemo;
