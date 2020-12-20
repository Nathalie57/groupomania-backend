import React, { useEffect, useState } from "react";
import CommentsAPI from "../../services/commentDatamanager";

const GetCountedLikes = ({ id }) => {
  const [likes, setLikes] = useState([]);

  const countLikesByComment = async () => {
    try {
      CommentsAPI.countLikes(id)
        .then((response) => response.data)
        .then((data) => setLikes(data));
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    countLikesByComment(id);
  }, [id]);

  console.log(likes);
  // console.log(likes[0]);
  const like = likes[0];

  return (
    <>
      <div>
        {/* {likes.map((like) => ( */}
          <div className="">
            <span className="likesCount">{}</span>
          </div>
         {/* ))}  */}
      </div>
    </>
  );
};

export default GetCountedLikes;
