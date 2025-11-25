import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';

import { electricBorder } from '../../constants/code/Animations/electricBorderCode';
import ElectricBorder from '../../content/Animations/ElectricBorder/ElectricBorder';

const ElectricBorderDemo = () => {
  const propData = [
    {
      name: 'color',
      type: 'string',
      default: '"#5227FF"',
      description: 'Stroke/glow color. Any CSS color (hex, rgb, hsl).'
    },
    {
      name: 'speed',
      type: 'number',
      default: '1',
      description: 'Animation speed multiplier (higher = faster).'
    },
    {
      name: 'chaos',
      type: 'number',
      default: '1',
      description: 'Distortion intensity from the SVG displacement (0 disables warp).'
    },
    {
      name: 'thickness',
      type: 'number',
      default: '2',
      description: 'Border width in pixels.'
    },
    {
      name: 'className',
      type: 'string',
      default: '—',
      description: 'Optional className applied to the root wrapper.'
    },
    {
      name: 'style',
      type: 'React.CSSProperties',
      default: '—',
      description: 'Inline styles for the wrapper. Set borderRadius here to round corners.'
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: '—',
      description: 'Content rendered inside the bordered container.'
    }
  ];

  const [example, setExample] = useState('card');

  const [cardProps, setCardProps] = useState({
    color: '#7df9ff',
    speed: 1,
    chaos: 0.5,
    thickness: 2,
    radius: 16
  });

  const [buttonProps, setButtonProps] = useState({
    color: '#B19EEF',
    speed: 1,
    chaos: 0.5,
    thickness: 2,
    radius: 999
  });

  const [circleProps, setCircleProps] = useState({
    color: '#7df9ff',
    speed: 1,
    chaos: 0.5,
    thickness: 2,
    radius: '50%'
  });

  const activeProps = example === 'card' ? cardProps : example === 'button' ? buttonProps : circleProps;
  const setActiveProps = example === 'card' ? setCardProps : example === 'button' ? setButtonProps : setCircleProps;

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={500} overflow="hidden">
          {example === 'card' ? (
            <ElectricBorder
              color={cardProps.color}
              speed={cardProps.speed}
              chaos={cardProps.chaos}
              thickness={cardProps.thickness}
              style={{ borderRadius: cardProps.radius }}
            >
              <div style={{ width: '300px', height: '360px' }} className="eb-demo-card">
                <div className="eb-demo-badge">Featured</div>
                <h3 className="eb-demo-title">Electric Card</h3>
                <p className="eb-demo-desc">An electric border for shocking your users, the right way.</p>
                <div className="eb-demo-row">
                  <span className="eb-demo-chip">Live</span>
                  <span className="eb-demo-chip">v1.0</span>
                </div>
                <button className="eb-demo-cta">Get Started</button>
              </div>
            </ElectricBorder>
          ) : example === 'button' ? (
            <ElectricBorder
              color={buttonProps.color}
              speed={buttonProps.speed}
              chaos={buttonProps.chaos}
              thickness={buttonProps.thickness}
              style={{ borderRadius: buttonProps.radius }}
              className="eb-button-container"
            >
              <div className="eb-demo-button-wrap">
                <button className="eb-demo-button">Learn More</button>
              </div>
            </ElectricBorder>
          ) : (
            <ElectricBorder
              color={circleProps.color}
              speed={circleProps.speed}
              chaos={circleProps.chaos}
              thickness={circleProps.thickness}
              style={{ borderRadius: circleProps.radius }}
            >
              <div style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
            </ElectricBorder>
          )}
        </Box>

        <Customize>
          <PreviewSelect
            title="Example"
            name="electric-border-example"
            width={140}
            value={example}
            options={[
              { label: 'Card', value: 'card' },
              { label: 'Button', value: 'button' },
              { label: 'Circle', value: 'circle' }
            ]}
            onChange={setExample}
          />

          <Flex alignItems="center" mb={4} mt={4}>
            <Text fontSize="sm" mr={2}>
              Color
            </Text>
            <Input
              type="color"
              value={activeProps.color}
              onChange={e => setActiveProps(p => ({ ...p, color: e.target.value }))}
              width="50px"
              padding="0"
              height="28px"
            />
          </Flex>

          <PreviewSlider
            title="Speed"
            min={0.1}
            max={3}
            step={0.1}
            value={activeProps.speed}
            onChange={v => setActiveProps(p => ({ ...p, speed: v }))}
          />
          <PreviewSlider
            title="Chaos"
            min={0.1}
            max={1}
            step={0.1}
            value={activeProps.chaos}
            onChange={v => setActiveProps(p => ({ ...p, chaos: v }))}
          />
          <PreviewSlider
            title="Thickness"
            min={1}
            max={5}
            step={1}
            value={activeProps.thickness}
            valueUnit="px"
            onChange={v => setActiveProps(p => ({ ...p, thickness: v }))}
          />
        </Customize>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={electricBorder} />
      </CodeTab>
    </TabsLayout>
  );
};

export default ElectricBorderDemo;
