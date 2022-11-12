import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from 'react-force-graph-2d';
import { Box } from '@mui/material';
import {
  contentPadding,
  tabsHeight,
  toolbarHeight,
} from '../../constants/sizes';

interface IVisualizationGraphProperties {
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
  showDirection?: boolean;
  showDashedLinks?: boolean;
}

const VisualizationGraph: React.FC<IVisualizationGraphProperties> = ({
  links,
  linkColorCallback,
  linkWidthCallback,
  nodeSize,
  nodes,
  nodeCanvasObjectCallback,
  nodeColorCallback,
  onNodeClickCallback,
  showDirection,
  showDashedLinks,
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
          window.innerHeight - toolbarHeight - tabsHeight - 5 * contentPadding,
        );
      }
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [graphWrapper]);

  return (
    <Box ref={graphWrapper}>
      <ForceGraph2D
        ref={forceGraphRef}
        graphData={{ nodes, links }}
        enableNodeDrag={false}
        enablePanInteraction={false}
        enableZoomInteraction={false}
        width={graphWidth}
        height={graphHeight}
        linkDirectionalArrowLength={showDirection ? 1 : undefined}
        linkDirectionalArrowRelPos={showDirection ? 1 : undefined}
        linkColor={linkColorCallback}
        linkWidth={linkWidthCallback}
        linkLineDash={showDashedLinks ? [1, 1] : null}
        linkHoverPrecision={1}
        nodeRelSize={nodeSize}
        nodeColor={nodeColorCallback}
        nodeLabel={''}
        nodeCanvasObjectMode={() => 'before'}
        nodeCanvasObject={nodeCanvasObjectCallback}
        onNodeClick={onNodeClickCallback}
        onRenderFramePost={() => {
          forceGraphRef.current?.zoomToFit(0, 100);
        }}
      />
    </Box>
  );
};

export default VisualizationGraph;
