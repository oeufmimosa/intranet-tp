
import { useParams } from "react-router";
import Card from "../components/card/Card";
import { useState, useEffect } from "react";
import Collaborator from "../components/collaborator/Collaborator";

const CollaboratorPage = () => {

    const { id } = useParams();

   return (
        <Collaborator id={id}/>
   )
}

export default CollaboratorPage;