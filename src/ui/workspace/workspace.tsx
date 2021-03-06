import * as React from "react";
import "./workspace.less";
import {NodePosition, VNodeI} from "../schema/schema";
import {VNode} from "../vnode/vnode";
import {State} from "../index/app-reducer";
import {connect} from "react-redux";
import {ToolData} from "../tools/tools-data";


export interface WorkspaceProps {
   nodes: VNodeI[];
   placeVNode: (id: string, position: NodePosition) => void
}

export class Workspace extends React.PureComponent<WorkspaceProps, {}> {
   render() {
      return <div className="Workspace"
           onDragOver={(e) => e.preventDefault()} onDrop={this.onDrop}>
         {this.drawNodes()}
      </div>
   }

   drawNodes = () => {
      return this.props.nodes.map((n, i) =>
         <VNode node={n} index={i} key={i} />
      );
   };

   onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const toolData = JSON.parse(e.dataTransfer.getData('toolData')) as ToolData;
      const position = {x: e.clientX, y: e.clientY};

      this.props.placeVNode(toolData.id, position);
   };
}

const mapStateToProps = (state: State): WorkspaceProps => {
   return state.workspace;
};

const mapDispatchToProps = {
   placeVNode: (id: any, position: NodePosition) => {
      return {
         type: 'DROP', id, position
      };
   }
};

export const WorkspaceContainer = connect(
   mapStateToProps,
   mapDispatchToProps
)(Workspace);
