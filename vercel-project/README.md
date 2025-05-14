# Frontend Intern Take-Home Test: Interactive Product Card

This project implements an interactive Product Card component in React with TypeScript, Next.js, and Tailwind CSS. It fetches product data, manages cart and favorite states, and supports a light/dark mode toggle.

**Live Demo (Example - You'll need to deploy it yourself):**
[Link to your deployed Netlify/GitHub Pages site]

## Features

* **API Integration (TanStack Query):**
    * Fetches product data from `https://fakestoreapi.com/products`.
    * Displays loading states while fetching.
    * Handles and displays errors if the API request fails.
    * Renders product details: Image, Title, Price, Description.
* **State Management:**
    * **Cart Functionality (Zustand):**
        * "Add to Cart" button.
        * Quantity selector (+/- buttons, minimum 1) appears after adding to cart.
        * Cart count and total price displayed in a summary.
        * Cart state (items, quantities) persists across re-renders.
    * **Favorites:**
        * Heart icon to toggle favorite status for each product.
        * Favorite status is persisted in `localStorage`.
* **Light/Dark Mode Toggle:**
    * Theme switcher (🌞/🌙 icons) to toggle between light and dark modes.
    * Uses Tailwind CSS `dark:` prefix for styling.
    * User's theme preference is persisted in `localStorage`.
* **Responsive Design:**
    * The layout is responsive and works on mobile and desktop screens, utilizing Tailwind CSS's utility classes.
* **Code Structure (MVC-like Approach):**
    * **Models:** TypeScript interfaces for API data (`models/Product.ts`).
    * **Views:** React components for presentation (`components/`, `pages/index.tsx`).
    * **Controllers/Hooks:** Custom hooks and Zustand stores for business logic and state management (`hooks/`).

## Tech Stack

* **React** (with Next.js 13+ Pages Router)
* **TypeScript**
* **Tailwind CSS**
* **TanStack Query (React Query v4/v5)** for data fetching and caching.
* **Zustand** for global state management (cart, theme).
* **Lucide React** for icons.
* **localStorage** for persisting favorites and theme preference.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-url]
    cd [your-repo-name]
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Code Structure Explanation

* **`components/`**: Contains reusable UI components.
    * `ProductCard.tsx`: Displays individual product information and actions.
    * `CartDisplay.tsx`: Shows a summary of the cart.
    * `ThemeSwitcher.tsx`: Allows users to toggle between light and dark themes.
    * `QuantitySelector.tsx`: +/- buttons for cart item quantity.
* **`hooks/`**: Contains custom React hooks and Zustand stores for managing logic and state.
    * `useCartStore.ts`: Zustand store for cart state (items, add, increment, decrement).
    * `useThemeStore.ts`: Zustand store for theme state (current theme, toggle).
    * `useFavorites.ts`: Custom hook to manage favorite status for a product using `localStorage`.
* **`models/`**: Defines TypeScript interfaces for data structures.
    * `Product.ts`: Interface for the product data fetched from the API.
* **`pages/`**: Next.js pages.
    * `_app.tsx`: Custom App component to initialize global providers (TanStack Query, theme).
    * `index.tsx`: Main page displaying the product list, cart summary, and theme switcher.
* **`public/`**: Static assets.
* **`styles/`**: Global styles and Tailwind CSS configuration.
* **`tailwind.config.js`**: Tailwind CSS configuration, including `darkMode: 'class'`.

## Challenges Faced

* **Theme Persistence and Initial Load:** Ensuring the theme (especially dark mode) is applied correctly on the initial page load without a flicker required careful handling of `localStorage` and synchronization with the React state (Zustand). Using `useEffect` in `_app.tsx` and `ThemeSwitcher.tsx` with a `mounted` state helps manage this. The `onRehydrateStorage` callback in Zustand's persist middleware is also key.
* **State Management Choice:** Decided to use Zustand for its simplicity and minimal boilerplate compared to Redux for this scale of application, while still meeting the "any other state management" requirement.
* **SSR and `localStorage`:** Accessing `localStorage` needs to be done on the client-side. This means using `useEffect` or checking for `typeof window !== 'undefined'` before accessing it. For theme initialization, this meant ensuring the `<html>` tag gets the `dark` class correctly after hydration.
* **Responsive Design Details:** Ensuring every element (text truncation, image fitting, grid layout) behaved well across different screen sizes required iterative testing with Tailwind's responsive prefixes.

## Trade-offs Made

