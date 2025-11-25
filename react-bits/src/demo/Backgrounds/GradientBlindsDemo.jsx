import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import { gradientBlinds } from '../../constants/code/Backgrounds/gradientBlindsCode';
import GradientBlinds from '../../ts-default/Backgrounds/GradientBlinds/GradientBlinds';

const GradientBlindsDemo = () => {
  const [color1, setColor1] = useState('#FF9FFC');
  const [color2, setColor2] = useState('#5227FF');
  const [angle, setAngle] = useState(20);
  const [noise, setNoise] = useState(0.5);
  const [blindCount, setBlindCount] = useState(16);
  const [blindMinWidth, setBlindMinWidth] = useState(60);
  const [spotlightRadius, setSpotlightRadius] = useState(0.5);
  const [distortAmount, setDistortAmount] = useState(0);
  const [mouseDampening, setMouseDampening] = useState(0.15);
  const [shineDirection, setShineDirection] = useState('left');

  const gradientColors = [color1, color2];

  const propData = [
    {
      name: 'gradientColors',
      type: 'string[]',
      default: "['#FF9FFC', '#5227FF']",
      description:
        'Array of hex colors (up to 8) forming the animated gradient. If one color is provided it is duplicated.'
    },
    {
      name: 'angle',
      type: 'number',
      default: 0,
      description: 'Rotation of the gradient in degrees (0 = horizontal left→right).'
    },
    {
      name: 'noise',
      type: 'number',
      default: 0.3,
      description: 'Strength of per‑pixel noise added to the final color (0 = clean).'
    },
    {
      name: 'blindCount',
      type: 'number',
      default: 16,
      description: 'Target number of vertical blinds. Acts as an upper bound when blindMinWidth is set.'
    },
    {
      name: 'blindMinWidth',
      type: 'number',
      default: 60,
      description:
        'Minimum pixel width for each blind. Reduces effective blindCount if necessary to satisfy this width.'
    },
    {
      name: 'mouseDampening',
      type: 'number',
      default: 0.15,
      description: 'Easing time constant (seconds) for the spotlight to follow the cursor. 0 = immediate.'
    },
    {
      name: 'mirrorGradient',
      type: 'boolean',
      default: false,
      description: 'Creates a mirrored ping‑pong gradient progression instead of a linear wrap.'
    },
    {
      name: 'spotlightRadius',
      type: 'number',
      default: 0.5,
      description: 'Normalized spotlight radius relative to the shorter canvas dimension.'
    },
    {
      name: 'spotlightSoftness',
      type: 'number',
      default: 1,
      description: 'Falloff exponent for spotlight edge. Higher = sharper edge (values >1 increase contrast).'
    },
    {
      name: 'spotlightOpacity',
      type: 'number',
      default: 1,
      description: 'Overall intensity multiplier for the spotlight highlight.'
    },
    {
      name: 'distortAmount',
      type: 'number',
      default: 0,
      description: 'Sin/cos warp intensity applied to UVs for subtle wavy distortion.'
    },
    {
      name: 'shineDirection',
      type: "'left' | 'right'",
      default: 'left',
      description: 'Flips the bright side of each blind; useful for composition with other elements.'
    },
    {
      name: 'mixBlendMode',
      type: 'string',
      default: "'lighten'",
      description: "CSS mix-blend-mode applied to the canvas (e.g. 'screen', 'overlay', 'multiply')."
    },
    {
      name: 'paused',
      type: 'boolean',
      default: false,
      description: 'If true, stops rendering updates (freezing the current frame).'
    },
    {
      name: 'dpr',
      type: 'number',
      default: 'window.devicePixelRatio',
      description: 'Overrides device pixel ratio; lower for performance, higher for sharpness.'
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Additional class names for the root container.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <GradientBlinds
            gradientColors={gradientColors}
            angle={angle}
            noise={noise}
            blindCount={blindCount}
            blindMinWidth={blindMinWidth}
            spotlightRadius={spotlightRadius}
            distortAmount={distortAmount}
            mouseDampening={mouseDampening}
            shineDirection={shineDirection}
          />

          <BackgroundContent pillText="New Background" headline="Smooth gradients make everything better" />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4} gap={4} wrap="wrap">
            <Flex alignItems="center" mb={2} gap={2}>
              <Text fontSize="sm">Color 1</Text>
              <Input type="color" value={color1} width="50px" onChange={e => setColor1(e.target.value)} />
            </Flex>
            <Flex alignItems="center" mb={2} gap={2}>
              <Text fontSize="sm">Color 2</Text>
              <Input type="color" value={color2} width="50px" onChange={e => setColor2(e.target.value)} />
            </Flex>
          </Flex>

          <PreviewSelect
            title="Light Direction"
            value={shineDirection}
            onChange={setShineDirection}
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' }
            ]}
          />

          <PreviewSlider title="Blinds Angle" min={0} max={360} step={1} value={angle} onChange={setAngle} />
          <PreviewSlider title="Noise Amount" min={0} max={1} step={0.01} value={noise} onChange={setNoise} />

          <PreviewSlider title="Blinds Count" min={1} max={64} step={1} value={blindCount} onChange={setBlindCount} />

          <PreviewSlider
            title="Min Blind W"
            min={10}
            max={200}
            step={5}
            value={blindMinWidth}
            onChange={setBlindMinWidth}
          />

          <PreviewSlider
            title="Spot Radius"
            min={0.05}
            max={1}
            step={0.05}
            value={spotlightRadius}
            onChange={setSpotlightRadius}
          />

          <PreviewSlider title="Distort" min={0} max={100} step={1} value={distortAmount} onChange={setDistortAmount} />
          <PreviewSlider
            title="Mouse Damp"
            min={0}
            max={1}
            step={0.01}
            value={mouseDampening}
            onChange={setMouseDampening}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={gradientBlinds} />
      </CodeTab>
    </TabsLayout>
  );
};

export default GradientBlindsDemo;
