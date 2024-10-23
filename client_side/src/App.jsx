import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-gray-200 p-4">
        <h1 className="text-3xl font-bold text-blue-500">Hello, Tailwind CSS!</h1>
        <p className="text-gray-700 mt-2">This is a simple React application styled with Tailwind CSS.</p>
      </div>
      
    </>
  )
}

export default App
