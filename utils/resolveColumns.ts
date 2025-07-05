export async function resolveColumns(model: string) {
  try {
    const module = await import(`~/configs/columns/${model}-columns.ts`)
    const key = `${model.charAt(0).toUpperCase()}${model.slice(1)}Columns`;
    return module[key] || []
  } catch (e) {
    return []
  }
} 