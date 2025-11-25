import { Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';

import MagnetLines from '../../content/Animations/MagnetLines/MagnetLines';
import { magnetLines } from '../../constants/code/Animations/magnetLinesCode';

const MagnetLinesDemo = () => {
  const propData = [
    {
      name: 'rows',
      type: 'number',
      default: '9',
      description: 'Number of grid rows.'
    },
    {
      name: 'columns',
      type: 'number',
      default: '9',
      description: 'Number of grid columns.'
    },
    {
      name: 'containerSize',
      type: 'string',
      default: '80vmin',
      description: 'Specifies the width and height of the entire grid container.'
    },
    {
      name: 'lineColor',
      type: 'string',
      default: '#efefef',
      description: 'Color for each line (the <span> elements).'
    },
    {
      name: 'lineWidth',
      type: 'string',
      default: '1vmin',
      description: 'Specifies each line’s thickness.'
    },
    {
      name: 'lineHeight',
      type: 'string',
      default: '6vmin',
      description: 'Specifies each line’s length.'
    },
    {
      name: 'baseAngle',
      type: 'number',
      default: '-10',
      description: 'Initial rotation angle (in degrees) before pointer movement.'
    },
    {
      name: 'className',
      type: 'string',
      default: '',
      description: 'Additional class name(s) applied to the container.'
    },
    {
      name: 'style',
      type: 'object',
      default: '{}',
      description: 'Inline styles for the container.'
    }
  ];

  return (
    <TabsLayout>
      <PreviewTab>
        <Flex overflow="hidden" justifyContent="center" pb={'1em'} alignItems="center" className="demo-container">
          <MagnetLines rows={10} columns={12} containerSize="40vmin" lineWidth="2px" lineHeight="30px" />
        </Flex>

        <PropTable data={propData} />
      </PreviewTab>

      <CodeTab>
        <CodeExample codeObject={magnetLines} />
      </CodeTab>
    </TabsLayout>
  );
};

export default MagnetLinesDemo;
