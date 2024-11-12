import { Suspense } from 'react'
import { notFound } from 'next/navigation'

interface SearchParams {
  ids?: string
}

function SelectedPapersContent({ ids }: { ids: string[] }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Selected Paper IDs</h1>
      {ids.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {ids.map((id) => (
            <li key={id} className="text-lg">
              {id}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600">No papers selected.</p>
      )}
    </div>
  )
}

export default function SelectedPapersPage({ searchParams }: { searchParams: SearchParams }) {
  const ids = searchParams.ids ? searchParams.ids.split(',') : []

  if (ids.length === 0) {
    notFound()
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectedPapersContent ids={ids} />
    </Suspense>
  )
}
