// Home.jsx
import React, { useContext, useEffect } from "react";
import { TicketContext } from "../context/TicketContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Banner } from "../components/banner/Banner";
import ApiLogin from "../api/login/Login";
import { apiConexion } from "../enviroment";
import { loadToken } from "../redux/reducer/TokenReducer";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  ApiLogin.Login(apiConexion().user, apiConexion().pass).then((r) => {
    if (r.Success) {
      dispatch(loadToken({ token: r.Data }));
    }
  });

  return (
    <Row className="m-4">
      <Col>
        <Banner />
      </Col>
    </Row>
  );
};

export default Home;
