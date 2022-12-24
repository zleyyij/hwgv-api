import { serve } from "./deps.ts";
import conf from "./config.json" assert {type: "json"};
const port = conf.port;
const handler = async (request: Request): Promise<Response> => {
  const u = new URL(request.url);
  let urlToFetchFrom: string | null = u.searchParams.get("url");
  if (urlToFetchFrom == null) {
  urlToFetchFrom = "";
  }
  

  const resp = await fetch(urlToFetchFrom);
  return new Response(resp.body, {
    status: resp.status,
    headers: {
      "content-type": "text/csv",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

serve(handler, { port });
