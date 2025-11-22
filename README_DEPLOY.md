Deployment options and quick start
================================

Two quick ways to publish this static site:

1) GitHub Pages (recommended for simple static sites)
   - Create a new GitHub repository and push this project to it (see commands below).
   - The repository includes a GitHub Actions workflow ('.github/workflows/deploy.yml') which will automatically deploy the repository root to GitHub Pages whenever you push to the `main` branch.

2) Netlify / Vercel (drag-and-drop or connect repo)
   - You can also drag & drop the project folder (or connect your GitHub repo) to Netlify or Vercel for instant hosting with their free tiers.

PowerShell quick commands (run from the project root on your machine):

1. Initialize git and commit the project

   git init
   git add .
   git commit -m "Initial commit - L1 TRIANGLE site"

2. Create a repository on GitHub (via web UI) and push

   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main

3. The Actions workflow will run automatically and deploy to GitHub Pages. After the workflow completes, your site will be available on the GitHub Pages URL assigned for the repository (or via the Pages settings).

Notes
-----
- The included workflow uses GitHub Pages Actions (native) and requires no secrets—the GITHUB_TOKEN provided to Actions is used automatically.
- If you prefer Netlify or Vercel, just connect the GitHub repo or drag & drop the site's directory.
- If you want me to set up a custom domain or create the repo for you, I can provide the exact steps or a script; I cannot push to GitHub for you without your credentials.
