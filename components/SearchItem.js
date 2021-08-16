import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const SearchItem = ({ value }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ search: "" });
  const [showLoader, setShowLoader] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { search: value } });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const query = data.search.replace(/ /g, "+");
    setFormData({ search: query });
    setShowLoader(true);
    router.push(`/search?q=${query}`);
  };

  if (router.query.q.replace(/ /g, "+") === `${formData.search}`) {
    setTimeout(() => {
      setShowLoader(false);
    }, 1000);
  }

  return (
    <>
      <form className='searchItem' onSubmit={handleSubmit(onSubmit)} disabled>
        <div>
          <input
            className={`field ${errors.search ? "danger" : ""}`}
            name='search'
            defaultValue={value}
            placeholder='Search Wpcodevo'
            {...register("search", { required: true })}
            autoComplete='off'
          />
          <button type='submit'>
            <BiSearch size={24} />
          </button>
        </div>
      </form>
      {showLoader && (
        <div className='search-spinner'>
          <Spinner animation='grow' variant='success' />
        </div>
      )}
    </>
  );
};

export default SearchItem;
