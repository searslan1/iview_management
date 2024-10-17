import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import ReactPlayer from 'react-player';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Button from '../components/Button';

const ValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  surname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  kvkk: Yup.bool().oneOf([true], 'You must accept the KVKK text')
});

const InterviewPage = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoUrl, setVideoUrl] = useState(''); // To store video link after recording
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0); // Timer state for recording time
  const webcamRef = useRef(null); // Ref for webcam
  const navigate = useNavigate();

  const startRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordedChunks([]); // Reset chunks before starting

      const stream = webcamRef.current.stream;
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoUrl(videoURL); // Store the video link
        setRecordedChunks([]); // Reset chunks after recording stops
      };

      recorder.start(); // Start recording
      setMediaRecorder(recorder);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop(); // Stop recording
      setIsRecording(false); // Stop the timer and recording
    }
  };

  // Timer effect for showing recording time
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000); // Increment timer every second
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const handleFormSubmit = (values) => {
    console.log(values);
    setIsFormSubmitted(true);
    navigate(`video-record`); // You can use this to share the link later on
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!isFormSubmitted ? (
        <div className="w-96 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Personal Information Form</h2>
          <Formik
            initialValues={{ name: '', surname: '', email: '', phone: '', kvkk: false }}
            validationSchema={ValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <label className="block mb-2">Name*</label>
                  <Field name="name" className="w-full p-2 border border-gray-300 rounded" placeholder="Input..." />
                  {errors.name && touched.name ? <div className="text-red-500">{errors.name}</div> : null}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Surname*</label>
                  <Field name="surname" className="w-full p-2 border border-gray-300 rounded" placeholder="Input..." />
                  {errors.surname && touched.surname ? <div className="text-red-500">{errors.surname}</div> : null}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Email*</label>
                  <Field name="email" type="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Input..." />
                  {errors.email && touched.email ? <div className="text-red-500">{errors.email}</div> : null}
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Phone*</label>
                  <Field name="phone" className="w-full p-2 border border-gray-300 rounded" placeholder="Input..." />
                  {errors.phone && touched.phone ? <div className="text-red-500">{errors.phone}</div> : null}
                </div>
                <div className="mb-4 flex items-center">
                  <Field type="checkbox" name="kvkk" className="mr-2" />
                  <label>I have read and approved the <a href="#" className="text-blue-600">KVKK text</a></label>
                  {errors.kvkk && touched.kvkk ? <div className="text-red-500 ml-2">{errors.kvkk}</div> : null}
                </div>
                <button type="submit" className="submit-button">Submit</button>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="flex w-full h-full">
          {/* Left Side - Video Section */}
          <div className="flex-1 bg-gray-100 p-4">
            {isRecording ? (
              <>
                <Webcam ref={webcamRef} audio={true} className="w-full h-full object-cover" />
                <div className="text-red-500">Recording Time: {timer} seconds</div>
              </>
            ) : (
              videoUrl ? (
                <ReactPlayer url={videoUrl} controls width="100%" height="90%" />
              ) : (
                <p>No video recorded yet.</p>
              )
            )}
          </div>

          {/* Right Side - Question and Controls */}
          <div className="w-1/3 bg-white p-6 flex flex-col justify-between">
            <div className="flex space-x-4 mb-4">
              <div className="text-white bg-[#47A7A2] font-semibold border p-1 rounded-xl w-full">
                Question: 00:02:00
              </div>
              <div className="text-white bg-[#47A7A2] font-semibold border p-1 rounded-xl w-full">
                Total: 00:16:00
              </div>
            </div>

            <div className="mb-4">
              <p className="text-md">Your question will appear here.</p>
            </div>
            <div className="flex justify-between">
              <Button
                label="Start"
                onClick={startRecording}
                className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
              />
              <Button
                label="Done"
                onClick={stopRecording}
                className="text-white bg-[#47A7A2] font-semibold hover:bg-white hover:text-[#47A7A2] border p-2 rounded mt-6"
                disabled={!isRecording} // Disable if not recording
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
