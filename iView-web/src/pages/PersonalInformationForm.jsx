import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button'; // Import your Button component
import useCandidateStore from '../stores/usePersonalFormStore';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().required('Required'), // Correct field name
  kvkkApproval: Yup.bool().oneOf([true], 'You must accept the KVKK text') // Correct field name
});

const FormPage = () => {
  const navigate = useNavigate();
  const { uuid } = useParams();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '', // Correct field name
    kvkkApproval: false // Correct field name
  });

  const { submitCandidateForm } = useCandidateStore();
  const handleFormSubmit = async (values, { setSubmitting }) => {
    setForm(values);

    try {
      const savedPersonalInfo = await submitCandidateForm(uuid, values);
      const { candidateId: formId } = savedPersonalInfo;
      navigate(`/interview/${uuid}/${formId}`);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96 bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Personal Information Form</h2>
        <Formik
          initialValues={form}
          validationSchema={ValidationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block mb-2">Name*</label>
                <Field name="name" className="w-full p-2 border border-gray-300 rounded" placeholder="Please enter your name..." />
                {errors.name && touched.name ? <div className="text-red-500">{errors.name}</div> : null}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Surname*</label>
                <Field name="surname" className="w-full p-2 border border-gray-300 rounded" placeholder="Please enter your surname..." />
                {errors.surname && touched.surname ? <div className="text-red-500">{errors.surname}</div> : null}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email*</label>
                <Field name="email" type="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Please enter your email..." />
                {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone*</label>
                <Field name="phoneNumber" className="w-full p-2 border border-gray-300 rounded" placeholder="Please enter your phone number..." /> {/* Correct field name */}
                {errors.phoneNumber && touched.phoneNumber ? <div className="text-red-500">{errors.phoneNumber}</div> : null} {/* Correct error handling */}
              </div>
              <div className="mb-4 flex items-center">
                <Field type="checkbox" name="kvkkApproval" className="mr-2" /> {/* Correct field name */}
                <label>I have read and approved the <a href="#" className="text-blue-600">KVKK text</a></label>
                {errors.kvkkApproval && touched.kvkkApproval ? <div className="text-red-500 ml-2">{errors.kvkkApproval}</div> : null} {/* Correct error handling */}
              </div>

              <Button
                type="submit"
                label="Submit"
                className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded text-sm sm:text-base sm:p-3 mt-6"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormPage;
