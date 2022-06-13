import React from "react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Modal, Button } from "react-bootstrap";

import Profile from "./profile";

const VerticallyCenteredModal = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal Heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Body</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const Dashboard = (props) => {
  const { isInitialized, user } = useMoralis();

  const [show, setShow] = useState(false);

  const _isAuthenticated = props.isAuthenticated;
  let navigate = useNavigate();

  useEffect(() => {
    if (isInitialized) {
      if (!_isAuthenticated) {
        navigate("/");
      }

      if (!user.getEmail()) {
        setShow(true);
      }
      console.log(user.getEmail());
    }
  }, [_isAuthenticated, user]);

  return (
    <div>
      <p>This is the Dashboard</p>
      <Button onClick={() => setShow(true)}>Show Modal</Button>
      <VerticallyCenteredModal show={show} onHide={() => setShow(false)} />
    </div>
  );
};

export default Dashboard;
