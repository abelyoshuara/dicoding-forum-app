import { http, HttpResponse } from "msw";

// Describe the network.
export const handlers = [
  http.get("https://acme.com/product/:id", ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      title: "Porcelain Mug",
      price: 9.99,
    });
  }),
];
