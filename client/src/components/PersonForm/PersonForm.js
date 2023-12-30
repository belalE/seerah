import React, { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import SearchInput from "../UI/SearchInput/SearchInput";
import SearchMultipleInput from "../UI/SearchMultipleInput/SearchMultipleInput";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Aux from "../../hoc/Aux/Aux";
import { Link } from "react-router-dom";

const PersonForm = () => {
  const people = useLoaderData();

  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [father, setFather] = useState("");
  const [mother, setMother] = useState("");
  const [children, setChildren] = useState([]);
  const [description, setDescription] = useState("");
  const [tribe, setTribe] = useState("");
  const [tags, setTags] = useState("");

  const tribeOptions = [
    {
      id: "0",
      name: "Quraysh",
    },
    {
      id: "1",
      name: "Aws",
    },
    {
      id: "2",
      name: "Khazraj",
    },
  ];
  const tagOptions = [
    {
      id: "0",
      name: "Muhajir",
    },
    {
      id: "1",
      name: "Ansari",
    },
    {
      id: "2",
      name: "Mubashar Bil-Jana",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    let person = {
      name: name,
      fullName: fullName,
      father: father,
      mother: mother,
      children: children,
      description: description,
      tribe: tribe,
      tags: tags,
    };

    // Loop through entries in object and replace any empty strings with null
    for (const [key, value] of Object.entries(person)) {
      if (value === "") {
        person[key] = null;
      }
    }

    axios
      .post("/api/persons", { person: person })
      .then((response) => {
        console.log(response);
        // TODO: redirect to person page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Aux>
      <Button styleChoice="primary">
        <Link to={`/people/`}> &#x25c0; People </Link>
      </Button>
      <h1 className="text-center font-extrabold text-3xl">Add Person</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <Input
          label="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
        <Input
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <SearchInput
          label="Tribe"
          options={tribeOptions}
          onChangeHandler={(option) => setTribe(option.name)}
        />
        <SearchInput
          label="Father"
          options={people}
          onChangeHandler={(option) => setFather(option.id)}
        />
        <SearchInput
          label="Mother"
          options={people}
          onChangeHandler={(option) => setMother(option.id)}
        />
        {/* TODO: Create separate search input that accepts multiple tags and multiple children */}
        <SearchMultipleInput
          label="Tags"
          options={tagOptions}
          onChangeHandler={(options) => setTags(options)}
        />
        <SearchMultipleInput
          label="Children"
          options={people}
          onChangeHandler={(options) => setChildren(options)}
        />
        <Button styleChoice="primary">Submit</Button>
      </form>
    </Aux>
  );
};

export async function loader() {
  const response = await fetch("/api/persons");
  const data = await response.json();
  return data;
}

export default PersonForm;
