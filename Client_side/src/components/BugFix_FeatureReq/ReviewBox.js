/* 
  Page        - DescripBox.js page
  Function    - Description component for bug fix page, feature request
  Parameter   - @param {*} props
  Author      - Sajani Sihara, Ridmi Amasha
*/

import React, { useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
function ReviewBox(props) {
  const [modalShow, setModalShow] = useState(false);
  const item = props.item;
  return (
    <div >
      <div className="row m-1">
        <div className="col">
          <div className="container ml-5 pb-3 mb-3 border-bottom border-secondary">
            <div className="row">
              <div className="col-10">
                <h3>{item.userName}</h3>
              </div>
              <div className="col">
                <p style={{ fontSize: "1.3rem" }} className="mr-3">
                  {item.rating}
                  <FontAwesomeIcon icon={faStar} style={{ width: "2vw" }} />
                </p>
              </div>
            </div>
            <div className="row m-1">
              <p className="mb-4" style={{ fontSize: "1.3rem", width: "75%", textAlign: "justify" }}>
                {item.partialReview}
              </p>
            </div>
            <div className="row">
              <div className="col-9">
                {" "}
                <p className="pt-2" style={{ fontSize: "1.3rem" }}>
                  <Moment format="YYYY/MM/DD">{item.date}</Moment>
                </p>
              </div>
              <div className="col">
                <Button
                  variant="secondary"
                  id="DescripBtn"
                  className={"mx-2 DescripBtn"}
                  onClick={() => setModalShow(true)}
                >
                  View Full Review
                </Button>
                <MyVerticallyCenteredModal
                  items={item}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MyVerticallyCenteredModal(props) {

  const { items } = props;

  if (items && items.userName) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h3>{items.userName}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-10">
              {" "}
              <p style={{ fontSize: "1.3rem" }}><Moment format="YYYY/MM/DD">{items.date}</Moment> </p>
            </div>
            <div className="col">
              <p style={{ fontSize: "1.3rem" }} className="mr-3">
                {items.rating}
                <FontAwesomeIcon icon={faStar} style={{ width: "2vw" }} />
              </p>
            </div>
          </div>

          <p style={{ fontSize: "1.3rem" }}>App version - {items && items.version ? items.version : "Unknown"} </p>
          <p style={{ fontSize: "1.3rem", textAlign:"justify" }}>
            {items.text}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return null;
  }
}

export default ReviewBox;
