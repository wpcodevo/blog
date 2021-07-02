import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "9999999",
  },
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "90%",
    height: "550px",
    overflow: "hidden",
    background: "white",
    border: "none",
  },
};

const NewsLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      response = await fetch("/api/newsletter", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json",
      });
      setIsSubmitting(false);
      setHasSubmitted(true);

      if (response.status === 201) {
        swal.fire(
          "Great Job!",
          "Thanks for Subscribing to our Newsletter",
          "success"
        );
        setIsOpen(false);
      }
    } catch (err) {
      setFormData(err);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const modal = setTimeout(() => {
      openModal();
    }, 10000);

    return () => clearTimeout(modal);
  }, []);

  const resetFields = () => {
    const inputs = [...document.querySelectorAll(".contactForm .field")];
    inputs.forEach((input) => (input.value = ""));
  };

  if (hasSubmitted) {
    resetFields();
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className='popup' style={{ display: "table" }}>
          <div className='close' onClick={closeModal}>
            <AiOutlineClose size='20px' />
          </div>
          <div className='popup-left'>
            <div className='img-container'>
              <Image
                src='/images/popup.jpg'
                width='600'
                height='450'
                alt='newletter image'
                placeholder='blur'
                blurDataURL='LGFFaXYk^6#M@-5c,1J5@[or[Q6.'
              />
            </div>
          </div>
          <div className='popup-right'>
            <h2>JOIN OUR NEWSLETTER</h2>
            <p>
              Big news! I'm writing a book about React called: The Complete
              Guide to React. If you enter your email below I'll send you a full
              chapter for free.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} disabled>
              <input
                autocomplete='off'
                className={`field ${errors.email ? "danger" : ""}`}
                name='email'
                type='email'
                {...register("email", { required: true })}
                placeholder='Enter your email'
              />

              <span className={errors.email ? "show" : ""}>
                Please enter your email address here!
              </span>

              <button type='submit' value='Send Me a Free Chapter'>
                {isSubmitting ? "loading..." : "Send Me a Free Chapter"}
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NewsLetter;
