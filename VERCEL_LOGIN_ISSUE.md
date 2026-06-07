# Why is my website redirecting to Vercel Login?

Hi! I investigated the issue where visiting `https://www.puspo.online` or `https://puspo.online` redirects users to a Vercel login page (specifically the SSO login).

**This is not an issue with your code.** The code in this repository is perfectly fine and there are no incorrect redirects or middleware configured.

The problem is a setting in your **Vercel Dashboard** called **Deployment Protection** (or **Vercel Authentication**).

When you visit the site from your own browser, it works because you are already logged into Vercel and your browser has a valid Vercel authentication cookie. However, when you click the link from your Facebook bio or visit from an Incognito window, you don't have that cookie, so Vercel blocks access and asks for a login.

Since I am an AI assistant and only have access to your GitHub codebase (not your Vercel account dashboard), I cannot turn this off for you. You need to disable it manually.

### How to Fix This Issue:

1. Go to your **Vercel Dashboard** (https://vercel.com) and log in.
2. Select your project for `puspo.online`.
3. Click on the **Settings** tab.
4. On the left sidebar, click on **Deployment Protection** (or **Vercel Authentication** depending on your plan).
5. Locate the **Vercel Authentication** toggle.
6. **Turn it off (disable it)** for your Production deployments.
7. Save your changes.

Once you disable this setting in the Vercel Dashboard, your website will be publicly accessible to everyone without requiring a Vercel login!
