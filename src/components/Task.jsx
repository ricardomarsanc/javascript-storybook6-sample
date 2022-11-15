import PropTypes from 'prop-types'

const Task = (props) => {
  const { task, onArchiveTask, onPinTask } = props

  const { id, title, state } = task

  return (
    <div className={`list-item ${state}`}>
      <label htmlFor="checked" aria-label={`archivedTask-${id}`} className="checkbox">
        <input
          type="checkbox"
          disabled={true}
          name="checked"
          id={`archiveTask-${id}`}
          checked={state === 'TASK_ARCHIVED'}
        />
        <span
          className="checkbox-custom"
          onClick={() => onArchiveTask(id)}
        />
      </label>

      <label className="title" htmlFor="title" aria-label={title}>
        <input
          type="text"
          value={title}
          readOnly={true}
          name="title"
          placeholder="Input Title"
          style={{ background: 'red' }}
        />
      </label>

      {
        state !== "TASK_ARCHIVED" &&
        (
          <button
            className="pin-button"
            onClick={() => onPinTask(id)}
            aria-label={`pinTask-${id}`}
            id={`pinTask-${id}`}
            key={`pinTask-${id}`}
          >
            <span className={`icon-star`} />
          </button>
        )
      }
    </div>
  )
}

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};

export { Task }