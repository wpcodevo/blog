import { getCategories } from "lib/api";
import Link from "next/link";
import { useState, useEffect } from "react";

const AsideCateogories = () => {
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    const res = await getCategories();
    setCategories(res);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='widget categories'>
      <h4 style={{ padding: "15px 0" }}>Categories</h4>
      {categories.map((category, index) => (
        <div key={`${index}-list`}>
          <Link href='/[category]' as={`/${category.slug}`}>
            <a>{category.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AsideCateogories;
