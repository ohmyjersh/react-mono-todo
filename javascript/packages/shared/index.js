import TodoStore, {TodosContext} from './TodoStore';
import VisibilityStore, {VisibilityContext} from './VisibilityStore';
import todoConnect from './TodoConnect';
import gvt from './getVisibleTodos';

export const Todo = {TodoStore, TodosContext};
export const Visbility = {VisibilityStore, VisibilityContext}
export const getVisibleTodos = gvt;
export const TodoConnect = todoConnect;