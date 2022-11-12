import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import ContentVisualization, {
  ILegend,
} from '../../components/Layout/ContentVisualization';
import { Box } from '@mui/material';
import {
  contentPadding,
  tabsHeight,
  toolbarHeight,
} from '../../constants/sizes';

interface IVisualizationGraphProperties {
  legend: ILegend[];
  links: LinkObject[];
  linkColorCallback: (link: LinkObject) => string;
  linkWidthCallback: (link: LinkObject) => number;
  nodeSize: number;
  nodes: NodeObject[];
  nodeCanvasObjectCallback: (
    node: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => void;
  nodeColorCallback: (node: NodeObject) => string;
  onNodeClickCallback: (node: NodeObject) => void;
}

const VisualizationGraph: React.FC<IVisualizationGraphProperties> = ({
  legend,
  links,
  linkColorCallback,
  linkWidthCallback,
  nodeSize,
  nodes,
  nodeCanvasObjectCallback,
  nodeColorCallback,
  onNodeClickCallback,
}: IVisualizationGraphProperties) => {
  const forceGraphRef = useRef<ForceGraphMethods>();
  const graphWrapper = useRef<HTMLElement>();
  const [graphWidth, setGraphWidth] = useState<number>(0);
  const [graphHeight, setGraphHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      if (graphWrapper.current?.offsetWidth) {
        setGraphWidth(graphWrapper.current?.offsetWidth);
        setGraphHeight(
          window.innerHeight - toolbarHeight - tabsHeight - 3 * contentPadding,
        );
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [graphWrapper]);

  return (
    <ContentVisualization legend={legend}>
      <Box ref={graphWrapper}>
        <ForceGraph2D
          ref={forceGraphRef}
          graphData={{ nodes, links }}
          nodeRelSize={nodeSize}
          enableNodeDrag={false}
          enablePanInteraction={false}
          enableZoomInteraction={false}
          width={graphWidth}
          height={graphHeight}
          linkDirectionalArrowLength={1}
          linkDirectionalArrowRelPos={1}
          nodeColor={nodeColorCallback}
          nodeLabel={''}
          nodeCanvasObjectMode={() => 'before'}
          nodeCanvasObject={nodeCanvasObjectCallback}
          linkColor={linkColorCallback}
          linkWidth={linkWidthCallback}
          linkHoverPrecision={1}
          onNodeClick={onNodeClickCallback}
          onRenderFramePost={() => {
            forceGraphRef.current?.zoomToFit(0, 100);
          }}
        />
      </Box>
    </ContentVisualization>
  );
};

export default VisualizationGraph;
