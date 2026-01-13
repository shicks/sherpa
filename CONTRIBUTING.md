# Contributing to Sherpa

Thank you for your interest in contributing to Sherpa! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the Repository**
   - Fork the repository on GitHub
   - Clone your fork locally

2. **Set Up Development Environment**
   - Install Google Chrome
   - Load the extension in developer mode (see TESTING.md)

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Comment complex logic

2. **Test Your Changes**
   - Follow the testing guide in TESTING.md
   - Test on actual Trail Life Connect pages if possible
   - Verify no console errors

3. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a pull request on GitHub

## Code Style Guidelines

### JavaScript
- Use clear, descriptive variable names
- Use `const` and `let` instead of `var`
- Add JSDoc comments for functions
- Keep functions focused and small
- Use async/await for asynchronous code

### CSS
- Use clear class names with `sherpa-` prefix
- Group related styles together
- Comment sections for clarity
- Use consistent spacing (2 spaces for indentation)

### HTML
- Use semantic HTML elements
- Include ARIA attributes for accessibility
- Keep structure clean and organized

## Adding New Features

### Adding a New Action

1. **Add Button in Popup (popup.js)**
   ```javascript
   if (url.includes('/your-page')) {
     buttons.push({
       label: 'Your Action',
       action: 'yourAction'
     });
   }
   ```

2. **Add Button in Content Script (content.js)**
   ```javascript
   function addYourPageButtons() {
     const container = findOrCreateButtonContainer('your-page');
     if (container) {
       const yourButton = createButton('Your Action', () => {
         handleAction('yourAction');
       });
       container.appendChild(yourButton);
     }
   }
   ```

3. **Implement Action Handler (content.js)**
   ```javascript
   function yourAction() {
     // Implement your action logic here
     console.log('Executing your action');
     
     // Example: Extract data from page
     const data = document.querySelectorAll('.your-selector');
     
     // Example: Manipulate the page
     data.forEach(item => {
       // Do something with each item
     });
     
     // Provide user feedback
     alert('Action completed successfully!');
   }
   ```

4. **Update Switch Statement**
   ```javascript
   case 'yourAction':
     yourAction();
     break;
   ```

### Adding New Page Support

1. Update `manifest.json` if needed (usually not necessary)
2. Add detection logic in content.js `addButtonsToPage()`
3. Create page-specific button function
4. Add corresponding buttons in popup.js

## Testing Requirements

Before submitting a pull request:

- [ ] Extension loads without errors
- [ ] All existing functionality still works
- [ ] New features work as expected
- [ ] No console errors or warnings
- [ ] Tested on Chrome
- [ ] Code is commented appropriately

## Debugging Tips

### Chrome DevTools
- Use `console.log()` for debugging
- Set breakpoints in Sources tab
- Use `debugger;` statement to pause execution

### Common Issues
- **Content script not loading**: Check manifest.json matches array
- **Popup not working**: Inspect popup (right-click icon)
- **Background script issues**: Check service worker in extensions page

## Documentation

When adding new features:
- Update README.md if user-facing
- Update TESTING.md with test cases
- Add JSDoc comments to functions
- Include inline comments for complex logic

## Commit Message Guidelines

Use clear, descriptive commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: Add export roster functionality
fix: Floating button position on mobile
docs: Update installation instructions
refactor: Simplify button creation logic
```

## Pull Request Guidelines

### Title
- Clear and descriptive
- Reference issue number if applicable

### Description
- Explain what changes were made
- Explain why the changes were necessary
- List any breaking changes
- Include screenshots for UI changes

### Checklist
- [ ] Code follows project style guidelines
- [ ] Changes have been tested
- [ ] Documentation has been updated
- [ ] No new warnings or errors
- [ ] Commit messages are clear

## Code Review Process

1. Maintainers review pull requests
2. Feedback provided via comments
3. Make requested changes
4. Once approved, PR will be merged

## Questions?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Tag maintainers if urgent

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

Thank you for contributing to Sherpa! 🎒
