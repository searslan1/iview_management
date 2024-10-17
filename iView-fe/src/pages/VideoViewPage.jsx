import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
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
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Form gönderildi mi
  const [isRecording, setIsRecording] = useState(false); // Kayıt başlatıldı mı
  const [mediaRecorder, setMediaRecorder] = useState(null); // Video kaydedici
  const [videoUrl, setVideoUrl] = useState(''); // Kayıt edilen video URL'si
  const [recordedChunks, setRecordedChunks] = useState([]); // Kayıt edilen parçalar
  const [timer, setTimer] = useState(0); // Kayıt süresi
  const videoRef = useRef(null); // Video için referans

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setIsRecording(true);
        setRecordedChunks([]); // Kayıt başlamadan önce temizle
        videoRef.current.srcObject = stream; // Kamerayı video elementine aktar

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prev) => [...prev, event.data]);
          }
        };

        recorder.onstop = () => {
          const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
          const videoURL = URL.createObjectURL(videoBlob);
          setVideoUrl(videoURL); // Video URL'sini kaydet
          setRecordedChunks([]); // Parçaları temizle
          stream.getTracks().forEach(track => track.stop()); // Kamerayı durdur
        };

        recorder.start(); // Kayıta başla
        setMediaRecorder(recorder);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop(); // Kaydı durdur
      setIsRecording(false); // Kayıt işlemi durdu
    }
  };

  // Timer için useEffect
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000); // Her saniye timer'ı güncelle
    } else if (!isRecording && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  const handleFormSubmit = (values) => {
    console.log(values);
    setIsFormSubmitted(true); // Form gönderildi
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Form Gönderilmediyse Formu Göster */}
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
                  <Field name="phone" className="w-full p-2 border border-gray-300 rounded" placeholder="Please enter your phone number..." />
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
          {/* Sol Taraf - Video ve Ön İzleme Alanı */}
          <div className="flex-1 bg-gray-100 p-4">
            {isRecording ? (
              <>
                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                <div className="text-red-500">Recording Time: {timer} seconds</div>
              </>
            ) : (
              videoUrl ? (
                <>
                  <video src={videoUrl} controls width="100%" height="90%" />
                </>
              ) : (
                <p>No video recorded yet.</p>
              )
            )}
          </div>

          {/* Sağ Taraf - Soru ve Kontroller */}
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
                label="Stop"
                onClick={stopRecording}
                className="text-white bg-[#A85A56] font-semibold hover:bg-white hover:text-[#A85A56] border p-2 rounded mt-6"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
