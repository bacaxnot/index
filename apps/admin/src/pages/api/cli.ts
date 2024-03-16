import type { APIRoute } from "astro";

type ClIProps = {};
type ClIParams = {};
export const POST: APIRoute<ClIProps, ClIParams> = async ({ request }) => {
  const body = await request.json();
  console.log(body);

  return new Response("Hello World", { status: 200 });
};
