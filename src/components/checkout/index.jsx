import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
const cardValidator = require("card-validator");
import "./style.scss";

const validationSchema = Yup.object().shape({
  delivery_details: Yup.object().shape({
    full_name: Yup.string().required("Required"),
    street_name: Yup.string().required("Required"),
    house_number: Yup.string().required("Required"),
    postal_code: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    phone_number: Yup.string().required("Required")
  }),
  card_details: Yup.object().shape({
    card_number: Yup.string().required("Required"),
    expiry_month: Yup.string().max(2).required("Required"),
    expiry_year: Yup.string().max(2).required("Required"),
    cvv: Yup.string().required("Required")
  })
});

function ErrorMessage({ name, errors, touched }) {
  const objectKey = name.split(".");
  return (
    <>
      {errors[objectKey[0]] &&
      touched[objectKey[0]] &&
      errors[objectKey[0]][objectKey[1]] &&
      touched[objectKey[0]][objectKey[1]] ? (
        <p className="form-error">{errors[objectKey[0]][objectKey[1]]}</p>
      ) : null}
    </>
  );
}

export default function Checkout({ onHide, onOrder }) {
  const [cardType, setCardType] = useState(null);
  const validateCardNumber = value => {
    const number = cardValidator.number(value);
    let error;
    if (!value) {
      setCardType(null);
    }
    if (number.card) {
      setCardType(number.card.type);
    }
    if (!number.isValid) {
      error = "Invalid card number";
    }
    return error;
  };
  const validateExpiryMonth = value => {
    let error;
    if (!cardValidator.expirationMonth(value).isValid) {
      error = "Invalid";
    }
    return error;
  };
  const validateExpiryYear = value => {
    let error;
    if (!cardValidator.expirationYear(value).isValid) {
      error = "Invalid";
    }
    return error;
  };
  const validateCvv = value => {
    let error;
    if (!cardValidator.cvv(value).isValid) {
      error = "Invalid cvv";
    }
    return error;
  };
  return (
    <div className="flex items-center justify-center modal">
      <div className="modal-box br-8">
        <div className="flex items-center justify-between modal-header">
          <h1 className="modal-box-title">Checkout</h1>
          <p onClick={onHide}>exit</p>
        </div>
        <Formik
          initialValues={{
            delivery_details: {
              full_name: "",
              street_name: "",
              house_number: "",
              postal_code: "",
              city: "",
              phone_number: ""
            },
            card_details: {
              card_number: "",
              expiry_month: "",
              expiry_year: "",
              cvv: ""
            }
          }}
          validationSchema={validationSchema}
          onSubmit={values => onOrder(values)}
        >
          {props => (
            <Form>
              <p className="p-label">DELIVERY INFORMATION</p>
              <div className="form-group mb-45">
                <div className="form-items flex justify-between">
                  <div className="w-49">
                    <Field name="delivery_details.full_name" placeholder="Full name" />
                    <ErrorMessage name="delivery_details.full_name" {...props} />
                  </div>
                  <div className="w-49">
                    <Field name="delivery_details.street_name" placeholder="Street name" />
                    <ErrorMessage name="delivery_details.street_name" {...props} />
                  </div>
                </div>
                <div className="form-items flex justify-between">
                  <div className="w-49">
                    <Field name="delivery_details.house_number" placeholder="House number" />
                    <ErrorMessage name="delivery_details.house_number" {...props} />
                  </div>
                  <div className="w-49">
                    <Field name="delivery_details.postal_code" placeholder="Postal code" />
                    <ErrorMessage name="postal_code" {...props} />
                  </div>
                </div>
                <div className="form-items flex justify-between">
                  <div className="w-49">
                    <Field name="delivery_details.city" placeholder="City" />
                    <ErrorMessage name="delivery_details.city" {...props} />
                  </div>
                  <div className="w-49">
                    <Field name="delivery_details.phone_number" placeholder="Phone number" />
                    <ErrorMessage name="delivery_details.phone_number" {...props} />
                  </div>
                </div>
              </div>
              <p className="p-label">CARD DETAILS</p>
              <div className="form-group mb-45">
                <div className="form-items">
                  {cardType ? (
                    <span className="card-type flex items-center justify-center br-8">
                      <p>{cardType}</p>
                    </span>
                  ) : null}
                  <Field
                    name="card_details.card_number"
                    type="tel"
                    validate={validateCardNumber}
                    placeholder="Card number"
                  />
                  <ErrorMessage name="card_details.card_number" {...props} />
                </div>
                <div className="form-items flex justify-between">
                  <div className="w-30">
                    <div className="flex justify-between">
                      <div className="w-49">
                        <Field
                          name="card_details.expiry_month"
                          validate={validateExpiryMonth}
                          maxLength={2}
                          placeholder="MM"
                        />
                        <ErrorMessage name="card_details.expiry_month" {...props} />
                      </div>
                      <p className="slash">/</p>
                      <div className="w-49">
                        <Field
                          name="card_details.expiry_year"
                          validate={validateExpiryYear}
                          maxLength={2}
                          placeholder="YY"
                        />
                        <ErrorMessage name="card_details.expiry_year" {...props} />
                      </div>
                    </div>
                  </div>
                  <div className="w-68">
                    <Field name="card_details.cvv" maxLength={3} validate={validateCvv} placeholder="cvv" />
                    <ErrorMessage name="card_details.cvv" {...props} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button type="submit">ORDER NOW</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
