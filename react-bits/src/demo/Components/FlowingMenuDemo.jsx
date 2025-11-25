import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';

import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import FlowingMenu from '../../content/Components/FlowingMenu/FlowingMenu';
import { flowingMenu } from '../../constants/code/Components/flowingMenuCode';

const FlowingMenuDemo = () => {
  const propData = [
    {
      name: 'items',
      type: 'object[]',
      default: '[]',
      description: 'An array of object scontaining: link, text, image.'
    }
  ];

  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Box position="relative" className="demo-container" h={600} overflow="hidden" px={0} pt="100px" pb="100px">
          <FlowingMenu items={demoItems} />
        </Box>

        <PropTable data={propData} />
        <Dependencies dependencyList={['gsap']} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={flowingMenu} />
      </CodeTab>
    </TabsLayout>
  );
};

export default FlowingMenuDemo;
