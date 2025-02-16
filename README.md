# Product Management App

A responsive and user-friendly product management application built using **Vite**, **React**, **Redux Toolkit**, and **React Router**. This app provides features for product management with dynamic pagination, filtering, sorting, and state persistence.


> **Live Demo**: [View on GitHub Pages](https://danfeldman89.github.io/nimble-task)

---

## Features

### 1. Dynamic Pagination
- Automatically handles edge cases like when products are deleted, ensuring no empty pages remain.
- For example, if the last item on a page is removed, the app seamlessly redirects to the previous valid page.
- Pagination stays fully synchronized with filtering and sorting, showing only the relevant products for the applied filters and criteria.

### 2. Filtering and Sorting
- **Filtering**:
    - Allows users to search for products by name or description through a quick and intuitive search box.
    - Filtering dynamically updates the product list as you type with a debounced input, ensuring a real-time experience.
    - The filter state is reflected in the URL, making it easier to share or revisit filtered views.

- **Sorting**:
    - Enables users to sort products by **price** and **creation date**, both in ascending and descending orders.
    - Sorting happens in real time and accurately reflects changes on the list.
    - Sort criteria are also stored in the URL (e.g., `?sort=price-ascending`), ensuring consistency across sessions and easy sharing.

- **Deleting Products**:
    - Users can safely delete products, and the app takes care of maintaining the integrity of the pagination to ensure valid navigation.
    - The app handles the removal of items efficiently while keeping the display updated and accurate.

### 4. Persistent State Management
- Data is **persistently stored in localStorage**, ensuring product information and app state remain available even after the page is refreshed or the browser is closed.
- On first load, the app falls back to a default dataset if no prior data is found in localStorage.
- The persistent storage mechanism ensures a smooth and reliable user experience while still remaining lightweight.

### 5. URL State Management
- The app uses the URL to store filter and sorting states (e.g., `?search=term&sort=price-desc`), allowing for:
    - Seamless refresh behavior.
    - Easy sharing of specific filtered/sorted product views with others.
    - Persistent and predictable behavior across sessions.

---

## Working with Product Data in JSON Format

### Adding a File Containing Product Data

The app supports loading product data from a JSON file. Ensure the data follows the `Product` model. A file should contain an array of products with the following structure:

#### Product Model

```typescript
{
  id: number;
  name: string;
  description: string;
  price: number;
  created: string;
  imageUrl: string;
}
```

#### Example JSON Data

Here’s an example of a JSON file containing 3 products:

```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "A high-performance laptop suited for all your needs.",
    "price": 1299.99,
    "created": "2023-10-18T12:00:00.000Z",
    "imageUrl": "src/assets/laptop.png"
  },
  {
    "id": 2,
    "name": "Smartphone",
    "description": "A sleek smartphone with the latest features.",
    "price": 799.99,
    "created": "2023-10-20T14:30:00.000Z",
    "imageUrl": "src/assets/smartphone.png"
  },
  {
    "id": 3,
    "name": "Headphones",
    "description": "Noise-cancelling over-ear headphones.",
    "price": 199.99,
    "created": "2023-10-21T09:15:00.000Z",
    "imageUrl": "src/assets/headphones.png"
  }
]
```

Under /src/data there are 2 JSON files correctly formatted which, once downloaded locally, can be opened via the application to update the displayed items.


## Installation and Setup

### Prerequisites
Before running the app, ensure you have the following installed:
- **Node.js** (latest stable version recommended)
- **npm** (comes preinstalled with Node.js)

### Steps to Run the App

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the development server:**
   ```
   npm run dev
   ```
   The app will be accessible at `http://localhost:5173`.


4. **Build for production:**
   ```
   npm run build
   ```
   This command creates an optimized production build in the `dist` folder.


5. **Preview the production build locally:**
   ```
   npm run preview
   ```

   Use this command to test how your production build would behave in a real-world environment.

---
