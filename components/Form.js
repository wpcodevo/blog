import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

function Form() {
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json",
      });
      setIsSubmitting(false);
      setHasSubmitted(true);

      if (response.status === 200) {
        swal.fire("Great Job!", "Thanks for Contacting Us!", "success");
      }

      if (response.status === 401) {
        swal.fire(
          "Oops!",
          "Sorry, our system has detected this email to be invalid",
          "error"
        );
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
    const inputs = [...document.querySelectorAll(".contactForm .field")];
    inputs.forEach((input) => (input.value = ""));
  };

  if (hasSubmitted) {
    resetFields();
  }

  return (
    <form
      className='commentForm contactForm'
      onSubmit={handleSubmit(onSubmit)}
      disabled
    >
      <h5>Contact Us</h5>

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
        className={`field ${errors.message ? "danger" : ""}`}
        {...register("message", { required: true })}
        name='message'
        rows='8'
        placeholder='Message:'
      ></textarea>
      {errors.message && <span>Please enter your message!</span>}

      <button type='submit' value='Send'>
        Send
      </button>
    </form>
  );
}

export default Form;
