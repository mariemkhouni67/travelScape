export default function AdminTable({ columns, data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-surface-500">
        No data available.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-surface-600 dark:text-surface-400">
        <thead className="bg-surface-50 dark:bg-surface-700/50 text-surface-700 dark:text-surface-300 uppercase text-xs">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-6 py-4 font-semibold">{col.label}</th>
            ))}
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
              {columns.map(col => (
                <td key={col.key} className="px-6 py-4">
                  {row[col.key]}
                </td>
              ))}
              <td className="px-6 py-4 text-right space-x-2">
                <button onClick={() => onEdit(row)} className="text-primary-500 hover:underline">Edit</button>
                <button onClick={() => onDelete(row)} className="text-error-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
