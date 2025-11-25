import { useRef, useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Image, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from '@/components/common/Preview/RefreshButton';
import useForceRerender from '@/hooks/useForceRerender';

import LaserFlow from '@/content/Animations/LaserFlow/LaserFlow';
import { laserFlow } from '@/constants/code/Animations/laserFlowCode';

const LaserFlowDemo = () => {
  const containerRef = useRef(null);
  const revealImgRef = useRef(null);
  const [key, forceRerender] = useForceRerender();
  const [selectedExample, setSelectedExample] = useState('box');
  const [laserColor, setLaserColor] = useState('#CF9EFF');
  const [horizontalSizing, setHorizontalSizing] = useState(0.5);
  const [verticalSizing, setVerticalSizing] = useState(2.0);
  const [wispDensity, setWispDensity] = useState(1);
  const [wispSpeed, setWispSpeed] = useState(15.0);
  const [wispIntensity, setWispIntensity] = useState(5.0);
  const [flowSpeed, setFlowSpeed] = useState(0.35);
  const [flowStrength, setFlowStrength] = useState(0.25);
  const [fogIntensity, setFogIntensity] = useState(0.45);
  const [fogScale, setFogScale] = useState(0.3);
  const [fogFallSpeed, setFogFallSpeed] = useState(0.6);
  const [decay, setDecay] = useState(1.1);
  const [falloffStart, setFalloffStart] = useState(1.2);

  const exampleOptions = [
    { label: 'Box', value: 'box' },
    { label: 'Basic', value: 'basic' }
  ];

  const propData = [
    {
      name: 'horizontalBeamOffset',
      type: 'number',
      default: '0.1',
      description: 'Horizontal offset of the beam (0–1 of canvas width).'
    },
    {
      name: 'verticalBeamOffset',
      type: 'number',
      default: '0.0',
      description: 'Vertical offset of the beam (0–1 of canvas height).'
    },
    {
      name: 'horizontalSizing',
      type: 'number',
      default: '0.5',
      description: 'Horizontal sizing factor of the beam footprint.'
    },
    {
      name: 'verticalSizing',
      type: 'number',
      default: '2.0',
      description: 'Vertical sizing factor of the beam footprint.'
    },
    { name: 'wispDensity', type: 'number', default: '1', description: 'Density of micro-streak wisps.' },
    { name: 'wispSpeed', type: 'number', default: '15.0', description: 'Speed of wisp motion.' },
    { name: 'wispIntensity', type: 'number', default: '5.0', description: 'Brightness of wisps.' },
    { name: 'flowSpeed', type: 'number', default: '0.35', description: 'Speed of the beam’s flow modulation.' },
    { name: 'flowStrength', type: 'number', default: '0.25', description: 'Strength of the beam’s flow modulation.' },
    { name: 'fogIntensity', type: 'number', default: '0.45', description: 'Overall volumetric fog intensity.' },
    { name: 'fogScale', type: 'number', default: '0.3', description: 'Spatial scale for the fog noise.' },
    { name: 'fogFallSpeed', type: 'number', default: '0.6', description: 'Drift speed for the fog field.' },
    {
      name: 'mouseTiltStrength',
      type: 'number',
      default: '0.01',
      description: 'How much mouse x tilts the fog volume.'
    },
    { name: 'mouseSmoothTime', type: 'number', default: '0.0', description: 'Pointer smoothing time (seconds).' },
    { name: 'decay', type: 'number', default: '1.1', description: 'Beam decay shaping for sampling envelope.' },
    {
      name: 'falloffStart',
      type: 'number',
      default: '1.2',
      description: 'Falloff start radius used in inverse-square blending.'
    },
    {
      name: 'dpr',
      type: 'number',
      default: 'auto',
      description: 'Device pixel ratio override (defaults to window.devicePixelRatio).'
    },
    { name: 'color', type: 'string', default: '#FF79C6', description: 'Beam color (hex).' }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box
          ref={containerRef}
          position="relative"
          className="demo-container"
          h={600}
          p={0}
          overflow="hidden"
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const el = revealImgRef.current;
            if (el) {
              el.style.setProperty('--mx', `${x}px`);
              el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
            }
          }}
          onMouseLeave={() => {
            const el = revealImgRef.current;
            if (el) {
              el.style.setProperty('--mx', `-9999px`);
              el.style.setProperty('--my', `-9999px`);
            }
          }}
        >
          <LaserFlow
            horizontalBeamOffset={selectedExample === 'box' ? 0.1 : 0.0}
            verticalBeamOffset={selectedExample === 'box' ? -0.2 : -0.5}
            horizontalSizing={horizontalSizing}
            verticalSizing={verticalSizing}
            wispDensity={wispDensity}
            wispSpeed={wispSpeed}
            wispIntensity={wispIntensity}
            flowSpeed={flowSpeed}
            flowStrength={flowStrength}
            fogIntensity={fogIntensity}
            fogScale={fogScale}
            fogFallSpeed={fogFallSpeed}
            decay={decay}
            falloffStart={falloffStart}
            color={laserColor}
            key={key}
            className={`laser-flow-demo-${selectedExample}`}
          />

          {selectedExample === 'box' && (
            <>
              <Box
                className="demo-container-dots"
                zIndex={6}
                position="absolute"
                top="70%"
                left="50%"
                transform="translateX(-50%)"
                width="86%"
                height="60%"
                backgroundColor="#060010"
                borderRadius="20px"
                border={`2px solid ${laserColor}`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontSize="2xl"
              ></Box>
              <Image
                ref={revealImgRef}
                src="https://cdn.dribbble.com/userupload/15325964/file/original-25ae735b5d9255a4a31d3471fd1c346a.png?resize=1024x768&vertical=center"
                position="absolute"
                width="100%"
                top="-50%"
                zIndex={2}
                mixBlendMode="lighten"
                opacity={0.3}
                pointerEvents="none"
                style={{
                  ['--mx']: '-9999px',
                  ['--my']: '-9999px',
                  WebkitMaskImage:
                    'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                  maskImage:
                    'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat'
                }}
              />
            </>
          )}

          <RefreshButton onClick={forceRerender} />
        </Box>

        <Customize>
          <PreviewSelect
            title="Example:"
            options={exampleOptions}
            value={selectedExample}
            onChange={setSelectedExample}
            width={120}
          />
          <Flex alignItems="center" mt={4}>
            <Text fontSize="sm" mr={2}>
              Color
            </Text>
            <Input
              type="color"
              value={laserColor}
              onChange={e => {
                setLaserColor(e.target.value);
              }}
              width="50px"
            />
          </Flex>

          <PreviewSlider
            title="Horizontal Sizing"
            min={0.1}
            max={2}
            step={0.01}
            value={horizontalSizing}
            onChange={setHorizontalSizing}
          />
          <PreviewSlider
            title="Vertical Sizing"
            min={0.1}
            max={5}
            step={0.1}
            value={verticalSizing}
            onChange={setVerticalSizing}
          />
          <PreviewSlider
            title="Wisp Density"
            min={0}
            max={5}
            step={0.1}
            value={wispDensity}
            onChange={setWispDensity}
          />
          <PreviewSlider title="Wisp Speed" min={1} max={50} step={0.5} value={wispSpeed} onChange={setWispSpeed} />
          <PreviewSlider
            title="Wisp Intensity"
            min={0}
            max={20}
            step={0.1}
            value={wispIntensity}
            onChange={setWispIntensity}
          />
          <PreviewSlider title="Flow Speed" min={0} max={2} step={0.01} value={flowSpeed} onChange={setFlowSpeed} />
          <PreviewSlider
            title="Flow Strength"
            min={0}
            max={1}
            step={0.01}
            value={flowStrength}
            onChange={setFlowStrength}
          />
          <PreviewSlider
            title="Fog Intensity"
            min={0}
            max={1}
            step={0.01}
            value={fogIntensity}
            onChange={setFogIntensity}
          />
          <PreviewSlider title="Fog Scale" min={0.1} max={1} step={0.01} value={fogScale} onChange={setFogScale} />
          <PreviewSlider
            title="Fog Fall Speed"
            min={0}
            max={2}
            step={0.01}
            value={fogFallSpeed}
            onChange={setFogFallSpeed}
          />
          <PreviewSlider title="Decay" min={0.5} max={3} step={0.01} value={decay} onChange={setDecay} />
          <PreviewSlider
            title="Falloff Start"
            min={0.5}
            max={3}
            step={0.01}
            value={falloffStart}
            onChange={setFalloffStart}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={laserFlow} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LaserFlowDemo;
