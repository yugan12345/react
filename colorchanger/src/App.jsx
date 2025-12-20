import Button from './button'

function App() {
  return (
    <div
      style={{
        height: '99vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '30px',
      }}
    >
      <Button color="red" />
      <Button color="blue" />
      <Button color="green" />
      <Button color="yellow" />
      <Button color="purple" />
      <Button color="orange" />
      <Button color="pink" />
      <Button color="black" />
      <Button color="gray" />
      <Button color="brown" />
    </div>
  )
}

export default App
