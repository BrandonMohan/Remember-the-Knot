window.addEventListener("load", async (event) => {
  const deleteDemo = async () => {
    const result = await fetch('/newDemo', { method: 'DELETE' })
  }

  await deleteDemo()
  setTimeout(function () {
    window.location.href = "/demo";
  }, 3000);
})