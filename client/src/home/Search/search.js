import React from "react";
import { Form, FormGroup, FormInput } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default function Search() {
  return (
    <div>
    <Form>
      <FormGroup>
        <label htmlFor="#Address">Address 1: </label>
        <FormInput type="text" id="#Address" className="address1" placeholder="Address" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="#City">City 1: </label>
        <FormInput type="text" id="#City" className="city1" placeholder="City" />
      </FormGroup>
    </Form>
     <Form>
     <FormGroup>
       <label htmlFor="#Address">Address 2: </label>
       <FormInput type="text" id="#Address" className="address2" placeholder="Address" />
     </FormGroup>
     <FormGroup>
       <label htmlFor="#City">City 2: </label>
       <FormInput type="text" id="#City" className="city2" placeholder="City" />
     </FormGroup>
   </Form>
   </div>  
  );
}
