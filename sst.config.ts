/// <reference path="./.sst/platform/config.d.ts" />

const domains = {
  landing: "bacaxnot.com",
  blog: "blog.bacaxnot.com",
  admin: "admin.bacaxnot.com",
};

export default $config({
  app(input) {
    return {
      name: "bacaxnot",
      removal: "remove",
      home: "aws",
    };
  },
  async run() {
    const bucket = new sst.aws.Bucket("Assets", {
      public: true,
      cors: {
        allowOrigins: $app.stage === "dev" ? ["*"] : Object.values(domains),
      },
    });

    new sst.aws.Nextjs("Admin", {
      path: "apps/admin",
      domain: domains.admin,
      link: [bucket],
    });

    new sst.aws.Astro("Landing", {
      path: "apps/landing",
      domain: {
        domainName: domains.landing,
        redirects: [`www.${domains.landing}`],
      },
      environment: {
        BLOG_APP_URL: `https://${domains.blog}`,
      },
    });

    new sst.aws.Astro("Blog", {
      path: "apps/blog",
      domain: domains.blog,
      environment: {
        LANDING_APP_URL: `https://${domains.landing}`,
      },
    });
  },
});
