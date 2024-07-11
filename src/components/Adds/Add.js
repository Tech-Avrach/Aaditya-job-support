import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import AddInformation from "./AddInformation";

import UserService from "../../redux/services/user.service";
toast.configure();

const Add = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [addDetail, setAddDetail] = useState({
    public_id: "550e8400-e29b-41d4-a716-446655440000",
    user_id: 1,
    game_name: "The Legend of Zelda: Breath of the Wild",
    platform: "Nintendo Switch",
    price: 59.99,
    description: "An open-world action-adventure game.",
    created_at: "2024-05-01 10:00:00",
  });

  useEffect(() => {
    if (!/\d+/.test(id)) {
      navigate(-1);
    }
  }, [id, navigate]);
  const getUser = (id) => {
    UserService.get(id)
      .then((response) => {
        setAddDetail(response.data.userInfo);
      })
      .catch((error) => {
        toast(error, {
          transition: Slide,

          closeButton: true,

          autoClose: 3000,

          position: "top-right",

          type: "error",
        });
      });
  };

  //   useEffect(() => {
  //     getUser(id);
  //   }, [id]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-magic-wand icon-gradient bg-plum-plate"
      pageHeading={"Add"}
      pageSubTitle={"View the add information"}
    >
      <AddInformation addDetail={addDetail} />
    </PageContainer>
  );
};

export default Add;
