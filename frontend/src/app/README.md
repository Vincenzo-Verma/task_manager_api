Frontend module layout:
- app: app wiring (router/bootstrap)
- features: domain modules (auth, tasks)
- lib: infrastructure (api client, token handling, logger)
- shared: reusable components, validation, utilities

This structure supports scaling with new modules by adding feature folders under src/features.
