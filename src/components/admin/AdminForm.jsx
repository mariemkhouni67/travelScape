import Button from '../common/Button'

export default function AdminForm({ title, fields, onSubmit, onCancel, initialData }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(initialData)
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-1">{field.label}</label>
            <input 
              type={field.type || 'text'}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}
