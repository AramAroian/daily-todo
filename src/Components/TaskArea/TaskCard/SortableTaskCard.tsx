import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

export default function SortableTaskCard({ task, handleTaskAction }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "0.75rem",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        id={task.id}
        title={task.title}
        summary={task.summary}
        isCompleted={task.isCompleted}
        isActive={task.isActive}
        handleTaskAction={handleTaskAction}
      />
    </div>
  );
}