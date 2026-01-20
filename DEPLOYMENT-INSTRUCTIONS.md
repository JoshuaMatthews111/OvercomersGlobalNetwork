# GitHub Pages Deployment

Your site will automatically deploy to GitHub Pages at:
https://joshuamatthews111.github.io/OvercomersGlobalNetwork

## For Custom Domain overcomersglobalnetwork.com:

1. In your GitHub repo, go to Settings → Pages
2. Under 'Custom domain', add: overcomerglobalnetwork.com
3. In IONOS DNS, add these records:

| Type | Host | Value |
|------|------|-------|
| CNAME | www | joshuamatthews111.github.io |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

## Environment Variables:
The workflow includes your Stripe keys and admin credentials.

Your site will be live after the GitHub Action completes!
