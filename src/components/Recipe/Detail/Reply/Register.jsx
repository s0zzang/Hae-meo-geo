import useCustomAxios from "@hooks/useCustomAxios.mjs";
import useUserStore from "@zustand/userStore.mjs";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import uploadImage from "@utils/uploadImage.mjs";
import ReplyStyle from "./Reply.module.css";
import styles from "./Register.module.css";
import { useState } from "react";

function ReplyRegister({ rcpName, rcpNum, setRepliesFn }) {
  const { replyRegister, attachWr, preview, noLogin } = styles;
  const { user } = useUserStore();
  const [rating, setRating] = useState();
  const axios = useCustomAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      formData = {
        ...formData,
        type: "qna",
        product_id: rcpNum,
        title: `${rcpName} 후기`,
        extra: {
          rating: formData.rating,
        },
      };

      if (formData.image?.length) {
        formData.extra.image = await uploadImage(formData);
        delete formData.image;
      } else {
        delete formData?.image;
      }

      const { data } = await axios.post("/posts", formData);
      const resPost = await axios.get(
        `/posts?type=qna&custom={"product_id": ${rcpNum}}`
      );
      setRepliesFn(resPost.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRatingClick = (e) => {
    console.log(e);
    if (!e.target.tagName === "INPUT") return;
    console.log(e.target, e.target.value);
    setRating(e.target.value);
  };

  return (
    <div className={replyRegister}>
      {user ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={ReplyStyle.replyWr}>
            <img
              className={ReplyStyle.profile}
              src={user.profile}
              alt={user.name}
            />
            <div>
              <div className={ReplyStyle.flexWr}>
                <p className={ReplyStyle.name}>{user.name}</p>
                <div
                  className={`${ReplyStyle.ratingWr} ${
                    ReplyStyle[`n${rating}`]
                  }`}
                  onClick={handleRatingClick}
                >
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="1"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="2"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="3"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="4"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value="5"
                      {...register("rating", {
                        required: "별점을 등록하세요",
                      })}
                    />
                  </label>
                  {errors && <div>{errors.rating?.message}</div>}
                </div>
              </div>
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                {...register("content", {
                  required: "내용을 입력하세요.",
                  minLength: {
                    value: 5,
                    message: "5자 이상 입력해주세요.",
                  },
                })}
              ></textarea>
              {errors && <div>{errors.content?.message}</div>}
            </div>
            <div className={ReplyStyle.attachWr}>
              <label htmlFor="image" className={preview}>
                <img src="" alt="" />
                <span className="hidden">첨부파일 선택</span>
              </label>
              <button>
                <span className="hidden">첨부파일 삭제</span>
              </button>
              <input
                type="file"
                accept="image/*"
                id="image"
                placeholder="이미지를 선택하세요"
                {...register("image")}
              />
            </div>
          </div>
          <button>등록하기</button>
        </form>
      ) : (
        <p className={noLogin}>
          <Link to="/user/login">로그인</Link>하여 후기를 작성해보세요!
        </p>
      )}
    </div>
  );
}

export default ReplyRegister;
