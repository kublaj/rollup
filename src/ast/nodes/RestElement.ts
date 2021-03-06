import { UNKNOWN_EXPRESSION } from '../values';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Scope from '../scopes/Scope';
import { ObjectPath } from '../variables/VariableReassignmentTracker';
import { PatternNode } from './shared/Pattern';
import { ExpressionEntity } from './shared/Expression';
import { NodeBase } from './shared/Node';
import { NodeType } from './index';

export default class RestElement extends NodeBase implements PatternNode {
	type: NodeType.RestElement;
	argument: PatternNode;

	reassignPath (path: ObjectPath, options: ExecutionPathOptions) {
		path.length === 0 && this.argument.reassignPath([], options);
	}

	hasEffectsWhenAssignedAtPath (path: ObjectPath, options: ExecutionPathOptions): boolean {
		return (
			path.length > 0 || this.argument.hasEffectsWhenAssignedAtPath([], options)
		);
	}

	initialiseAndDeclare (
		parentScope: Scope, kind: string, _init: ExpressionEntity | null) {
		this.initialiseScope(parentScope);
		this.argument.initialiseAndDeclare(parentScope, kind, UNKNOWN_EXPRESSION);
	}
}
