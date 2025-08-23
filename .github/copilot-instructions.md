# Technical Documentation Site - toshi0907/docs

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

This is a Jekyll-based technical documentation site hosted on GitHub Pages. The repository contains comprehensive documentation on various technologies including Node.js, Python, Nginx, shell scripting, and more. The site is built using Jekyll 4.3.0 with the Minima theme and deploys automatically to GitHub Pages.

## Working Effectively

### Bootstrap and Environment Setup
Before working with this repository, ensure the development environment is properly configured:

```bash
# Install bundler (required for dependency management)
gem install --user-install bundler

# Add bundler to PATH (required for every session)
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"

# Install Jekyll dependencies (in docs/ directory)
cd docs
bundle install --path ./vendor/bundle
```

**CRITICAL TIMING**: `bundle install` takes 15-20 seconds to complete. NEVER CANCEL - set timeout to 60+ seconds.

### Build and Test Commands

```bash
# Build the Jekyll site (from docs/ directory)
cd docs
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
bundle exec jekyll build
```

**TIMING**: Build takes under 1 second (typically 0.2-0.8 seconds). NEVER CANCEL - set timeout to 30+ seconds for safety.

```bash
# Start development server (from docs/ directory)
cd docs
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

**TIMING**: Server starts in 2-3 seconds. Site accessible at http://localhost:4000/docs/

### Validation and Testing

**CRITICAL**: Always manually validate documentation changes by running through complete scenarios:

1. **Build Validation**: After making changes, always run:
   ```bash
   cd docs
   bundle exec jekyll build
   ```
   Verify build completes without errors.

2. **Server Validation**: Start the development server and verify pages load:
   ```bash
   cd docs
   bundle exec jekyll serve --host 0.0.0.0 --port 4000
   # Test accessibility:
   curl -s -o /dev/null -w "%{http_code}" http://localhost:4000/docs/
   # Should return: 200
   ```

3. **Content Validation**: When editing documentation:
   - Start the development server
   - Navigate to the modified pages at http://localhost:4000/docs/
   - Verify content renders correctly
   - Check that code examples display properly
   - Ensure TOC generation works with `{:toc}` syntax

## Repository Structure

### Key Directories and Files
```
/
├── docs/                    # Main Jekyll site directory
│   ├── _config.yml         # Jekyll configuration
│   ├── Gemfile             # Ruby dependencies
│   ├── _layouts/           # Custom Jekyll layouts
│   ├── _site/              # Generated site (build output)
│   ├── vendor/             # Bundler dependencies (excluded from git)
│   ├── index.md            # Home page
│   ├── api.md              # API documentation
│   ├── nodejs.md           # Node.js reference
│   ├── python.md           # Python reference
│   └── [other].md          # Various tech documentation
├── copilot-instructions.md # Legacy instructions (Japanese)
└── README.md               # Repository overview
```

### Important File Locations
- **Jekyll Config**: `docs/_config.yml`
- **Dependencies**: `docs/Gemfile`
- **Main Content**: `docs/*.md` files
- **Custom Layouts**: `docs/_layouts/`
- **Built Site**: `docs/_site/` (auto-generated)

## Technology Stack

- **Static Site Generator**: Jekyll 4.3.0
- **Language**: Ruby 3.2.3+
- **Package Manager**: Bundler 2.7.1+
- **Theme**: Minima 2.5
- **Hosting**: GitHub Pages
- **Deployment**: Automatic via GitHub Actions

## Common Tasks

### Adding New Documentation
1. Create new `.md` file in `docs/` directory
2. Add Jekyll front matter:
   ```yaml
   ---
   layout: page
   title: "Your Title"
   ---
   ```
3. Include table of contents:
   ```markdown
   * 目次
   {:toc}
   ```
4. Build and test locally before committing

### Editing Existing Documentation
1. Make changes to `.md` files in `docs/` directory
2. Test locally with development server
3. Verify content renders correctly
4. Check that all links work
5. Ensure code examples are functional

### Troubleshooting Common Issues

**Permission Errors with Bundler**:
```bash
# Use user-install flag and update PATH
gem install --user-install bundler
export PATH="$PATH:/home/runner/.local/share/gem/ruby/3.2.0/bin"
```

**Build Warnings**:
- Liquid syntax warnings in github.md are known issues (lines 647, 732)
- Sass deprecation warnings are expected and don't affect functionality
- These warnings do not prevent successful builds

**Development Server Issues**:
- Always use `--host 0.0.0.0` for accessibility in containerized environments
- Default port is 4000, site available at `/docs/` path
- Server supports auto-regeneration for development

## Content Guidelines

This site follows specific documentation standards:

### Markdown Format
- Use Jekyll-compatible Markdown (kramdown)
- Include `{:toc}` for automatic table of contents
- Add proper YAML front matter to all pages
- Use appropriate heading hierarchy (H1, H2, H3)

### Code Examples
- Provide executable code examples
- Include Japanese comments in code blocks
- Use appropriate language identifiers for syntax highlighting
- Test all code examples before publishing

### Language and Style
- Primary language: Japanese
- Include English technical terms where appropriate
- Maintain consistent formatting across all documentation
- Use polite, professional tone

## Validation Scenarios

**ALWAYS** test these scenarios after making changes:

1. **Fresh Build Test**:
   ```bash
   cd docs
   rm -rf _site .jekyll-cache
   bundle exec jekyll build
   # Verify: No errors, _site directory created
   ```

2. **Development Server Test**:
   ```bash
   cd docs
   bundle exec jekyll serve --host 0.0.0.0 --port 4000 &
   curl -I http://localhost:4000/docs/
   # Verify: Returns HTTP/1.1 200 OK
   ```

3. **Content Rendering Test**:
   - Start development server
   - Open http://localhost:4000/docs/ in browser
   - Navigate to modified pages
   - Verify: TOC generates correctly, code blocks render, links work

4. **Build Performance Test**:
   ```bash
   cd docs
   time bundle exec jekyll build
   # Expected: Completes in under 1 second
   ```

5. **Complete End-to-End Documentation Test**:
   ```bash
   # Create test documentation
   cd docs
   echo '---
   layout: page
   title: "Test Documentation"
   ---
   
   # Test Documentation
   
   * 目次
   {:toc}
   
   ## Test Section
   
   This is a test documentation page.
   
   ```bash
   echo "test command"
   ```
   ' > test-doc.md
   
   # Build and serve
   bundle exec jekyll build
   bundle exec jekyll serve --host 0.0.0.0 --port 4000 &
   
   # Validate content
   curl -s http://localhost:4000/docs/test-doc.html | grep "Test Section"
   # Expected: Should find "Test Section" in output
   
   # Cleanup
   rm test-doc.md
   ```

## Critical Reminders

- **NEVER CANCEL** bundle install operations - they can take 60+ seconds
- **NEVER CANCEL** Jekyll builds - set timeouts to 30+ seconds minimum  
- **ALWAYS** test changes locally before committing
- **ALWAYS** verify the development server starts and pages load correctly
- **PATH configuration** is required for every new session
- **Work directory** is always `docs/` for Jekyll commands
- **No custom tests** exist - validation is manual through server testing

## Deployment

GitHub Pages automatically builds and deploys the site when changes are pushed to the main branch. No manual deployment steps are required.

The live site is available at: https://toshi0907.github.io/docs/