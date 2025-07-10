#!/bin/bash

# Lizzie Buras Website Deployment Script
# This script will push the website to GitHub and prepare it for Vercel deployment

echo "🏠 Lizzie Buras Website Deployment Script"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install Git first.${NC}"
    exit 1
fi

# Check if we're in a git repository
if [ ! -d .git ]; then
    echo -e "${BLUE}🔄 Initializing Git repository...${NC}"
    git init
    git branch -M main
    git remote add origin https://github.com/udonthavemotion/lizzieburas.git
else
    echo -e "${GREEN}✅ Git repository already exists${NC}"
fi

# Create .gitignore if it doesn't exist
if [ ! -f .gitignore ]; then
    echo -e "${BLUE}📝 Creating .gitignore file...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Build outputs
dist/
build/

# Vercel
.vercel
EOF
fi

# Stage all files
echo -e "${BLUE}📦 Staging files for commit...${NC}"
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${GREEN}✅ No changes to commit${NC}"
else
    # Commit changes
    echo -e "${BLUE}💾 Committing changes...${NC}"
    git commit -m "🚀 Deploy Lizzie Buras REALTOR® website with storytelling design

- Added modern storytelling approach to 'Getting to Know Lizzie' section
- Implemented parallax scrolling effects and immersive design
- Updated personal content with family photos and professional background
- Added Vercel deployment configuration
- Optimized for performance and SEO
- Mobile-responsive design with smooth animations
- Real client testimonials with photos
- Professional real estate website ready for deployment"
fi

# Push to GitHub
echo -e "${BLUE}🚀 Pushing to GitHub...${NC}"
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub. Please check your credentials.${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Deployment successful!${NC}"
echo ""
echo "Next steps:"
echo "1. 🌐 Go to https://vercel.com"
echo "2. 🔗 Connect your GitHub account"
echo "3. 📥 Import the repository: udonthavemotion/lizzieburas"
echo "4. 🚀 Deploy automatically (Vercel will detect the configuration)"
echo "5. 🔧 Optional: Add custom domain in Vercel dashboard"
echo ""
echo "Repository: https://github.com/udonthavemotion/lizzieburas"
echo "Live URL: https://lizzieburas.vercel.app (after Vercel deployment)"
echo ""
echo -e "${GREEN}🏠 Lizzie Buras REALTOR® website is ready for the world!${NC}" 