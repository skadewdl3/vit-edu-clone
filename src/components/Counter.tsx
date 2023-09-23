const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="counter-value text-8xl text-center">{count}</div>
      <div className="counter-buttons flex items-center justify-center">
        <button
          className="text-5xl p-4 bg-primary mx-4 rounded-full aspect-square w-20 cursor-pointer active:translate-y-1 transition-all"
          onClick={() => setCount(count + 1)}
        >
          +
        </button>
        <button
          className="text-5xl p-4 bg-secondary mx-4 rounded-full aspect-square w-20 cursor-pointer active:translate-y-1 transition-all"
          onClick={() => setCount(count - 1)}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default Counter
