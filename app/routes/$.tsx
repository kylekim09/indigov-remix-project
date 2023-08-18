import { LoaderFunction, redirect } from "@remix-run/node";
//Quick Splat route
export const loader: LoaderFunction = () => {
  return redirect("/constituents/upload")
}

