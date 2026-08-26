# GitHub Pages Deployment Guide

This project is configured to publish its installable iOS Progressive Web App to GitHub Pages. The site URL will be `https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`. The application code is hosted publicly, but the family’s balances, work tasks, PIN, and activity data remain in local storage on each device.

## One-time GitHub setup

| Step | Action |
|---|---|
| 1 | Sign in to [GitHub](https://github.com) and select **New repository**. |
| 2 | Name the repository, for example `family-money-tracker`. Choose **Public** if you are using GitHub’s free Pages hosting. Do not add a README, `.gitignore`, or licence at this stage. |
| 3 | From this project’s **Code** panel, download the source as a ZIP file and extract it on your computer. Do not upload `node_modules` or `dist` folders if present. |
| 4 | Open the extracted project in [GitHub Desktop](https://desktop.github.com), choose **Publish repository**, and select the repository created in step 2. Alternatively, use Git from a terminal to add, commit, and push the extracted files to `main`. |
| 5 | In the GitHub repository, select **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**. |
| 6 | Select the **Actions** tab. The workflow named **Deploy Family Money PWA to GitHub Pages** will run after the first push to `main`. Wait for it to complete successfully. |
| 7 | Open **Settings → Pages** again. GitHub shows the permanent public URL at the top of the page. |

## Install on iPhone or iPad

Open the permanent GitHub Pages URL in **Safari**. Tap the **Share** button, choose **Add to Home Screen**, and tap **Add**. Family Money will appear on the home screen and launch in a standalone app-style window.

## Updating the PWA later

Make changes in the repository and push them to the `main` branch. GitHub Actions will rebuild and redeploy the PWA automatically. If Safari retains an older version, close the installed web app and open the GitHub Pages URL in Safari once before launching it again.
