# Deployment Guide

## Step 1: Create GitHub Repository

1. Visit [GitHub](https://github.com) and login
2. Click the "+" icon in the top right corner, select "New repository"
3. Repository name: `flock-api`
4. Select "Public"
5. Do NOT check "Add a README file" (we already have one)
6. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/flock-api.git

# Push code to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Visit [Vercel](https://vercel.com)
2. Login with GitHub account
3. Click "New Project"
4. Select your newly created `flock-api` repository
5. Keep default settings, click "Deploy"

## Step 4: Get API Link

After deployment, you'll get a link like this:
```
https://flock-api-xxxxx.vercel.app
```

Your API endpoint will be:
```
https://flock-api-xxxxx.vercel.app/api/supply
```

## Step 5: Test API

Use the following command to test the API:

```bash
curl https://flock-api-xxxxx.vercel.app/api/supply
```

Or visit in browser:
```
https://flock-api-xxxxx.vercel.app/api/supply
```

## Notes

- Ensure your GitHub repository is public
- Vercel will automatically detect the `vercel.json` configuration
- API will be available within minutes
- If you need a custom domain, you can configure it in Vercel project settings

## Troubleshooting

If you encounter issues:

1. Check if GitHub repository is public
2. Confirm `vercel.json` file exists and format is correct
3. Check Vercel deployment logs
4. Ensure all dependencies are properly installed
