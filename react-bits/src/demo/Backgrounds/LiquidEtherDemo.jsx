import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import LiquidEther from '@/content/Backgrounds/LiquidEther/LiquidEther';
import { liquidEther } from '@/constants/code/Backgrounds/liquidEtherCode';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';

const LiquidEtherDemo = () => {
  const [color0, setColor0] = useState('#5227FF');
  const [color1, setColor1] = useState('#FF9FFC');
  const [color2, setColor2] = useState('#B19EEF');
  const userColors = [color0, color1, color2].filter(Boolean);

  const [mouseForce, setMouseForce] = useState(20);
  const [cursorSize, setCursorSize] = useState(100);
  const [resolution, setResolution] = useState(0.5);
  const [isViscous, setIsViscous] = useState(true);
  const [viscous, setViscous] = useState(30);
  const [iterationsViscous, setIterationsViscous] = useState(32);
  const [iterationsPoisson, setIterationsPoisson] = useState(32);
  const [isBounce, setIsBounce] = useState(false);
  const [autoDemo, setAutoDemo] = useState(true);
  const [autoSpeed, setAutoSpeed] = useState(0.5);
  const [autoIntensity, setAutoIntensity] = useState(2.2);

  const propData = [
    {
      name: 'colors',
      type: 'string[]',
      default: `["#5227FF", "#FF9FFC", "#B19EEF"]`,
      description: 'Array of hex color stops used to build the velocity-to-color palette.'
    },
    {
      name: 'mouseForce',
      type: 'number',
      default: '20',
      description: 'Strength multiplier applied to mouse / touch movement when injecting velocity.'
    },
    {
      name: 'cursorSize',
      type: 'number',
      default: '100',
      description: 'Radius (in pixels at base resolution) of the force brush.'
    },
    {
      name: 'resolution',
      type: 'number',
      default: '0.5',
      description: 'Simulation texture scale relative to canvas size (lower = better performance, more blur).'
    },
    {
      name: 'dt',
      type: 'number',
      default: '0.014',
      description: 'Fixed simulation timestep used inside the advection / diffusion passes.'
    },
    {
      name: 'BFECC',
      type: 'boolean',
      default: 'true',
      description: 'Enable BFECC advection (error-compensated) for crisper flow; disable for slight performance gain.'
    },
    {
      name: 'isViscous',
      type: 'boolean',
      default: 'false',
      description: 'Toggle iterative viscosity solve (smoother, thicker motion when enabled).'
    },
    {
      name: 'viscous',
      type: 'number',
      default: '30',
      description: 'Viscosity coefficient used when isViscous is true.'
    },
    {
      name: 'iterationsViscous',
      type: 'number',
      default: '32',
      description: 'Number of Gauss-Seidel iterations for viscosity (higher = smoother, slower).'
    },
    {
      name: 'iterationsPoisson',
      type: 'number',
      default: '32',
      description: 'Number of pressure Poisson iterations to enforce incompressibility.'
    },
    {
      name: 'isBounce',
      type: 'boolean',
      default: 'false',
      description: 'If true, shows bounce boundaries (velocity clamped at edges).'
    },
    {
      name: 'autoDemo',
      type: 'boolean',
      default: 'true',
      description: 'Enable idle auto-driving of the pointer when no user interaction.'
    },
    {
      name: 'autoSpeed',
      type: 'number',
      default: '0.5',
      description: 'Speed (normalized units/sec) for auto pointer motion.'
    },
    {
      name: 'autoIntensity',
      type: 'number',
      default: '2.2',
      description: 'Multiplier applied to velocity delta while in auto mode.'
    },
    {
      name: 'takeoverDuration',
      type: 'number',
      default: '0.25',
      description: 'Seconds to interpolate from auto pointer to real cursor when user moves mouse.'
    },
    {
      name: 'autoResumeDelay',
      type: 'number',
      default: '1000',
      description: 'Milliseconds of inactivity before auto mode resumes.'
    },
    {
      name: 'autoRampDuration',
      type: 'number',
      default: '0.6',
      description: 'Seconds to ramp auto movement speed from 0 to full after activation.'
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Optional class for the root container.'
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      default: '{}',
      description: 'Inline styles applied to the root container.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} p={0} overflow="hidden">
          <LiquidEther
            colors={userColors}
            mouseForce={mouseForce}
            cursorSize={cursorSize}
            resolution={resolution}
            isViscous={isViscous}
            viscous={viscous}
            iterationsViscous={iterationsViscous}
            iterationsPoisson={iterationsPoisson}
            isBounce={isBounce}
            autoDemo={autoDemo}
            autoSpeed={autoSpeed}
            autoIntensity={autoIntensity}
            autoResumeDelay={500}
          />

          <BackgroundContent pillText="New Background" headline="The web, made fluid at your fingertips." />
        </Box>
        <Customize className="preview-options">
          <Flex alignItems="center" gap={4} mb={2} wrap="wrap">
            <Text fontSize="sm" mt={2} mb={1}>
              Colors
            </Text>
            <Input type="color" value={color0} onChange={e => setColor0(e.target.value)} width="50px" p={0} />
            <Input type="color" value={color1} onChange={e => setColor1(e.target.value)} width="50px" p={0} />
            <Input type="color" value={color2} onChange={e => setColor2(e.target.value)} width="50px" p={0} />
          </Flex>

          <PreviewSlider title="Mouse Force" min={0} max={60} step={1} value={mouseForce} onChange={setMouseForce} />
          <PreviewSlider title="Cursor Size" min={10} max={300} step={5} value={cursorSize} onChange={setCursorSize} />
          <PreviewSlider
            title="Resolution"
            min={0.2}
            max={0.5}
            step={0.05}
            value={resolution}
            onChange={setResolution}
          />
          <PreviewSlider title="Auto Speed" min={0} max={1} step={0.05} value={autoSpeed} onChange={setAutoSpeed} />
          <PreviewSlider
            title="Auto Intensity"
            min={0}
            max={4}
            step={0.1}
            value={autoIntensity}
            onChange={setAutoIntensity}
          />
          <PreviewSlider
            title="Pressure"
            min={1}
            max={64}
            step={1}
            value={iterationsPoisson}
            onChange={setIterationsPoisson}
          />

          <PreviewSwitch title="Bounce Edges" isChecked={isBounce} onChange={setIsBounce} />
          <PreviewSwitch title="Auto Animate" isChecked={autoDemo} onChange={setAutoDemo} />
          <PreviewSwitch title="Viscous" isChecked={isViscous} onChange={setIsViscous} />
          {isViscous && (
            <>
              <PreviewSlider title="Viscous Coef" min={1} max={100} step={1} value={viscous} onChange={setViscous} />
              <PreviewSlider
                title="Viscous Iterations"
                min={1}
                max={64}
                step={1}
                value={iterationsViscous}
                onChange={setIterationsViscous}
              />
            </>
          )}
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['three']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={liquidEther} />
      </CodeTab>
    </TabsLayout>
  );
};

export default LiquidEtherDemo;
