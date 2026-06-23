# Project-Specific Rules

## Workspace Structure
1. **GitHub Repository**: The remote GitHub repository is `https://github.com/nosaevsergei/test1`.
2. **Multi-Site Directories**: Every new landing page should be created in its own sub-directory inside the workspace root (e.g., `/balance`, `/synapse`, `/nil`).
3. **Deployment updates**: When requested to push new changes to GitHub, make sure to update:
   - `README.md` at the root, adding links to the live Pages.
   - The main landing portal page `index.html` at the root, adding a navigation card to the new project.
   - The deployment workflow `.github/workflows/deploy.yml` to compile, bundle, and nest the new subproject.
