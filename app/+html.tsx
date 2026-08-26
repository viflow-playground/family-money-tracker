import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

const githubPagesBaseUrl = process.env.EXPO_PUBLIC_GITHUB_PAGES_BASE_URL?.replace(/\/$/, "") ?? "";
const assetUrl = (path: string) => `${githubPagesBaseUrl}/${path}`;
const serviceWorkerRegistration = `
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("${assetUrl("sw.js")}").catch(function () {});
  });
}
`;

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <meta name="theme-color" content="#176B73" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Family Money" />
        <link rel="manifest" href={assetUrl("manifest.json")} />
        <link rel="apple-touch-icon" href={assetUrl("apple-touch-icon.png")} />
        <script dangerouslySetInnerHTML={{ __html: serviceWorkerRegistration }} />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
