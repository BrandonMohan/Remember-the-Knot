window.addEventListener("load", async (event) => {
  const deleteDemo = async () => {
    const result = await fetch('/newDemo', { method: 'DELETE' })
  }

  await deleteDemo()
  window.location.href = "/demo";
})