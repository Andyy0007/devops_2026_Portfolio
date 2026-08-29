# 🚀 Deployment Guide

Complete guide to deploy your DevOps portfolio to various platforms.

## Table of Contents
1. [GitHub Pages](#github-pages)
2. [Netlify](#netlify)
3. [Vercel](#vercel)
4. [AWS S3 + CloudFront](#aws-s3--cloudfront)
5. [Docker + Kubernetes](#docker--kubernetes)
6. [Custom Domain Setup](#custom-domain-setup)

---

## GitHub Pages

### Prerequisites
- GitHub account
- Git installed locally

### Step-by-Step Deployment

1. **Create Repository on GitHub**
   ```bash
   # If not already created
   # Go to github.com and create new repository "my-portfolio"
   ```

2. **Initialize Local Git Repository**
   ```bash
   cd my-portfolio
   git init
   git add .
   git commit -m "Initial commit: DevOps Portfolio"
   ```

3. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/Andyy0007/my-portfolio.git
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/" (root) folder
   - Click Save

5. **Access Your Portfolio**
   - Your site will be available at: `https://Andyy0007.github.io/my-portfolio/`
   - May take a few minutes to become active

### Benefits
✅ Free hosting
✅ Easy to update (just push to GitHub)
✅ Built-in versioning
✅ HTTPS by default
✅ No configuration needed

### Update Portfolio
```bash
# Make changes locally
git add .
git commit -m "Update portfolio with new projects"
git push origin main
# Changes appear automatically within minutes
```

---

## Netlify

### Prerequisites
- GitHub account
- Netlify account (free at netlify.com)

### Step-by-Step Deployment

1. **Push Code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Netlify**
   - Visit [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Select GitHub as provider
   - Authorize and select your repository

3. **Configure Build Settings**
   - Build command: (leave empty for static site)
   - Publish directory: `.` (current directory)
   - Click "Deploy site"

4. **Access Your Portfolio**
   - Netlify auto-generates a URL: `https://your-site.netlify.app`
   - Or use a custom domain

### Netlify Features
✅ Automatic builds on push
✅ Preview deployments
✅ Easy rollbacks
✅ Form submission handling
✅ Free HTTPS
✅ Global CDN

### Using Netlify Forms
Update your contact form in `index.html`:
```html
<form name="contact" method="POST" netlify>
    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>
    <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

---

## Vercel

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)

### Step-by-Step Deployment

1. **Push Code to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Authorize and select repository

3. **Configure Project**
   - Framework Preset: Other
   - Root Directory: `.`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
   - Click "Deploy"

4. **Access Your Portfolio**
   - Vercel provides URL: `https://your-project.vercel.app`

### Vercel Features
✅ Zero-config deployment
✅ Automatic HTTPS
✅ Global edge network
✅ Preview URLs for PRs
✅ Instant rollbacks
✅ Serverless functions (if needed)

---

## AWS S3 + CloudFront

### Prerequisites
- AWS account
- AWS CLI installed
- Configure AWS credentials

### Step-by-Step Deployment

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://my-portfolio-andyy0007 --region us-east-1
   ```

2. **Enable Static Website Hosting**
   ```bash
   aws s3 website s3://my-portfolio-andyy0007 \
       --index-document index.html \
       --error-document index.html
   ```

3. **Upload Files**
   ```bash
   aws s3 sync . s3://my-portfolio-andyy0007 \
       --exclude ".git/*" \
       --exclude ".gitignore" \
       --exclude "README.md"
   ```

4. **Make Files Public** (Bucket Policy)
   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Sid": "PublicReadGetObject",
               "Effect": "Allow",
               "Principal": "*",
               "Action": "s3:GetObject",
               "Resource": "arn:aws:s3:::my-portfolio-andyy0007/*"
           }
       ]
   }
   ```

5. **Create CloudFront Distribution** (for CDN & HTTPS)
   ```bash
   # Use AWS Console for easier setup
   # Distribution Origin: Your S3 bucket
   # Default Root Object: index.html
   # Custom SSL Certificate: (if using custom domain)
   ```

6. **Access Your Portfolio**
   - S3 Website URL: `http://my-portfolio-andyy0007.s3-website-us-east-1.amazonaws.com`
   - CloudFront URL: `https://d123456.cloudfront.net`

### Cost Estimation
- S3 Storage: ~$0.024/GB/month
- CloudFront: ~$0.085/GB for data transfer
- Total: Typically less than $1/month

### Update Portfolio
```bash
aws s3 sync . s3://my-portfolio-andyy0007 --delete
```

---

## Docker + Kubernetes

### Prerequisites
- Docker installed
- Docker Hub account
- Kubernetes cluster (local or cloud)

### Step 1: Create Dockerfile

```dockerfile
# Use nginx as base image
FROM nginx:alpine

# Copy portfolio files
COPY . /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Step 2: Create nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name _;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Step 3: Build Docker Image

```bash
docker build -t andyy0007/my-portfolio:latest .
```

### Step 4: Test Locally

```bash
docker run -p 8080:80 andyy0007/my-portfolio:latest
# Visit http://localhost:8080
```

### Step 5: Push to Docker Hub

```bash
docker login
docker push andyy0007/my-portfolio:latest
```

### Step 6: Deploy to Kubernetes

Create `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: portfolio
  template:
    metadata:
      labels:
        app: portfolio
    spec:
      containers:
      - name: portfolio
        image: andyy0007/my-portfolio:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: portfolio-service
spec:
  selector:
    app: portfolio
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

Deploy to Kubernetes:

```bash
kubectl apply -f deployment.yaml
kubectl get service portfolio-service
# Access via LoadBalancer IP
```

### Using Helm

Create Helm chart structure:

```bash
helm create portfolio-chart
```

Deploy with Helm:

```bash
helm install my-portfolio ./portfolio-chart \
  --values values.yaml
```

---

## Custom Domain Setup

### Option 1: GitHub Pages + Custom Domain

1. **Register Domain**
   - GoDaddy, Namecheap, or any registrar

2. **Add to GitHub**
   - Go to repository Settings → Pages
   - Under "Custom domain", enter: `yourdomin.com`
   - GitHub creates CNAME file

3. **Update DNS Records**
   ```
   CNAME  www  Andyy0007.github.io
   A      @    185.199.108.153
   A      @    185.199.109.153
   A      @    185.199.110.153
   A      @    185.199.111.153
   ```

4. **Verify & Enable HTTPS**
   - Wait 15-30 minutes for DNS propagation
   - Check "Enforce HTTPS" in GitHub Pages settings

### Option 2: Netlify + Custom Domain

1. **Add Domain**
   - Netlify Site settings → Domain management
   - Add custom domain

2. **Update DNS**
   - Use Netlify nameservers
   - Or point CNAME to Netlify

3. **SSL/TLS**
   - Automatic via Let's Encrypt

### Option 3: Vercel + Custom Domain

1. **Add Domain**
   - Project settings → Domains
   - Add your domain

2. **Update DNS**
   - Follow Vercel's DNS instructions
   - Or use Vercel nameservers

3. **SSL Certificate**
   - Automatic

---

## Performance Optimization

### Before Deployment

1. **Minify CSS & JavaScript**
   ```bash
   # Using online tools or build tools
   ```

2. **Optimize Images**
   ```bash
   # Convert to WebP format
   # Compress PNG/JPG
   ```

3. **Enable Caching**
   ```
   Cache-Control: max-age=31536000 (static assets)
   Cache-Control: max-age=3600 (HTML)
   ```

4. **Enable GZIP Compression**
   - Usually enabled by default

### Monitor Performance

- Use Google PageSpeed Insights
- Monitor with Lighthouse
- Use GTmetrix
- Check WebPageTest

---

## CI/CD Pipeline Example

### GitHub Actions Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker image
      run: docker build -t my-portfolio:latest .
    
    - name: Login to Docker Hub
      uses: docker/login-action@v1
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_PASSWORD }}
    
    - name: Push to Docker Hub
      run: docker push my-portfolio:latest
    
    - name: Deploy to Kubernetes
      run: kubectl apply -f deployment.yaml
```

---

## Troubleshooting

### Site Not Loading
- Check DNS propagation: `dig yourdomain.com`
- Verify file permissions
- Check browser console for errors

### HTTPS Not Working
- Wait 24-48 hours for SSL certificate
- Clear browser cache
- Verify domain DNS

### Performance Issues
- Enable CDN
- Optimize images
- Minify CSS/JS
- Enable caching headers

### Contact Form Not Working
- For GitHub Pages: Use Netlify Forms or FormSubmit
- For Netlify: Add `netlify` attribute to form
- For custom server: Set up backend

---

## Maintenance

### Regular Updates

```bash
# Update content
git pull origin main
git add .
git commit -m "Update portfolio content"
git push origin main

# Changes deploy automatically
```

### Backup Strategy

```bash
# Create backup before major changes
git tag backup-$(date +%Y%m%d)
git push origin --tags
```

### Monitoring

- Set up uptime monitoring
- Monitor error rates
- Track page performance
- Monitor server resources

---

## Summary Table

| Platform | Cost | Setup Time | Best For |
|----------|------|------------|----------|
| GitHub Pages | Free | 5 min | Quick, simple |
| Netlify | Free+ | 5 min | Advanced features |
| Vercel | Free+ | 5 min | Speed, serverless |
| AWS S3 | Cheap | 15 min | AWS ecosystem |
| Docker | Free+ | 30 min | Containerization |
| Kubernetes | Cheap+ | 1 hour | Scaling, advanced |

---

For more help:
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [AWS S3 Docs](https://docs.aws.amazon.com/s3/)

Happy Deploying! 🚀
