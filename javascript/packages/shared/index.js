import TodoStore, {TodosContext} from './TodoStore';
import VisibilityStore, {VisibilityContext} from './VisibilityStore';
import gvt from './getVisibleTodos';
export const Todo = {TodoStore, TodosContext};
export const Visbility = {VisibilityStore, VisibilityContext}
export const getVisibleTodos = gvt;