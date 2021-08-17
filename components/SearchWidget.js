import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";

const SearchWidget = ({ openSearch, setOpenSearch }) => {
  const [formData, setFormData] = useState({ fullsearch: "" });
  const [showLoader, setShowLoader] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const query = data.fullsearch.replace(/ /g, "+");
    setFormData({ fullsearch: query });
    setShowLoader(true);
    router.push(`/search?q=${query}`);
  };

  if (router.query.q?.replace(/ /g, "+") === `${formData.fullsearch}`) {
    setTimeout(() => {
      setShowLoader(false);
      setOpenSearch(false);
      setHasSubmitted(true);
      setFormData({ fullsearch: "" });
      reset({ fullsearch: "" });
    }, 1000);
  }

  const resetFields = () => {
    const input = document.querySelector(".fullscreen .searchform .field");
    input.value = "";
  };

  if (hasSubmitted) {
    resetFields();
  }

  return (
    <div className={`fullscreen ${openSearch ? "open" : ""}`}>
      <div className='close' onClick={() => setOpenSearch(false)}>
        <AiOutlineClose size={27} />
      </div>
      <form className='searchform' onSubmit={handleSubmit(onSubmit)} disabled>
        <input
          autoFocus
          className={`field ${errors.fullsearch ? "danger" : ""}`}
          type='fullsearch'
          name='fullsearch'
          {...register("fullsearch", { required: true })}
          autoComplete='off'
          placeholder='Search Wpcodevo...'
        />
        <input type='submit' value='Search' className='search-submit' />
      </form>
      {showLoader && (
        <div className='spinner'>
          <Spinner animation='border' variant='success' />
        </div>
      )}
    </div>
  );
};

export default SearchWidget;
