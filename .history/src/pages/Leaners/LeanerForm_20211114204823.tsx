import React, { useEffect } from 'react';
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Input, Label, Select, Textarea } from '@windmill/react-ui'
import { useParams } from 'react-router-dom';

const LeanerForm: React.FC = () => {
 const { id } = useParams<{ id: string }>();
 useEffect(() => {
     console.log(id)
 },[id])
  return (
    <>
    <PageTitle>Aluno</PageTitle>
    <SectionTitle>Cadastro de aluno</SectionTitle>

    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="grid grid-cols-2 divide-x divide-green-500">
        <Label>
        <span>Nome</span>
        <Input css="" className="mt-1" placeholder="Jane Doe" />
        </Label>
        <Label>
        <span>E-mail</span>
        <Input css="" className="mt-1" type="email" placeholder="Jane Doe" />
        </Label>
        </div>
    

      <Label className="mt-4">
        <span>Requested Limit</span>
        <Select css="" className="mt-1">
          <option>$1,000</option>
          <option>$5,000</option>
          <option>$10,000</option>
          <option>$25,000</option>
        </Select>
      </Label>

      <Label className="mt-4">
        <span>Comentário</span>
        <Textarea css="" className="mt-1" rows={3} placeholder="Enter some long form content." />
      </Label>

    </div>

  </>
  );
}

export default LeanerForm;