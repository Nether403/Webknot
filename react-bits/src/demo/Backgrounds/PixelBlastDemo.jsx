import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';

import PixelBlast from '../../content/Backgrounds/PixelBlast/PixelBlast';
import { pixelBlast } from '../../constants/code/Backgrounds/pixelBlastCode';

const PixelBlastDemo = () => {
  const [variant, setVariant] = useState('square');
  const [pixelSize, setPixelSize] = useState(4);
  const [patternScale, setPatternScale] = useState(2);
  const [patternDensity, setPatternDensity] = useState(1);
  const [pixelSizeJitter, setPixelSizeJitter] = useState(0);
  const [enableRipples, setEnableRipples] = useState(true);
  const [liquid, setLiquid] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [edgeFade, setEdgeFade] = useState(0.25);
  const [color, setColor] = useState('#B19EEF');

  const propData = [
    {
      name: 'variant',
      type: "'square'|'circle'|'triangle'|'diamond'",
      default: "'square'",
      description: 'Pixel shape variant.'
    },
    {
      name: 'pixelSize',
      type: 'number',
      default: '4',
      description: 'Base pixel size (auto scaled for DPI).'
    },
    {
      name: 'color',
      type: 'string',
      default: "'#B19EEF'",
      description: 'Pixel color.'
    },
    {
      name: 'patternScale',
      type: 'number',
      default: '2',
      description: 'Noise/pattern scale.'
    },
    {
      name: 'patternDensity',
      type: 'number',
      default: '1',
      description: 'Pattern density adjustment.'
    },
    {
      name: 'pixelSizeJitter',
      type: 'number',
      default: '0',
      description: 'Random jitter applied to coverage.'
    },
    {
      name: 'enableRipples',
      type: 'boolean',
      default: 'true',
      description: 'Enable click ripple waves.'
    },
    {
      name: 'rippleSpeed',
      type: 'number',
      default: '0.3',
      description: 'Ripple propagation speed.'
    },
    {
      name: 'rippleThickness',
      type: 'number',
      default: '0.1',
      description: 'Ripple ring thickness.'
    },
    {
      name: 'rippleIntensityScale',
      type: 'number',
      default: '1',
      description: 'Ripple intensity multiplier.'
    },
    {
      name: 'liquid',
      type: 'boolean',
      default: 'false',
      description: 'Enable liquid distortion effect.'
    },
    {
      name: 'liquidStrength',
      type: 'number',
      default: '0.1',
      description: 'Liquid distortion strength.'
    },
    {
      name: 'liquidRadius',
      type: 'number',
      default: '1',
      description: 'Liquid touch brush radius scale.'
    },
    {
      name: 'liquidWobbleSpeed',
      type: 'number',
      default: '4.5',
      description: 'Liquid wobble frequency.'
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.5',
      description: 'Animation time scale.'
    },
    {
      name: 'edgeFade',
      type: 'number',
      default: '0.25',
      description: 'Edge fade distance (0-1).'
    },
    {
      name: 'noiseAmount',
      type: 'number',
      default: '0',
      description: 'Post noise amount.'
    },
    {
      name: 'transparent',
      type: 'boolean',
      default: 'true',
      description: 'Transparent background.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <PixelBlast
            variant={variant}
            pixelSize={pixelSize}
            color={color}
            patternScale={patternScale}
            patternDensity={patternDensity}
            pixelSizeJitter={pixelSizeJitter}
            enableRipples={enableRipples}
            liquid={liquid}
            speed={speed}
            edgeFade={edgeFade}
          />

          <BackgroundContent pillText="New Background" headline="It's dangerous to go alone! Take this." />
        </Box>

        <Customize>
          <Flex alignItems="center" mb={4}>
            <Text fontSize="sm" mr={2}>
              Color
            </Text>
            <Input type="color" value={color} onChange={e => setColor(e.target.value)} w="50px" p={0} />
          </Flex>

          <PreviewSelect
            title="Variant"
            value={variant}
            onChange={setVariant}
            options={[
              { label: 'Square', value: 'square' },
              { label: 'Circle', value: 'circle' },
              { label: 'Triangle', value: 'triangle' },
              { label: 'Diamond', value: 'diamond' }
            ]}
          />

          <PreviewSlider title="Pixel Size" min={1} max={5} step={1} value={pixelSize} onChange={setPixelSize} />

          <PreviewSlider
            title="Pattern Scale"
            min={0.25}
            max={8}
            step={0.25}
            value={patternScale}
            onChange={setPatternScale}
          />

          <PreviewSlider
            title="Pattern Density"
            min={0}
            max={2}
            step={0.05}
            value={patternDensity}
            onChange={setPatternDensity}
          />

          <PreviewSlider
            title="Pixel Jitter"
            min={0}
            max={2}
            step={0.05}
            value={pixelSizeJitter}
            onChange={setPixelSizeJitter}
          />

          <PreviewSlider title="Speed" min={0} max={3} step={0.05} value={speed} onChange={setSpeed} />

          <PreviewSlider title="Edge Fade" min={0} max={0.5} step={0.01} value={edgeFade} onChange={setEdgeFade} />

          <PreviewSwitch title="Ripples" isChecked={enableRipples} onChange={() => setEnableRipples(v => !v)} />

          <PreviewSwitch title="Liquid" isChecked={liquid} onChange={() => setLiquid(v => !v)} />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three', 'postprocessing']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={pixelBlast} />
      </CodeTab>
    </TabsLayout>
  );
};

export default PixelBlastDemo;
