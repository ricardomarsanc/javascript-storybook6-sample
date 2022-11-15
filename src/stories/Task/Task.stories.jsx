import { Task } from '../../components'

export default {
  component: Task,
  title: 'Ricardo/Task'
}

const Template = args => <Task {...args} />

/** Template.bind({}) is a standard JavaScript technique for making a copy of a function */
export const Default = Template.bind({})
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX'
  }
}

export const Pinned = Template.bind({})
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
}

export const Archived = Template.bind({})
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
}