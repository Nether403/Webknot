import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';

import PrismaticBurst from '../../content/Backgrounds/PrismaticBurst/PrismaticBurst';
import { prismaticBurst } from '../../constants/code/Backgrounds/prismaticBurstCode';

const PrismaticBurstDemo = () => {
  const [animationType, setAnimationType] = useState('rotate3d');
  const [intensity, setIntensity] = useState(2);
  const [speed, setSpeed] = useState(0.5);
  const [distort, setDistort] = useState(0);
  const [hoverDampness, setHoverDampness] = useState(0.25);
  const [rayCount, setRayCount] = useState(0);
  const [color0, setColor0] = useState('');
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const userColors = [color0, color1, color2].filter(Boolean);

  const propData = [
    {
      name: 'intensity',
      type: 'number',
      default: '2',
      description: 'Overall brightness multiplier applied after accumulation.'
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.5',
      description: 'Global time multiplier controlling ray motion & distortion.'
    },
    {
      name: 'animationType',
      type: '"rotate" | "rotate3d" | "hover"',
      default: '"rotate3d"',
      description: 'Core motion style: planar rotation, full 3D rotation, or pointer hover orbit'
    },
    {
      name: 'colors',
      type: 'string[]',
      default: '[]',
      description: 'Optional array of hex colors used as a gradient (otherwise spectral)'
    },
    {
      name: 'distort',
      type: 'number',
      default: '0',
      description: 'Amount of bend/distortion applied to marching space (adds organic wobble)'
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Freeze time progression when true (animation stops)'
    },
    {
      name: 'offset',
      type: '{ x?: number|string; y?: number|string }',
      default: '{ x: 0, y: 0 }',
      description: 'Pixel (or CSS length) offset of focal origin from center'
    },
    {
      name: 'hoverDampness',
      type: 'number',
      default: '0',
      description: "Smoothing factor (0-1) for pointer tracking when animationType='hover'"
    },
    {
      name: 'rayCount',
      type: 'number',
      default: 'undefined',
      description: 'If > 0 applies an angular comb filter to produce discrete ray spokes'
    },
    {
      name: 'mixBlendMode',
      type: "CSSProperties['mixBlendMode'] | 'none'",
      default: '"lighten"',
      description: "Canvas CSS mix-blend-mode (e.g. lighten, screen) or 'none' for normal"
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <PrismaticBurst
            animationType={animationType}
            intensity={intensity}
            speed={speed}
            distort={distort}
            hoverDampness={hoverDampness}
            rayCount={rayCount || undefined}
            {...(userColors.length ? { colors: userColors } : {})}
          />

          <BackgroundContent pillText="New Background" headline="A burst of dancing colors, beautifully unleashed" />
        </Box>

        <Customize>
          <Flex alignItems="center" gap={4} mb={2}>
            <Flex alignItems="center">
              <Text fontSize="sm" mr={2}>
                Color 1
              </Text>
              <Input type="color" value={color0} onChange={e => setColor0(e.target.value)} width="50px" p={0} />
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="sm" mr={2}>
                Color 2
              </Text>
              <Input type="color" value={color1} onChange={e => setColor1(e.target.value)} width="50px" p={0} />
            </Flex>
            <Flex alignItems="center">
              <Text fontSize="sm" mr={2}>
                Color 3
              </Text>
              <Input type="color" value={color2} onChange={e => setColor2(e.target.value)} width="50px" p={0} />
            </Flex>
          </Flex>

          <PreviewSelect
            title="Animation Type"
            options={[
              { value: 'rotate', label: 'Rotate' },
              { value: 'rotate3d', label: 'Rotate 3D' },
              { value: 'hover', label: 'Hover' }
            ]}
            value={animationType}
            onChange={setAnimationType}
            width={140}
          />

          <PreviewSlider title="Intensity" min={0.1} max={5} step={0.1} value={intensity} onChange={setIntensity} />

          <PreviewSlider title="Speed" min={0} max={2} step={0.05} value={speed} onChange={setSpeed} />

          <PreviewSlider title="Distort" min={0} max={10} step={0.1} value={distort} onChange={setDistort} />

          <PreviewSlider title="Ray Count" min={0} max={64} step={1} value={rayCount} onChange={setRayCount} />

          {animationType === 'hover' && (
            <PreviewSlider
              title="Hover Dampness"
              min={0}
              max={1}
              step={0.01}
              value={hoverDampness}
              onChange={setHoverDampness}
            />
          )}
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={prismaticBurst} />
      </CodeTab>
    </TabsLayout>
  );
};

export default PrismaticBurstDemo;