* **Zustand vs. Redux:** Chose Zustand for simplicity. For a larger application with more complex state interactions or middleware needs, Redux might have been a more robust choice, but Zustand is more than sufficient here and faster to implement.
* **Error Handling Granularity:** Basic error handling for the API request is implemented. More sophisticated error reporting (e.g., to an external service) or user-facing error types were omitted for brevity.
* **Accessibility (Aria Labels):** Added basic aria-labels for interactive elements. More comprehensive ARIA attributes and accessibility testing would be needed for a production application.
* **Styling Details:** Focused on functional styling with Tailwind CSS. Advanced custom styling or animations (beyond basic transitions) were not prioritized to meet the core requirements within the timeframe.
* **Cart Persistence:** The requirement was for "cart count must persist across re-renders". This is achieved by component state or a global state manager like Zustand. While Zustand *can* persist to `localStorage` (commented out in `useCartStore.ts`), it wasn't explicitly required for the cart items themselves, only for favorites and theme. Persisting the full cart could be a useful addition.

## Bonus Points (Future Considerations)

* **Unit Tests (Jest/Vitest):** Implement unit tests for hooks (e.g., `useCartStore` logic, `useFavorites`) and potentially component snapshot tests.
* **Animations:** Add subtle animations for adding to cart (e.g., a small notification popup, item flying to cart icon) or theme transitions.
* **Deployment:** The project is ready to be deployed on platforms like Netlify or Vercel.
* **Advanced Filtering/Sorting:** For a larger product set, adding filtering by category or sorting by price would enhance usability.
* **Debouncing Quantity Changes:** For quantity selectors, debouncing updates to the store could be beneficial if these triggered API calls (not the case here).


How to Run and Preview:
Follow the Project Setup instructions at the beginning of this response to create your Next.js app and install dependencies.
Create the directories (components, hooks, models) inside your project.
Copy and paste the code for each file into its respective location in your project.
Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to http://localhost:3000.
Expected UI and Behavior:
Header:
A title "Product Showcase".
A Theme Switcher icon (Moon/Sun) on the right. Clicking it will toggle the theme, and the choice will be saved in localStorage and applied on subsequent visits.
Cart Display:
A section showing "Cart Summary".
Initially, it will say "Your cart is empty."
As you add items, they will appear listed with their title, quantity, and subtotal.
It will show the "Total Items" and "Total Price".
Product Listing:
A loading message ("Loading products...") will appear while fetching data.
If an error occurs, an error message will be displayed.
Once loaded, products will be displayed in a responsive grid (e.g., 1 column on small screens, 2-4 on larger screens).
Each Product Card:
Image: The product image.
Favorite Icon (Heart):
Located at the top-right of the image.
Clicking it toggles the favorite status (red filled heart for favorite, outlined for not).
This status is saved in localStorage and persists per product.
Title: The product title (truncated if too long, full title on hover).
Description: A short product description (scrollable if it overflows).
Price: The product price.
"Add to Cart" Button:
Initially visible. Clicking it adds the product to the cart (quantity 1) and increments the global cart counter.
The button will then be replaced by a QuantitySelector.
Quantity Selector:
Appears after a product is added to the cart.
Shows -/+ buttons and the current quantity for that product in the cart.
Minimum quantity is 1.
Changes are reflected in the CartDisplay.
Responsiveness: The layout should adapt to different screen sizes (try resizing your browser).
Dark Mode:
When dark mode is active, the background will be dark gray, text will be light, and component colors will adjust accordingly using Tailwind's dark: variants.
The <html> tag will have the dark class.
Footer:
A simple footer with a copyright notice.
This comprehensive set of files and instructions should allow you to build and run the project as described in the take-home test. Remember to test thoroughly!
Sources
1. https://github.com/ArzunDhz/e-com-test
2. https://github.com/naviava/hot-tiffin-app
3. https://blog.jim-nielsen.com/feed
4. https://stackoverflow.com/questions/78183552/useeffect-doesnt-listen-localstorage-due-to-react-query
5. https://github.com/manhnth/e-commerce
6. https://github.com/aditya-wiguna/next-example-ecommerce
7. https://echobind.com/post/getting-started-with-nextjs-graphl-and-react-query
8. https://github.com/ivishalgautam/olp-dashboard
9. https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/
10. https://github.com/Mateusbrbza/encantali-site
11. https://github.com/ADongol123/test
12. https://github.com/thusalapi/Social-Media-app-for-rootcode
13. https://github.com/Amirtha2005/CustomizedGift
14. https://github.com/SarwarSarker/react-redux-ecommerce-with-firebase-auth
15. https://github.com/goidescugeorgiana/cc.next
16. https://github.com/khanhduyvt0101/khanhdu-portfolio
17. https://github.com/Abderraouf-Rahmani/1001devs-client
