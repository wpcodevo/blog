import { useState } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

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
      setIsSubmitting(false);
      setHasSubmitted(true);

      if (response.status === 200) {
        swal.fire("Great Job!", "Thanks for Your Comment!", "success");
      }
    } catch (err) {
      setFormData(err);
    }
  };

  if (isSubmitting) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spinner animation='border' variant='danger' />
      </div>
    );
  }

  const resetFields = () => {
    const inputs = [...document.querySelectorAll(".commentForm .field")];
    inputs.forEach((input) => (input.value = ""));
  };

  if (hasSubmitted) {
    resetFields();
  }

  return (
    <form className='commentForm' onSubmit={handleSubmit(onSubmit)} disabled>
      <h5>LEAVE A REPLY</h5>
      <input
        {...register("_id", {
          required: true,
        })}
        type='hidden'
        name='_id'
        value={_id}
      />
      <input
        autoComplete='off'
        className={`field ${errors.name ? "danger" : ""}`}
        name='name'
        {...register("name", { required: true })}
        placeholder='Name*'
      />
      {errors.name && <span>Please enter your name here!</span>}

      <input
        autoComplete='off'
        className={`field ${errors.email ? "danger" : ""}`}
        name='email'
        type='email'
        {...register("email", { required: true })}
        placeholder='Email*'
      />
      {errors.email && <span>Please enter your email address here!</span>}

      <textarea
        className={`field ${errors.comment ? "danger" : ""}`}
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
