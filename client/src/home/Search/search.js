import React from "react";
import { Form, FormGroup, FormInput } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

const Search = ({ handleChange, state }) => (
  <div>
  <Form>
    <FormGroup>
      <label htmlFor="#Address">Your Address: </label>
      <FormInput type="text" id="#Address" className="address1" placeholder="Address" value={state.address1} onChange={handleChange('address1')} />
    </FormGroup>
    <FormGroup>
      <label htmlFor="#City">Your City: </label>
      <FormInput type="text" id="#City" className="city1" placeholder="City" value={state.city1} onChange={handleChange('city1')} />
    </FormGroup>
  </Form>
   <Form>
   <FormGroup>
     <label htmlFor="#Address">Your totally real friends address: </label>
     <FormInput type="text" id="#Address" className="address2" placeholder="Address" value={state.address2} onChange={handleChange('address2')} />
   </FormGroup>
   <FormGroup>
     <label htmlFor="#City">Their totally not made up city: </label>
     <FormInput type="text" id="#City" className="city2" placeholder="City" value={state.city2} onChange={handleChange('city2')} />
   </FormGroup>
 </Form>
 </div>  
)

export default Search
