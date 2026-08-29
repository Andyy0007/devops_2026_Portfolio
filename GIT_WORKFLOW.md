# 📚 Git Workflow Guide

Best practices for managing your DevOps portfolio on GitHub.

## Initial Setup

### Clone or Start Fresh

**Option 1: Start from Downloaded Files**
```bash
cd my-portfolio
git init
git add .
git commit -m "Initial commit: DevOps Portfolio"
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

**Option 2: Clone from GitHub**
```bash
git clone https://github.com/YOUR_USERNAME/my-portfolio.git
cd my-portfolio
```

### Configure Git (First Time)
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global core.editor "vim"  # or your preferred editor
```

---

## Daily Workflow

### Making Changes

```bash
# 1. Check status
git status

# 2. See what changed
git diff

# 3. Stage changes (all)
git add .

# OR stage specific file
git add index.html

# 4. Commit with meaningful message
git commit -m "Add new project: Terraform AWS setup"

# 5. Push to GitHub
git push origin main
```

### Commit Message Best Practices

**Good:**
```
Add Kubernetes project to portfolio

- Deployed 3-tier application
- Implemented auto-scaling
- Added monitoring with Prometheus
```

**Bad:**
```
update
fix stuff
changes
```

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tool changes

**Example:**
```
feat: Add Docker project showcase

- Added Docker containerization project
- Updated skills section with Docker badges
- Added project link to GitHub repository

Closes #1
```

---

## Version Control Best Practices

### Branching Strategy

#### For Major Changes
```bash
# Create feature branch
git checkout -b feature/new-section

# Make changes
# Commit regularly
git add .
git commit -m "Add blog section"

# Push branch
git push origin feature/new-section

# On GitHub: Create Pull Request
# After review: Merge to main

# Delete branch locally
git branch -d feature/new-section

# Delete on remote
git push origin --delete feature/new-section
```

#### For Small Updates
```bash
# Update directly on main
git add .
git commit -m "Update contact email"
git push origin main
```

### Branch Naming Conventions
```
feature/add-certifications
bugfix/fix-mobile-layout
docs/update-readme
style/improve-dark-theme
```

---

## Useful Git Commands

### Viewing History
```bash
# Last 5 commits
git log -5

# Pretty log
git log --oneline --graph --all

# Changes in specific file
git log --follow portfolio.html

# Detailed changes
git log -p -n 3
```

### Undoing Changes

```bash
# Unstage file
git restore --staged index.html

# Discard changes in working directory
git restore index.html

# Revert last commit (creates new commit)
git revert HEAD

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Viewing Differences
```bash
# Compare with last commit
git diff

# Compare with specific commit
git diff abc123..xyz789

# Compare branches
git diff main feature/new-design
```

### Stashing
```bash
# Save work in progress
git stash

# List stashed changes
git stash list

# Apply stashed changes
git stash pop

# Apply specific stash
git stash apply stash@{0}

# Discard stash
git stash drop
```

---

## Tagging Releases

```bash
# Create tag
git tag v1.0.0

# Add message
git tag -a v1.0.0 -m "First release"

# Push tags
git push origin --tags

# List tags
git tag -l

# View tag
git show v1.0.0

# Delete tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### Semantic Versioning
- `v1.0.0` - Major.Minor.Patch
- `1.0.0-alpha` - Pre-release
- `1.0.0-beta.1` - Beta release
- `1.0.0+build.123` - Build metadata

---

## Remote Operations

### Managing Remotes
```bash
# List remotes
git remote -v

# Add remote
git remote add origin https://github.com/user/repo.git

# Change remote URL
git remote set-url origin https://github.com/user/new-repo.git

# Remove remote
git remote remove origin

# Show remote info
git remote show origin
```

### Pulling Changes
```bash
# Fetch and merge
git pull

# Fetch only (no merge)
git fetch

# Pull with rebase
git pull --rebase

# Pull specific branch
git pull origin main
```

### Pushing Changes
```bash
# Push to remote
git push

# Push specific branch
git push origin feature/new-design

# Push all branches
git push --all

# Push with tags
git push --tags
```

---

## Collaboration (Multiple Team Members)

### Sync with Remote
```bash
# Before starting work
git fetch origin
git pull origin main

# Work on your branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Description"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
# Wait for review
# Merge when approved

# Return to main and sync
git checkout main
git pull origin main
```

