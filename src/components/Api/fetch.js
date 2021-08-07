const getTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

  if (response.status !== 200) {
    throw new Error("cannot fetch data"); //error causes promise by async function to be rejected
  }

  const data = await response.json();
  return data;
};

export default getTodos;
