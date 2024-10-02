import { cloneElement, useState } from "react";
import { useRoute } from "wouter";

type Routes = Array<{
    path: string;
    element: JSX.Element;
}>;

export const useRoutes = (routes: Routes) => {
    // save the length of the `routes` array that we receive on the first render
    const [routesLen] = useState(() => routes.length);

    // because we call `useRoute` inside a loop the number of routes can't be changed!
    // otherwise, it breaks the rule of hooks and will cause React to break
    if (routesLen !== routes.length) {
        throw new Error(
            "The length of `routes` array provided to `useRoutes` must be constant!"
        );
    }

    const matches = routes.map((def) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useRoute(def.path);
    });

    for (let [index, match] of matches.entries()) {
        const [isMatch, params] = match;

        if (isMatch) {
            return cloneElement(routes[index].element, { params });
        }
    }

    return null;
};