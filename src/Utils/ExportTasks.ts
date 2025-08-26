export default function exportTasksToCSV(tasks: {
  id: number;
  title: string;
  summary: string;
  isCompleted: boolean;
  activeTimer: number;
}[]) {
  // CSV header
  const header = ["Title", "Summary", "Completed", "Work Time (hours)"];

  // Map tasks to CSV rows
  const rows = tasks.map(task => [
    `"${task.title.replace(/"/g, '""')}"`,   // escape quotes
    `"${task.summary.replace(/"/g, '""')}"`,
    task.isCompleted ? "Yes" : "No",
    task.hasOwnProperty('activeTimer') ? task['activeTimer'].toFixed(2) : "0"
  ]);

  // Combine header + rows
  const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");

  // Create blob & download
  const BOM = "\uFEFF"; // UTF-8 BOM
  const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  const date = new Date().toISOString().split('T')[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `tasks-${date}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
