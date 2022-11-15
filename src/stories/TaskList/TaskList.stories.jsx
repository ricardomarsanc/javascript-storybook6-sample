import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { TaskList } from "../../components"
/**
 * By importing TaskStories, we were able to compose the arguments
 * in our stories with minimal effort. That way, the data and
 * actions (mocked callbacks) expected by both components are preserved.
 */
import * as TaskStories from '../Task/Task.stories'

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
}

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const task = state.tasks.findIndex((task) => task.id === id);
              if (task >= 0) {
                state.tasks[task].state = newTaskState;
              }
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
)

export default {
  component: TaskList,
  title: "Ricardo/TaskList",

  /**
   * Decorators are a way to provide arbitrary wrappers to stories.
   * In this case we’re using a decorator key on the default export to add
   * some padding around the rendered component.
   * They can also be used to wrap stories in “providers"
   * -–i.e., library components that set React context.
   */
  decorators: [story => <div style={{ padding: '3em' }}>{story()}</div>],
  excludeStories: /.*MockedState$/
}

const Template = () => <TaskList />

export const Default = Template.bind({})
Default.decorators = [
  (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>,
]

export const WithPinnedTasks = Template.bind({})
WithPinnedTasks.decorators = [
  (story) => {
    const pinnedtasks = [
      ...MockedState.tasks.slice(0, 5),
      { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' },
    ]

    return (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: pinnedtasks,
        }}
      >
        {story()}
      </Mockstore>
    )
  },
]

export const Loading = Template.bind({})
Loading.decorators = [
  (story) => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        status: 'loading',
      }}
    >
      {story()}
    </Mockstore>
  ),
]

export const Empty = Template.bind({})
Empty.args = [
  (story) => (
    <Mockstore
      taskboxState={{
        ...MockedState,
        tasks: []
      }}
    >
      {story()}
    </Mockstore>
  ),]