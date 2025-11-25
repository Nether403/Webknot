import { useState } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import Dependencies from '../../components/code/Dependencies';
import logo from '../../assets/logos/reactbits-gh-black.svg';

import BubbleMenu from '../../content/Components/BubbleMenu/BubbleMenu';
import { bubbleMenu } from '../../constants/code/Components/bubbleMenuCode';

const BubbleMenuDemo = () => {
  const [animationEase, setAnimationEase] = useState('back.out(1.5)');
  const [menuBg, setMenuBg] = useState('#ffffff');
  const [menuContentColor, setMenuContentColor] = useState('#111111');
  const [animationDuration, setAnimationDuration] = useState(0.5);
  const [staggerDelay, setStaggerDelay] = useState(0.12);

  const easeOptions = [
    { value: 'back.out(1.5)', label: 'back.out(1.5)' },
    { value: 'power3.out', label: 'power3.out' },
    { value: 'power2.out', label: 'power2.out' },
    { value: 'elastic.out(1,0.5)', label: 'elastic.out(1,0.5)' },
    { value: 'bounce.out', label: 'bounce.out' }
  ];
  const propData = [
    {
      name: 'logo',
      type: 'ReactNode | string',
      default: '—',
      description: 'Logo content shown in the central bubble (string src or JSX).'
    },
    {
      name: 'onMenuClick',
      type: '(open: boolean) => void',
      default: '—',
      description: 'Callback fired whenever the menu toggle changes; receives open state.'
    },
    {
      name: 'className',
      type: 'string',
      default: '—',
      description: 'Additional class names for the root nav wrapper.'
    },
    {
      name: 'style',
      type: 'CSSProperties',
      default: '—',
      description: 'Inline styles applied to the root nav wrapper.'
    },
    {
      name: 'menuAriaLabel',
      type: 'string',
      default: '"Toggle menu"',
      description: 'Accessible aria-label for the toggle button.'
    },
    {
      name: 'menuBg',
      type: 'string',
      default: '"#fff"',
      description: 'Background color for the logo & toggle bubbles and base pill background.'
    },
    {
      name: 'menuContentColor',
      type: 'string',
      default: '"#111"',
      description: 'Color for the menu icon lines and default pill text.'
    },
    {
      name: 'useFixedPosition',
      type: 'boolean',
      default: 'false',
      description: 'If true positions the menu with fixed instead of absolute (follows viewport).'
    },
    {
      name: 'items',
      type: 'MenuItem[]',
      default: 'DEFAULT_ITEMS',
      description:
        'Custom menu items; each = { label, href, ariaLabel?, rotation?, hoverStyles?: { bgColor?, textColor? } }.'
    },
    {
      name: 'animationEase',
      type: 'string',
      default: '"back.out(1.5)"',
      description: 'GSAP ease string used for bubble scale-in animation.'
    },
    {
      name: 'animationDuration',
      type: 'number',
      default: '0.5',
      description: 'Duration (s) for each bubble & label animation.'
    },
    {
      name: 'staggerDelay',
      type: 'number',
      default: '0.12',
      description: 'Base stagger (s) between bubble animations (with slight random variance).'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container demo-container-dots" h={800} overflow="hidden">
          <BubbleMenu
            logo={logo}
            menuBg={menuBg}
            menuContentColor={menuContentColor}
            animationEase={animationEase}
            animationDuration={animationDuration}
            staggerDelay={staggerDelay}
          />
        </Box>

        <Customize>
          <PreviewSelect
            title="Ease"
            options={easeOptions}
            value={animationEase}
            width={190}
            onChange={setAnimationEase}
          />

          <Flex alignItems="center" mb={4} mt={4} gap={2}>
            <Text fontSize="sm">Menu BG</Text>
            <Input type="color" value={menuBg} onChange={e => setMenuBg(e.target.value)} width="50px" p={0} h="32px" />
          </Flex>

          <Flex alignItems="center" mb={4} gap={2}>
            <Text fontSize="sm">Content Color</Text>
            <Input
              type="color"
              value={menuContentColor}
              onChange={e => setMenuContentColor(e.target.value)}
              width="50px"
              p={0}
              h="32px"
            />
          </Flex>

          <PreviewSlider
            title="Anim Duration"
            min={0.1}
            max={2}
            step={0.05}
            value={animationDuration}
            width={220}
            onChange={setAnimationDuration}
          />

          <PreviewSlider
            title="Stagger"
            min={0}
            max={0.5}
            step={0.01}
            value={staggerDelay}
            width={220}
            onChange={setStaggerDelay}
          />
        </Customize>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={bubbleMenu} />
      </CodeTab>
    </TabsLayout>
  );
};

export default BubbleMenuDemo;
