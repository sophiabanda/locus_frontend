import React from "react";
import { Form, FormGroup, FormInput } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default function Search() {
  return (
    <Form>
      <FormGroup>
        <label htmlFor="#Address">Address: </label>
        <FormInput id="#Address" placeholder="Address" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#City">City: </label>
        <FormInput type="City" id="#City" placeholder="City" />
      </FormGroup>
    </Form>
  );
}
