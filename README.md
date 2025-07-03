## Design Decisions

Below are some key design decisions I made while working on this React/Next.js TypeScript application:

- **Recommended Packages**  
  I used widely recommended packages, These packages often encourage certain project structures and coding patterns, which I found helpful for keeping the project organized

- **Sorting and Filtering**  
  One important decision was whether to handle sorting and filtering on the frontend or backend. Each option has trade-offs, but since I was advised to handle this on the frontend, I focused on optimizing client-side operations instead
- **`<TableHeader>` Variants**  
  The `<TableHeader>` component in the app has three distinct variants with different markup requirements. Although they share similar props, I decided to split them into three separate subcomponents. I felt that combining them into a single component would have resulted in too much conditional logic, which could make the code harder to read and maintain.

- **Modal Logic for Create/Update**  
  For the modal, I combined the logic for both creation and updating since they share almost identical behavior. However, I broke it down into smaller, reusable parts, such as separate `Title` and `Form` components, to keep each piece focused and maintainable.

- **Performance Optimizations**  
  I made sure to memoize the `<Table>` component and its props. This prevents unnecessary re-renders of one of the largest components on the page whenever the user opens or closes the modal.

- **Component Folder Structure**  
  For larger components, I often use a folder structure like:
  ComponentName/
    hooks/
    components/
    ComponentName.tsx
  This helps keep custom hooks, subcomponents, and the main component close to each other, making the codebase easier to read and maintain.

- **No SSR for the Table**
  I chose not to use Server-Side Rendering (SSR) for the table because it contains personal information about our users, and this page is also the main entry point of the app. Every time the page loads, a large amount of data would have to be fetched and rendered on the server. To avoid unnecessary server load and to improve perceived performance, I decided to handle this process entirely on the client side instead. This separation makes the page load feel faster and keeps sensitive data handling more controlled.

  ## Possible Improvements

Here are a few improvements I’ve identified for the project:

- **Virtualize the Table**  
  Implementing table virtualization would allow the app to handle much larger data sets efficiently by rendering only the visible rows, which would significantly improve performance.

- **Optimistic Updates**  
  Using optimistic updates with `useQuery` would make the app feel more responsive by immediately reflecting changes in the UI before the server confirms them.

- **Delete Confirmation Modal**  
  Adding a confirmation modal like *“Are you sure you want to delete this patient?”* would help prevent accidental deletions and improve the user experience.

# Pet Clinic

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/patients](http://localhost:3000/api/pateints). This endpoint can be edited in `pages/api/pateints.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
