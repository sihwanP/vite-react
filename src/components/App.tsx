import React from 'react'
import { useState, useEffect } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log(`count가 ${count}로 변경됨`)
  }, [count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default App
