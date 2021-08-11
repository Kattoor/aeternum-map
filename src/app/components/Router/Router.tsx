import {
  createContext,
  useContext,
  ReactNode,
  MouseEvent,
  useState,
} from 'react';

type RouterContextType = {
  url: URL;
  go: (href: string, preserveSearch?: boolean) => void;
  search: (params: { [key: string]: string }) => void;
};
const RouterContext = createContext<RouterContextType>({
  url: new URL(location.href),
  go: () => undefined,
  search: () => undefined,
});

type RouterProviderProps = {
  children: ReactNode;
};
export function RouterProvider({ children }: RouterProviderProps): JSX.Element {
  const [url, setURL] = useState<URL>(() => new URL(location.href));

  function go(href: string, preserveSearch?: boolean): void {
    const url = new URL(location.href);
    let fullHref = href;
    if (preserveSearch) {
      fullHref += `?${url.searchParams.toString()}`;
    }
    if (fullHref.startsWith('/')) {
      fullHref = url.origin + fullHref;
    }
    setURL(new URL(fullHref));
    history.pushState({}, '', fullHref);
  }

  function search(params: { [key: string]: string }): void {
    const url = new URL(location.href);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
    go(url.href);
  }

  return (
    <RouterContext.Provider value={{ url, go, search }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter(): RouterContextType {
  return useContext(RouterContext);
}

export function useURL(): URL {
  return useRouter().url;
}

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  preserveSearch?: boolean;
};

export function Link({
  href,
  children,
  className,
  preserveSearch,
}: LinkProps): JSX.Element {
  const router = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    router.go(event.currentTarget.href, preserveSearch);
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

type RouteProps = {
  children: ReactNode;
  path: string;
};
export function Route({ children, path }: RouteProps): JSX.Element {
  const url = useURL();

  if (url.pathname !== path) {
    return <></>;
  }
  return <>{children}</>;
}
