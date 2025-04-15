import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void; // Says what type of value we are going to recieve and it won't return anything
}) {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      // This gets all category types from the api
      try {
        const response = await fetch(
          'https://mission13backend-cbaseddsf6g3bkdc.westus2-01.azurewebsites.net/api/Book/GetCategories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories(); // Gets all categories
  }, []);
  // Function to use in this component to do stuff when a box is checked
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategory = selectedCategories.includes(target.value) // set if checked box is in list
      ? selectedCategories.filter((x) => x !== target.value) // if it is in the list, filter out anything not equal to the target value
      : [...selectedCategories, target.value]; // If it is not already in the list, add it
    // Update selected categories in parent
    setSelectedCategories(updatedCategory);
  }
  return (
    <>
      <div className="category-filter">
        <h5>Project Types:</h5>
        <div className="category-list">
          {categories.map((c) => (
            <div key={c} className="category-item">
              <input
                type="checkbox"
                id={c}
                value={c}
                className="category-checkbox"
                onChange={handleCheckboxChange}
              />
              {/* Each checkbox will get this function*/}
              <label htmlFor={c}>{c}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoryFilter;
