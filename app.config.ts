import { url } from "node:inspector";

export default defineAppConfig({
  seo: {
    titleTemplate: "%s - 泰皇AI开放文档",
    title: "AI开放文档",
    description: "AI开放文档",
  },
  header: {
    title: "AI开放文档",
    logo: {
      light: "/logo.svg",
      dark: "/logo.svg",
      alt: "AI开放文档",
      wordmark: {
        light: "/wordmark.svg",
        dark: "/wordmark.svg",
      },
      display: "logo",
      class: "h-8 w-auto",
      favicon: "/favicon.ico",
      brandAssetUrl: "/brand",
    },
  },
  docus: {
    locale: "zh",
    colorMode: "",
    shortcuts: {
      toggleColorMode: "d", // Default
    },
  },
  ui: {
    font: false, // 关闭字体
    colors: {
      primary: "#00BFFF",
      secondary: "#FF69B4",
    },
    contentToc: {
      defaultVariants: {
        highlightVariant: "circuit",
        highlightColor: "secondary",
      },
    },
    contentNavigation: {
      defaultVariants: {
        variant: "pill",
        highlight: false,
      },
    },
    navigationMenu: {
      defaultVariants: {
        variant: "pill",
        highlight: false,
      },
    },
  },
  navigation: {
    sub: "aside",
  },
  search: {
    fts: true,
  },
  socials: {
    x: "https://x.com/nuxt_js",
  },
  toc: {
    title: "目录",
    button: {
      title: "社区支持",
      links: [
        {
          icon: "github",
          label: "GitHub",
          to: "https://github.com/nuxt",
          target: "_blank",
        },
      ],
    },
  },
  //
  github: false,
});
