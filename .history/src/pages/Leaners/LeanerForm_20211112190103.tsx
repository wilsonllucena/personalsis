import React, { useEffect } from 'react';

// import CTA from '../../components/CTA'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import { Input, Label, Select, Textarea } from '@windmill/react-ui'
import { useParams, useRouteMatch } from 'react-router';

const LeanerForm: React.FC = () => {

 const params =  useParams();
 useEffect(() => {
     console.log(params.id)
 },[params])
  return (
    <>
    <PageTitle>Aluno</PageTitle>
    <SectionTitle>Cadastro de aluno</SectionTitle>

    <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <Label>
        <span>Name</span>
        <Input css="" className="mt-1" placeholder="Jane Doe" />
      </Label>

      <Label className="mt-4">
        <span>Disabled</span>
        <Input css="" disabled className="mt-1" placeholder="Jane Doe" />
      </Label>

      <div className="mt-4">
        {/* TODO: Check if this label is accessible, or fallback */}
        {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
        <Label>Account Type</Label>
        <div className="mt-2">
          <Label radio>
            <Input css="" type="radio" value="personal" name="accountType" />
            <span className="ml-2">Personal</span>
          </Label>
          <Label className="ml-6" radio>
            <Input css="" type="radio" value="business" name="accountType" />
            <span className="ml-2">Business</span>
          </Label>
          <Label disabled className="ml-6" radio>
            <Input css="" disabled type="radio" value="disabled" name="accountType" />
            <span className="ml-2">Disabled</span>
          </Label>
        </div>
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
        <span>Multiselect</span>
        <Select css="" className="mt-1" multiple>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
          <option>Option 5</option>
        </Select>
      </Label>

      <Label className="mt-4">
        <span>Message</span>
        <Textarea css="" className="mt-1" rows={3} placeholder="Enter some long form content." />
      </Label>

      <Label className="mt-6" check>
        <Input css="" type="checkbox" />
        <span className="ml-2">
          I agree to the <span className="underline">privacy policy</span>
        </span>
      </Label>
    </div>

  </>
  );
}

export default LeanerForm;