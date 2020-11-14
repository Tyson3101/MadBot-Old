import fetch from "node-fetch";

export async function getUserInfo(
  route: string,
  options: object
): Promise<object> {
  return await fetch(route, options).then((res) => res.json());
}
