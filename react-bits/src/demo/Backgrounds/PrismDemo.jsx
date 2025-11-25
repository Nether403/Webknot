import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import { prism } from '../../constants/code/Backgrounds/prismCode';
import Prism from '../../content/Backgrounds/Prism/Prism';

const PrismDemo = () => {
  const [animationType, setAnimationType] = useState('rotate');
  const [timeScale, setTimeScale] = useState(0.5);
  const [scale, setScale] = useState(3.6);
  const [noise, setNoise] = useState(0);
  const [glow, setGlow] = useState(1);
  const [height, setHeight] = useState(3.5);
  const [baseWidth, setBaseWidth] = useState(5.5);
  const [hueShift, setHueShift] = useState(0);
  const [colorFrequency, setColorFrequency] = useState(1);

  const propData = [
    {
      name: 'height',
      type: 'number',
      default: '3.5',
      description: 'Apex height of the prism (world units).'
    },
    {
      name: 'baseWidth',
      type: 'number',
      default: '5.5',
      description: 'Total base width across X/Z (world units).'
    },
    {
      name: 'animationType',
      type: '"rotate" | "hover" | "3drotate"',
      default: '"rotate"',
      description: 'Animation mode: shader wobble, pointer hover tilt, or full 3D rotation.'
    },
    {
      name: 'glow',
      type: 'number',
      default: '1',
      description: 'Glow/bleed intensity multiplier.'
    },
    {
      name: 'offset',
      type: '{ x?: number; y?: number }',
      default: '{ x: 0, y: 0 }',
      description: 'Pixel offset within the canvas (x→right, y→down).'
    },
    {
      name: 'noise',
      type: 'number',
      default: '0.5',
      description: 'Film-grain noise amount added to final color (0 disables).'
    },
    {
      name: 'transparent',
      type: 'boolean',
      default: 'true',
      description: 'Whether the canvas has an alpha channel (transparent background).'
    },
    {
      name: 'scale',
      type: 'number',
      default: '3.6',
      description: 'Overall screen-space scale of the prism (bigger = larger).'
    },
    {
      name: 'hueShift',
      type: 'number',
      default: '0',
      description: 'Hue rotation (radians) applied to final color.'
    },
    {
      name: 'colorFrequency',
      type: 'number',
      default: '1',
      description: 'Frequency of internal sine bands controlling color variation.'
    },
    {
      name: 'hoverStrength',
      type: 'number',
      default: '2',
      description: 'Sensitivity of hover tilt (pitch/yaw amplitude).'
    },
    {
      name: 'inertia',
      type: 'number',
      default: '0.05',
      description: 'Easing factor for hover (0..1, higher = snappier).'
    },
    {
      name: 'bloom',
      type: 'number',
      default: '1',
      description: 'Extra bloom factor layered on top of glow.'
    },
    {
      name: 'suspendWhenOffscreen',
      type: 'boolean',
      default: 'false',
      description: 'Pause rendering when the element is not in the viewport.'
    },
    {
      name: 'timeScale',
      type: 'number',
      default: '0.5',
      description: 'Global time multiplier for animations (0=frozen, 1=normal).'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <Prism
            animationType={animationType}
            timeScale={timeScale}
            scale={scale}
            noise={noise}
            glow={glow}
            height={height}
            baseWidth={baseWidth}
            hueShift={hueShift}
            colorFrequency={colorFrequency}
          />

          <BackgroundContent pillText="New Background" headline="A spectrum of colors that spark creativity" />
        </Box>

        <Customize>
          <PreviewSelect
            title="Animation Type"
            options={[
              { value: 'rotate', label: 'Rotate' },
              { value: 'hover', label: 'Hover' },
              { value: '3drotate', label: '3D Rotate' }
            ]}
            value={animationType}
            onChange={setAnimationType}
            width={160}
          />

          <PreviewSlider title="Time Scale" min={0.1} max={2} step={0.1} value={timeScale} onChange={setTimeScale} />

          <PreviewSlider title="Scale" min={1} max={5} step={0.1} value={scale} onChange={setScale} />

          <PreviewSlider title="Height" min={1} max={8} step={0.1} value={height} onChange={setHeight} />

          <PreviewSlider title="Base Width" min={1} max={10} step={0.1} value={baseWidth} onChange={setBaseWidth} />

          <PreviewSlider title="Noise" min={0} max={1} step={0.05} value={noise} onChange={setNoise} />

          <PreviewSlider title="Glow" min={0} max={3} step={0.1} value={glow} onChange={setGlow} />

          <PreviewSlider
            title="Hue Shift"
            min={-3.1416}
            max={3.1416}
            step={0.1}
            value={hueShift}
            onChange={setHueShift}
          />

          <PreviewSlider
            title="Color Frequency"
            min={0.25}
            max={4}
            step={0.05}
            value={colorFrequency}
            onChange={setColorFrequency}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['ogl']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={prism} />
      </CodeTab>
    </TabsLayout>
  );
};

export default PrismDemo;
