export async function handler(event: any) {
  // const { title, content } = event.body;
  // const post = await createPost(title, content);
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(post),
  // };
  const eventObject = event;
  console.log(eventObject);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Lambda!",
    }),
  };
}
