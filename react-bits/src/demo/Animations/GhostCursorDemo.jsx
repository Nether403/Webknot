import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Text, Flex, Input } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import GhostCursor from '@/content/Animations/GhostCursor/GhostCursor';
import { ghostCursor } from '@/constants/code/Animations/ghostCursorCode';

const GhostCursorDemo = () => {
  const [trailLength, setTrailLength] = useState(50);
  const [inertia, setInertia] = useState(0.5);
  const [grainIntensity, setGrainIntensity] = useState(0.05);
  const [bloomStrength, setBloomStrength] = useState(0.1);
  const [bloomRadius, setBloomRadius] = useState(1.0);
  const [bloomThreshold, setBloomThreshold] = useState(0.025);

  const [brightness, setBrightness] = useState(2);
  const [color, setColor] = useState('#B19EEF');
  const [fadeDelayMs, setFadeDelayMs] = useState(1000);
  const [fadeDurationMs, setFadeDurationMs] = useState(1500);

  const propData = [
    { name: 'className', type: 'string', default: "''", description: 'Additional CSS class names for the container.' },
    {
      name: 'style',
      type: 'React.CSSProperties',
      default: '{}',
      description: 'Inline styles for the container element.'
    },
    {
      name: 'trailLength',
      type: 'number',
      default: '50',
      description: 'Number of points stored for the cursor trail (longer = longer smear).'
    },
    {
      name: 'inertia',
      type: 'number',
      default: '0.5',
      description: 'Velocity retention when the pointer stops. Higher values make the cursor glide longer.'
    },
    {
      name: 'grainIntensity',
      type: 'number',
      default: '0.05',
      description: 'Strength of the film grain post-processing pass.'
    },
    { name: 'bloomStrength', type: 'number', default: '0.1', description: 'UnrealBloom effect strength.' },
    {
      name: 'bloomRadius',
      type: 'number',
      default: '1.0',
      description: 'UnrealBloom radius controlling spread of glow.'
    },
    {
      name: 'bloomThreshold',
      type: 'number',
      default: '0.025',
      description: 'UnrealBloom threshold; lower includes more pixels in bloom.'
    },
    {
      name: 'brightness',
      type: 'number',
      default: '1',
      description: 'Final brightness multiplier applied to the effect color.'
    },
    { name: 'color', type: 'string', default: "'#B19EEF'", description: 'Base color of the ghost cursor effect.' },
    {
      name: 'mixBlendMode',
      type: 'CSS mix-blend-mode',
      default: "'screen'",
      description: 'Blend mode used when compositing with page content.'
    },
    {
      name: 'edgeIntensity',
      type: 'number',
      default: '0',
      description: 'Darkening near edges of the canvas. 0 = none, 1 = strongest.'
    },
    {
      name: 'maxDevicePixelRatio',
      type: 'number',
      default: '0.5',
      description: 'Upper cap for devicePixelRatio to control render cost on high-DPR displays.'
    },
    {
      name: 'targetPixels',
      type: 'number',
      default: 'auto (~1.3e6 desktop, ~0.9e6 touch)',
      description: 'Pixel budget. Resolution is dynamically scaled to keep total pixel count under this budget.'
    },
    {
      name: 'fadeDelayMs',
      type: 'number',
      default: 'auto (1000 desktop, 500 touch)',
      description: 'Idle delay before the trail starts to fade after pointer leaves/stops.'
    },
    {
      name: 'fadeDurationMs',
      type: 'number',
      default: 'auto (1500 desktop, 1000 touch)',
      description: 'Duration of the trail fade-out once the delay has elapsed.'
    },
    {
      name: 'zIndex',
      type: 'number',
      default: '10',
      description: 'z-index applied to the canvas for layering above/below content.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden">
          <GhostCursor
            trailLength={trailLength}
            inertia={inertia}
            grainIntensity={grainIntensity}
            bloomStrength={bloomStrength}
            bloomRadius={bloomRadius}
            bloomThreshold={bloomThreshold}
            brightness={brightness}
            color={color}
            fadeDelayMs={fadeDelayMs}
            fadeDurationMs={fadeDurationMs}
          />

          <Text
            position="absolute"
            userSelect="none"
            fontSize="clamp(3rem, 8vw, 8rem)"
            zIndex={11}
            fontWeight={900}
            color="#060010"
          >
            Boo!
          </Text>
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Color
            </Text>
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} width="50px" />
          </Flex>

          <PreviewSlider
            title="Trail Length"
            min={10}
            max={50}
            step={5}
            value={trailLength}
            onChange={setTrailLength}
          />
          <PreviewSlider title="Inertia" min={0} max={0.99} step={0.01} value={inertia} onChange={setInertia} />
          <PreviewSlider
            title="Grain Intensity"
            min={0}
            max={0.5}
            step={0.01}
            value={grainIntensity}
            onChange={setGrainIntensity}
          />
          <PreviewSlider
            title="Bloom Strength"
            min={0}
            max={10}
            step={0.05}
            value={bloomStrength}
            onChange={setBloomStrength}
          />
          <PreviewSlider
            title="Bloom Radius"
            min={0}
            max={10}
            step={0.05}
            value={bloomRadius}
            onChange={setBloomRadius}
          />
          <PreviewSlider
            title="Bloom Threshold"
            min={0}
            max={1}
            step={0.01}
            value={bloomThreshold}
            onChange={setBloomThreshold}
          />
          <PreviewSlider title="Brightness" min={0} max={10} step={0.1} value={brightness} onChange={setBrightness} />
          <PreviewSlider
            title="Fade Delay (ms)"
            min={0}
            max={3000}
            step={100}
            value={fadeDelayMs}
            onChange={setFadeDelayMs}
          />
          <PreviewSlider
            title="Fade Duration (ms)"
            min={100}
            max={5000}
            step={100}
            value={fadeDurationMs}
            onChange={setFadeDurationMs}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={ghostCursor} />
      </CodeTab>
    </TabsLayout>
  );
};

export default GhostCursorDemo;
