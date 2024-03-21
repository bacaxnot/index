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
        allowOrigins: prodOnly(Object.values(domains), ["*"]),
      },
    });
    const OpenAIApiKey = new sst.Secret("OpenAIApiKey");

    const lambda = new sst.aws.Function("CreatePost", {
      handler: "packages/functions/src/blog/create.handler",
      timeout: "3 minutes",
      memory: "1024 MB",
      url: true,
      link: [bucket],
      environment: {
        OPENAI_API_KEY: OpenAIApiKey.value,
      },
    });

    new sst.aws.Nextjs("Admin", {
      path: "apps/admin",
      domain: prodOnly(domains.admin),
      link: [bucket, lambda],
    });

    new sst.aws.Astro("Landing", {
      path: "apps/landing",
      domain: prodOnly({
        domainName: domains.landing,
        redirects: [`www.${domains.landing}`],
      }),
      environment: {
        BLOG_APP_URL: `https://${domains.blog}`,
      },
    });

    new sst.aws.Astro("Blog", {
      path: "apps/blog",
      domain: prodOnly(domains.blog),
      environment: {
        LANDING_APP_URL: `https://${domains.landing}`,
      },
    });

    function prodOnly<T, D>(input: T, fallback?: D) {
      const production = $app.stage === "prod";
      return production ? input : fallback;
    }
  },
});
