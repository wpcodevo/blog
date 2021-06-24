import { useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
const Swal = dynamic(() => import("sweetalert2"));

function CommentForm({ _id }) {
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);
    try {
      response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json",
      });
      console.log(response.status);
      setIsSubmitting(false);
      setHasSubmitted(true);

      if (response.statusCode === "200") {
        Swal.fire("Great Job!", "Thanks for Your Comment!", "success");
      }
    } catch (err) {
      setFormData(err);
    }
  };

  if (isSubmitting) {
    return <h3>Submitting comment…</h3>;
  }
  if (hasSubmitted) {
    return (
      <>
        <h3>Thanks for your comment!</h3>
        <ul>
          <li>
            Name: {formData.name} <br />
            Email: {formData.email} <br />
            Comment: {formData.comment}
          </li>
        </ul>
      </>
    );
  }

  return (
    <form className='commentForm' onSubmit={handleSubmit(onSubmit)} disabled>
      <h5>LEAVE A REPLY</h5>
      <input
        className={errors.name ? "danger" : ""}
        name='name'
        {...register("name", { required: true })}
        placeholder='Name*'
      />
      {errors.name && <span>Please enter your name here!</span>}

      <input
        className={errors.email ? "danger" : ""}
        name='email'
        type='email'
        {...register("email", { required: true })}
        placeholder='Email*'
      />
      {errors.email && <span>Please enter your email address here!</span>}

      <textarea
        className={errors.comment ? "danger" : ""}
        {...register("comment", { required: true })}
        name='comment'
        rows='8'
        placeholder='Comment:'
      ></textarea>
      {errors.comment && <span>Please enter your comment!</span>}

      <button type='submit' value='Post Comment'>
        Post Comment
      </button>
    </form>
  );
}

export default CommentForm;
