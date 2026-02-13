# Contribution Guide

Thank you for your interest in contributing to the **@forgepack** project!

To ensure code quality and consistency, please follow the guidelines below.

## 1. Workflow

We use a **Simplified Gitflow** workflow:

1. **Fork** the repository.  
2. Create a new **branch** from `main` for your feature or fix:  
   ```bash
   git checkout -b feat/feature-name
   ```
3. Implement your changes.  
4. Make sure all **tests** pass and **code coverage** has not decreased.  
5. Follow the **Commit Convention** (see below).  
6. Open a **Pull Request (PR)** to the `main` branch.  

---

## 2. Code Standards

* **TypeScript:** Follow strict TypeScript practices and maintain type safety.  
* **React:** Follow React best practices and hooks guidelines.  
* **Code Style:** Use consistent formatting (Prettier/ESLint configuration).  
* **Tests:** Every new feature or bug fix must include relevant unit and/or integration tests.  
* **Documentation:** Update the `README.md` and API documentation for any public API changes.  

---

## 3. Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build the package
npm run build

# Type checking
npm run type-check
```

---

## 4. Commit Convention

We follow the **Conventional Commits** specification.  
The format should be:

```
<type>(<scope>): <description>
```

**Examples:**

* `feat(auth): add token refresh functionality`
* `fix(hooks): fix useRequest hook state management`
* `docs(api): update authentication examples`
* `test(crud): add tests for CRUD operations`

---

## 5. Code Review

Your Pull Request will be reviewed by one of the maintainers.  
Be prepared to receive feedback and make necessary adjustments.