### Resolving Merge Conflicts

```bash
# During merge, conflicts may occur
git merge feature/other-feature

# Check status
git status

# Fix conflicts manually
# Open files and resolve

# Mark as resolved
git add resolved-file.html

# Complete merge
git commit -m "Merge feature/other-feature"
```

Conflict markers in file:
```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> feature/other-feature
```

---

## .gitignore Setup

Your `.gitignore` should include:

```
# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Node (if using)
node_modules/

# Environment
.env
.env.local

# IDE projects
*.sublime-project
```

---

## GitHub Pages Deployment Workflow

### Automated Workflow
```bash
# 1. Make changes locally
nano index.html

# 2. Test locally
# Open in browser or run server

# 3. Commit changes
git add .
git commit -m "Update portfolio content"

# 4. Push to main
git push origin main

# 5. GitHub Pages auto-deploys!
# Check: Your website updates in seconds
```

### Using GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build
        run: echo "Building portfolio..."
      
      - name: Deploy
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          echo "Deploy complete"
```

---

## Backup Strategy

### Create Regular Backups

```bash
# Tag each stable version
git tag stable-2024-08-30

# Push tag
git push origin stable-2024-08-30

# To restore from tag
git checkout stable-2024-08-30
git checkout -b restore-from-backup
git push origin restore-from-backup
```

### Backup to External Location
```bash
# Create bare repository backup
git clone --bare . my-portfolio.git

# Or use GitHub as backup
git push --all https://backup.github.com/backup-repo.git
```

---

## GitHub Profile Integration

### Show Your Repository on Profile

1. Go to repository
2. Settings → General
3. Add description and topics

### Recommended Topics
```
devops
kubernetes
docker
aws
terraform
cicd
gitops
jenkins
github-actions
ansible
```

### Profile README (Optional)
Create `.github/profile/README.md` in your account:

```markdown
# 👋 Hello, I'm a DevOps Engineer

- 🚀 Building scalable infrastructure
- 📚 Specializing in Kubernetes & AWS
- 🔗 [View My Portfolio](https://github.com/Andyy0007/my-portfolio)

## Skills
- Docker & Kubernetes
- AWS & Terraform
- CI/CD & GitOps
```

---

## Useful Aliases

Add to `~/.gitconfig`:

```bash
[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    unstage = restore --staged
    undo = reset --soft HEAD~1
    log-pretty = log --oneline --graph --all
    sync = !git fetch origin && git rebase origin/main
```

Then use:
```bash
git st          # Instead of git status
git log-pretty  # Prettier log
git sync        # Fetch and rebase
```

---

## Troubleshooting

### Lost Commits
```bash
# Check reflog
git reflog

# Restore lost commit
git checkout abc123
git checkout -b recovered-branch
```

### Accidentally Committed to Wrong Branch
```bash
# Get commit hash
git log

# Create new branch from commit
git branch new-branch abc123

# Reset current branch
git reset --hard HEAD~1
```

### Need to Change Commit Message
```bash
# Last commit only
git commit --amend -m "New message"
git push --force-with-lease origin main

# WARNING: Use force-with-lease, not force!
```

### Large Files Accidentally Committed
```bash
# Remove file from history
git filter-branch --tree-filter 'rm -f large-file.zip' HEAD

# Or use git-filter-repo (recommended)
pip install git-filter-repo
git filter-repo --path large-file.zip --invert-paths
```

---

## GitHub Web Interface Tips

### Quick Edits
- Click pencil icon on any file
- Make changes
- Commit directly from browser
- Great for small fixes!

### Create Releases
1. Click "Releases" tab
2. Click "Create a new release"
3. Add tag (v1.0.0)
4. Add title and description
5. Publish release

### GitHub Pages Settings
- Settings → Pages
- Source: Deploy from branch
- Branch: main, folder: /
- Custom domain: yourdomain.com (optional)
- Enforce HTTPS: Enable

---

## Best Practices Summary

✅ **DO:**
- Commit often with meaningful messages
- Pull before pushing
- Use branches for major changes
- Tag releases
- Keep .gitignore updated
- Review changes before committing

❌ **DON'T:**
- Commit large files
- Push sensitive data
- Force push without reason
- Ignore merge conflicts
- Mix unrelated changes
- Commit personal files

---

## Resources

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [GitHub Cheat Sheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet.pdf)

---

**Happy Git-ing! 🎉**
