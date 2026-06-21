/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "no-unresolved",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
      },
    },
    {
      name: "no-missing-package-dependency",
      severity: "error",
      from: {},
      to: {
        dependencyTypes: ["npm-no-pkg", "npm-unknown"],
      },
    },
    {
      name: "no-production-code-to-dev-dependencies",
      severity: "error",
      from: {
        path: "^src/",
        pathNot: "[.](?:spec|test)[.](?:js|jsx|ts|tsx)$",
      },
      to: {
        dependencyTypes: ["npm-dev"],
        dependencyTypesNot: ["type-only"],
        pathNot: "^node_modules/@types/",
      },
    },
    {
      name: "lib-must-not-import-ui-or-app",
      severity: "error",
      comment:
        "Shared library code should stay framework- and UI-agnostic so business rules can be reused safely.",
      from: {
        path: "^src/lib/",
      },
      to: {
        path: "^src/(?:app|components|features)/",
      },
    },
    {
      name: "features-must-not-import-app",
      severity: "error",
      comment:
        "Feature modules should not depend on route files; routes compose features.",
      from: {
        path: "^src/features/",
      },
      to: {
        path: "^src/app/",
      },
    },
    {
      name: "features-must-not-import-sibling-features",
      severity: "error",
      comment:
        "Keep features independent. Share cross-feature code through src/lib or explicitly approved shared modules.",
      from: {
        path: "^src/features/([^/]+)/",
      },
      to: {
        path: "^src/features/",
        pathNot: "^src/features/$1/",
      },
    },
    {
      name: "ui-components-must-not-import-app-or-features",
      severity: "error",
      comment:
        "Reusable UI primitives should not depend on routes, layouts, page-level code, or product features.",
      from: {
        path: "^src/components/ui/",
      },
      to: {
        path: "^src/(?:app|features)/",
      },
    },
    {
      name: "no-src-orphans",
      severity: "warn",
      comment:
        "Source files should normally be reachable from the app. Add focused exceptions for deliberate entry points.",
      from: {
        orphan: true,
        path: "^src/",
        pathNot: [
          "^src/app/(?:layout|page)\\.tsx$",
          "^src/app/globals\\.css$",
          "^src/app/favicon\\.ico$",
          "^src/features/[^/]+/index\\.ts$",
        ],
      },
      to: {},
    },
  ],
  options: {
    doNotFollow: {
      path: "^node_modules/",
    },
    exclude: {
      path: ["^\\.next/", "^node_modules/"],
    },
    moduleSystems: ["es6", "cjs"],
    tsConfig: {
      fileName: "tsconfig.json",
    },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
    },
  },
};
