import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';

import { colorBends } from '@/constants/code/Backgrounds/colorBendsCode';
import ColorBends from '@/content/Backgrounds/ColorBends/ColorBends';

const ColorBendsDemo = () => {
  const [rotation, setRotation] = useState(0);
  const [autoRotate, setAutoRotate] = useState(0);
  const [speed, setSpeed] = useState(0.2);
  const [scale, setScale] = useState(1);
  const [frequency, setFrequency] = useState(1);
  const [warpStrength, setWarpStrength] = useState(1);
  const [mouseInfluence, setMouseInfluence] = useState(1);
  const [parallax, setParallax] = useState(0.5);
  const [noise, setNoise] = useState(0.1);
  const [color, setColor] = useState('');

  const propData = [
    { name: 'rotation', type: 'number', default: '45', description: 'Base rotation angle in degrees.' },
    { name: 'autoRotate', type: 'number', default: '0', description: 'Automatic rotation speed in degrees/sec.' },
    { name: 'speed', type: 'number', default: '0.2', description: 'Animation time scale of the shader.' },
    {
      name: 'colors',
      type: 'string[]',
      default: '[]',
      description: 'Palette of up to 8 hex colors used to blend the bends.'
    },
    {
      name: 'transparent',
      type: 'boolean',
      default: 'true',
      description: 'Whether the background is transparent (uses alpha).'
    },
    { name: 'scale', type: 'number', default: '1', description: 'Zoom factor of the pattern.' },
    { name: 'frequency', type: 'number', default: '1', description: 'Wave frequency used in the pattern.' },
    {
      name: 'warpStrength',
      type: 'number',
      default: '1',
      description: 'Amount of warping/distortion applied to waves.'
    },
    {
      name: 'mouseInfluence',
      type: 'number',
      default: '1',
      description: 'How strongly the waves react to pointer movement.'
    },
    { name: 'parallax', type: 'number', default: '0.5', description: 'Parallax factor shifting content with pointer.' },
    { name: 'noise', type: 'number', default: '0.1', description: 'Adds subtle grain. 0 disables noise.' },
    { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes for the container.' },
    { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Inline styles for the container.' }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" p={0}>
          <ColorBends
            rotation={rotation}
            autoRotate={autoRotate}
            speed={speed}
            scale={scale}
            frequency={frequency}
            warpStrength={warpStrength}
            mouseInfluence={mouseInfluence}
            parallax={parallax}
            noise={noise}
            colors={[color]}
          />

          <BackgroundContent pillText="New Background" headline="You have the power to reshape your own destiny" />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Single Color
            </Text>
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} width="50px" />
          </Flex>
          <PreviewSlider title="Rotation (deg)" min={-180} max={180} step={1} value={rotation} onChange={setRotation} />
          <PreviewSlider
            title="Auto Rotate (deg/s)"
            min={-5}
            max={5}
            step={1}
            value={autoRotate}
            onChange={setAutoRotate}
          />
          <PreviewSlider title="Speed" min={0} max={1} step={0.01} value={speed} onChange={setSpeed} />
          <PreviewSlider title="Scale" min={0.2} max={5} step={0.1} value={scale} onChange={setScale} />
          <PreviewSlider title="Frequency" min={0.0} max={5} step={0.1} value={frequency} onChange={setFrequency} />
          <PreviewSlider
            title="Warp Strength"
            min={0}
            max={1}
            step={0.05}
            value={warpStrength}
            onChange={setWarpStrength}
          />
          <PreviewSlider
            title="Mouse Influence"
            min={0}
            max={2}
            step={0.05}
            value={mouseInfluence}
            onChange={setMouseInfluence}
          />
          <PreviewSlider title="Parallax" min={0} max={2} step={0.05} value={parallax} onChange={setParallax} />
          <PreviewSlider title="Noise" min={0} max={1} step={0.01} value={noise} onChange={setNoise} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={colorBends} />
      </CodeTab>
    </TabsLayout>
  );
};

export default ColorBendsDemo;
